// main entry point for backend
import { app, BrowserWindow } from 'electron';
import path from 'path';

const isDev = !/^pro(?:d(?:uction)?)?$/.test(process.env.NODE_ENV || '');

let mainWindow: BrowserWindow;
const createWindow = () => {


    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.resolve(__dirname, '../preload/index.js')
        }
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:8080');
    } else {
        mainWindow.loadFile('../renderer/index.html');
    }
}


app.whenReady().then(() => {
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});