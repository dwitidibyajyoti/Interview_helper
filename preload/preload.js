const { contextBridge, ipcRenderer } = require('electron');
// const { transcribeAudio } = require('../transcribe');

console.log('✅ Preload loaded');
contextBridge.exposeInMainWorld('electronAPI', {
    processAudio: (audioBuffer) => ipcRenderer.invoke('process-audio', audioBuffer),
    onChatGPTResponse: (callback) => ipcRenderer.on('chatgpt-response', callback),
    toggleListening: () => ipcRenderer.send('toggle-listening'),
    switchAudioSource: () => ipcRenderer.send('switch-audio-source'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),

});
