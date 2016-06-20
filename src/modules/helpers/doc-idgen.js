import uid from 'utils/lib/uid';
import {
  NOTEBOOK_DOC_PREFIX,
  CHAPTER_DOC_PREFIX,
  PAGE_DOC_PREFIX
} from 'configs/app';
function genUString(prefix) {
  return `${prefix}${Date.now()}_${uid()}`;
}
export function genNotebookId() {
  return genUString(NOTEBOOK_DOC_PREFIX);
}
export function genChapterId() {
  return genUString(CHAPTER_DOC_PREFIX);
}
export function genPageId() {
  return genUString(PAGE_DOC_PREFIX);
}
