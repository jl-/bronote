import { THEMES } from 'configs/app';
export default function genRandomTheme() {
  return THEMES[Math.floor(THEMES.length * Math.random())];
}
