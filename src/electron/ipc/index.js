import electron from 'electron';
import { CHANNELS } from '../../configs/app';
import union from 'lodash/union';
const { ipcMain, dialog, BrowserWindow } = electron;

function parseShowOpenDialogParams(_win, _options, _callback) {
  let win, options, callback;
  if (typeof _options === 'object') {
    options = _options, callback = _callback;
    win = _win === true ? BrowserWindow.getFocusedWindow() : _win;
  } else {
    options = _win, callback = _options;
  }
  return { win, options, callback };
}

function pickFolder(...arg) {
  const { win, options, callback } = parseShowOpenDialogParams(...arg);
  options.properties = union(options.properties, ['openDirectory', 'createDirectory']);
  return dialog.showOpenDialog(win, options, callback);
}

export default function init() {
  ipcMain.on(CHANNELS.PICK_FOLDER, (event, win, options) => {
    const res = pickFolder(win, options);
    event.sender.send(CHANNELS.PICK_FOLDER_OK, res);
  });
}

