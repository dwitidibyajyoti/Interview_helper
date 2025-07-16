const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { startStreaming, stopStreaming, toggleAudio } = require('./transcribe');
const { getChatGPTResponse } = require('./chatgpt');

let win;
let isListening = true;
let useSystemAudio = true;

function createWindow() {
    win = new BrowserWindow({
        width: 700,
        height: 500,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: true,
        movable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    win.setIgnoreMouseEvents(false);
    win.loadFile(path.join(__dirname, 'renderer/index.html'));

    startStream(); // 👈 Start initially
}

function startStream() {
    // console.log(`▶️ Starting stream (${useSystemAudio ? 'System Audio' : 'Mic'})`);
    startStreaming(async (transcript, isFinal) => {
        if (isFinal) {
            const response = await getChatGPTResponse(transcript);
            console.log('💬 ChatGPT Response:', response);
            win.webContents.send('chatgpt-response', response);
        }
    }, useSystemAudio); // pass the flag to transcribe.js
}

function stopStream() {
    console.log('⏹️ Stopping stream...');
    stopStreaming();
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    stopStream();
    if (process.platform !== 'darwin') app.quit();
});

// 🔁 Handle toggle listening
ipcMain.on('toggle-listening', () => {
    isListening = !isListening;
    if (isListening) {
        startStream();
    } else {
        stopStream();
    }
});

// 🔄 Handle switch between mic & system audio
ipcMain.on('switch-audio-source', () => {
    // console.log(`🔄 Switched to ${useSystemAudio ? 'System Audio' : 'Microphone'}`);
    if (isListening) {
        useSystemAudio = !useSystemAudio;
        stopStream(); // Stop current stream
        startStream(); // Start with new source
    }

});


ipcMain.on('minimize-window', () => {
    win.minimize();
});

ipcMain.on('close-window', () => {
    win.close();
});