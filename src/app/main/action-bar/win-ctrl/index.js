import React, { Component } from 'react';
import cx from 'classnames';
import styles from './style.scss';
import electron from 'electron';

const { BrowserWindow } = electron.remote;

function minimizeWindow() {
  const win = BrowserWindow.getFocusedWindow();
  if (win.isFullScreen()) {
    win.setFullScreen(false);
  } else {
    win.minimize();
  }
}
function toggleWindowFullScreen() {
  const win = BrowserWindow.getFocusedWindow();
  const isFullScreen = win.isFullScreen();
  win.setFullScreen(!isFullScreen);
}
function closeWindow() {
  const win = BrowserWindow.getFocusedWindow();
  win.close();
}

class WinCtrl extends Component {
  render() {
    return (
      <div className={styles.root}>
        <span className={styles.close} onClick={closeWindow} />
        <span className={styles.minimize} onClick={minimizeWindow} />
        <span className={styles.fullscreen} onClick={toggleWindowFullScreen} />
      </div>
    );
  }
};

export default WinCtrl;
