#!/usr/bin/env node

const { spawn } = require('child_process');
const http = require('http');

// Starte Vite
const vite = spawn('npm', ['run', 'vite'], { stdio: 'inherit' });

// Prüfe ob Port 3000 erreichbar ist
function checkPort() {
    return new Promise((resolve) => {
        const req = http.get('http://localhost:3000', { timeout: 1000 }, () => {
            req.destroy();
            resolve(true);
        });
        req.on('error', () => resolve(false));
    });
}

// Warte bis Vite bereit ist
async function waitForVite() {
    for (let i = 0; i < 30; i++) {
        if (await checkPort()) {
            console.log('✓ Vite ist bereit');
            return;
        }
        await new Promise((r) => setTimeout(r, 500));
    }
    throw new Error('Vite konnte nicht starten');
}

// Starte Electron
waitForVite()
    .then(() => {
        spawn('npm', ['run', 'electron'], { stdio: 'inherit' });
    })
    .catch((err) => {
        console.error(err.message);
        vite.kill();
        process.exit(1);
    });

// Cleanup
process.on('SIGINT', () => {
    vite.kill();
    process.exit(0);
});
