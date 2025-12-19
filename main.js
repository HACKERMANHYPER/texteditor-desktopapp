const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

app.whenReady().then(createWindow);

let mainWindow;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.loadURL('http://localhost:3000'); // Svelte Dev-Server
    mainWindow = win;
}

// IPC: Datei speichern
ipcMain.handle('save-text-file', async (_, { filename, content }) => {
    const filePath = path.join(app.getPath('desktop'), filename);
    fs.writeFileSync(filePath, content, 'utf8');
    return filePath;
});
// IPC: Datei öffnen
ipcMain.handle('open-text-file', async (_, filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    return { filename: path.basename(filePath), content };
});

// IPC: Dialog zum Datei öffnen
ipcMain.handle('dialog-open-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt', 'md', 'json'] },
            { name: 'All Files', extensions: ['*'] },
        ],
    });

    if (result.canceled) {
        return null;
    }

    const filePath = result.filePaths[0];
    const content = fs.readFileSync(filePath, 'utf8');
    return { filename: path.basename(filePath), content };
});
