// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { startStreaming, stopStreaming } = require('./transcribe');
// const { transcribeAudio } = require('./transcribe');
const { getChatGPTResponse } = require('./chatgpt');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 700,
        height: 400,
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

    // Start real-time transcription
    startStreaming(async (transcript, isFinal) => {
        if (isFinal) {
            // console.log('ChatGPT Response:', transcript);
            const response = await getChatGPTResponse(transcript);
            console.log('ChatGPT Response:', response);
            win.webContents.send('chatgpt-response', response);
        }
    });
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    stopStreaming();
    if (process.platform !== 'darwin') app.quit();
});

// ipcMain.handle('process-audio', async (event, audioBuffer) => {
//     const transcript = await transcribeAudio(audioBuffer);
//     const response = await getChatGPTResponse(transcript);
//     return response;
// });
