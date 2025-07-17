// transcribe.js
const { spawn } = require('child_process');
const mic = require('mic');
const { createClient, LiveTranscriptionEvents } = require('@deepgram/sdk');
const { getMonitorDevice, getDefaultMicDevice } = require('./audioDevice');
require('dotenv').config();

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

let micInstance;
let recProcess;
let dgSocket;

async function startStreaming(callback, useSystemAudio = true) {
    const device = useSystemAudio ? getMonitorDevice() : getDefaultMicDevice();

    if (!device) {
        console.error('❌ No audio device available');
        return;
    }

    dgSocket = await deepgram.listen.live({
        model: 'nova-3',
        language: 'en-US',
        smart_format: true,
        interim_results: true,
        encoding: 'linear16',       // Required for raw PCM
        sample_rate: 16000,         // Must match parec rate
    });

    let audioStream;

    if (useSystemAudio) {
        console.log(`🎧 Recording system audio from: ${device}`);
        recProcess = spawn('parec', [
            `--device=${device}`,
            '--format=s16le',
            '--rate=16000',
            '--channels=1',
        ]);
        audioStream = recProcess.stdout;
    } else {
        console.log(`🎙️ Recording mic from: ${device}`);
        micInstance = mic({
            rate: '16000',
            channels: '1',
            bitwidth: '16',
            encoding: 'signed-integer',
            endian: 'little',
            debug: true,
            exitOnSilence: 0,
            device: device,
        });
        micInstance.start();
        audioStream = micInstance.getAudioStream();
    }

    let audioBuffer = [];
    const SEND_INTERVAL = 700;

    // const fs = require('fs');
    // const file = fs.createWriteStream('test78.raw');
    // audioStream.pipe(file);

    audioStream.on('data', (chunk) => {
        // console.log(`📦 Received audio chunk of size: ${chunk.length}`);
        audioBuffer.push(chunk);
    });

    dgSocket.on(LiveTranscriptionEvents.Open, () => {
        console.log('✅ Deepgram WebSocket opened');

        setInterval(() => {
            if (audioBuffer.length > 0) {
                const combined = Buffer.concat(audioBuffer);
                dgSocket.send(combined);
                audioBuffer = [];
            }
        }, SEND_INTERVAL);
    });

    dgSocket.on(LiveTranscriptionEvents.Transcript, (msg) => {
        const alt = msg.channel?.alternatives?.[0];
        if (alt?.transcript) {
            callback(alt.transcript, msg.is_final);
        }
    });

    dgSocket.on(LiveTranscriptionEvents.Error, (err) => {
        console.error('❌ Deepgram error:', err);
    });

    dgSocket.on(LiveTranscriptionEvents.Close, (code) => {
        console.log('🔒 Deepgram connection closed:', code);
    });
}

function stopStreaming() {
    if (micInstance) micInstance.stop();
    if (recProcess) recProcess.kill();
    if (dgSocket) dgSocket.finish();
}

module.exports = {
    startStreaming,
    stopStreaming
};
