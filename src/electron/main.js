import electron from'electron';
import bindProtocolHandler from './protocol';
import initIPC from './ipc';
import path from 'path';
import {
  DEFAULT_WIN_CONF
} from '../configs/app';

const { app, BrowserWindow } = electron;
const wins = {};
const APP_WIN_NAME = 'app';

function tryDevTools(win) {
  if (process.env.NODE_ENV !== 'development') return;
  require('electron-debug')({ showDevTools: true });
  win.webContents.openDevTools();
}

function createWindow(name, conf) {
  let win = new BrowserWindow(conf);
  wins[name] = win;
  win.on('closed', () => {
    wins[name] = win = null;
  });
  return win;
}

function onAppReady() {
  const appWin = createWindow(APP_WIN_NAME, DEFAULT_WIN_CONF);
  const appURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:3005/main' :
  `file://dist/${__I18N_LANG__}/index.html`;
  bindProtocolHandler();
  appWin.loadURL(appURL);
  initIPC();
  tryDevTools(appWin);
}

app.on('ready', onAppReady);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!wins[APP_WIN_NAME]) {
    onAppReady();
  }
});

