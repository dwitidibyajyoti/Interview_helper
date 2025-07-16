const { contextBridge, ipcRenderer } = require('electron');
// const { transcribeAudio } = require('../transcribe');

console.log('✅ Preload loaded');
contextBridge.exposeInMainWorld('electronAPI', {
    processAudio: (audioBuffer) => ipcRenderer.invoke('process-audio', audioBuffer),
    onChatGPTResponse: (callback) => ipcRenderer.on('chatgpt-response', callback),
});
