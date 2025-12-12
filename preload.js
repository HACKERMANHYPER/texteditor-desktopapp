const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    saveTextFile: (filename, content) =>
        ipcRenderer.invoke('save-text-file', { filename, content }),
    openTextFile: (filePath) => ipcRenderer.invoke('open-text-file', filePath),
    dialogOpenFile: () => ipcRenderer.invoke('dialog-open-file'),
});
