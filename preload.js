const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveTextFile: (filename, content) =>
        ipcRenderer.invoke('save-text-file', { filename, content }),
});
