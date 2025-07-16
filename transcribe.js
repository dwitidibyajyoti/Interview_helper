// index.js

const mic = require('mic');
const { createClient, LiveTranscriptionEvents } = require('@deepgram/sdk');
require('dotenv').config();

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

let micInstance;
let dgSocket;

async function startStreaming(callback) {
    // Setup mic
    micInstance = mic({
        rate: '16000',
        channels: '1',
        bitwidth: '16',
        encoding: 'signed-integer',
        endian: 'little',
        debug: true,
        exitOnSilence: 0,
        device: 'default', // change if needed
    });

    const micInputStream = micInstance.getAudioStream();

    micInputStream.on('error', (err) => {
        console.error('Mic error:', err);
    });

    micInputStream.on('startComplete', () => {
        console.log('🎙️ Mic started');
    });

    micInstance.start();
    let audioBuffer = [];
    const SEND_INTERVAL = 1000; // ms

    dgSocket = await deepgram.listen.live({
        model: 'nova-3',
        language: 'en-US',
        smart_format: true,
        interim_results: true,
    });

    dgSocket.on(LiveTranscriptionEvents.Open, () => {
        console.log('✅ Deepgram WebSocket opened');

        micInputStream.on('data', (chunk) => {
            audioBuffer.push(chunk);
        });

        setInterval(() => {
            if (audioBuffer.length > 0) {
                const combined = Buffer.concat(audioBuffer);
                dgSocket.send(combined);
                // console.log('📤 Sending buffered audio:', combined.length);
                audioBuffer = [];
            }
        }, SEND_INTERVAL);
    });

    dgSocket.on(LiveTranscriptionEvents.Transcript, (msg) => {

        const alt = msg.channel?.alternatives?.[0];
        // console.log('🧠 Full alternative:', JSON.stringify(alt, null, 2)); // full debug

        if (alt?.transcript) {
            // console.log('📝 Transcript:', alt.transcript);
            callback(alt.transcript, msg.is_final);
        }
    });

    dgSocket.on(LiveTranscriptionEvents.Metadata, (data) => {
        console.log('🧠 Metadata:', data);
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
    if (dgSocket) dgSocket.finish();
}

module.exports = { startStreaming, stopStreaming };
