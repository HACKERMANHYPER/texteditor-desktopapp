const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.loadURL('http://localhost:3000'); // Svelte Dev-Server
}

app.whenReady().then(createWindow);

// IPC: Datei speichern
ipcMain.handle('save-text-file', async (_, { filename, content }) => {
    const filePath = path.join(app.getPath('desktop'), filename);
    fs.writeFileSync(filePath, content, 'utf8');
    return filePath;
});
