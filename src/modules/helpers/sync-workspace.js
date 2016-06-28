export function rememberNotebookChapter(notebookId, chapterId) {
  localStorage.setItem(`n_c_${notebookId}`, chapterId);
}
export function rememberChapterPage(chapterId, pageId) {
  localStorage.setItem(`c_p_${chapterId}`, pageId);
}
export function recallNotebookChapter(notebookId) {
  return localStorage.getItem(`n_c_${notebookId}`);
}
export function recallChapterPage(chapterId) {
  return localStorage.getItem(`c_p_${chapterId}`);
}
export function clearNotebookChapter(notebookId) {
  localStorage.removeItem(`n_c_${notebookId}`);
}
export function clearChapterPage(chapterId) {
  localStorage.removeItem(`c_p_${chapterId}`);
}

export function syncWorkspace({
  notebookId, chapterId, pageId
}) {
  (notebookId !== undefined) && localStorage.setItem('notebookId', notebookId);
  (chapterId !== undefined) && localStorage.setItem('chapterId', chapterId);
  (pageId !== undefined) && localStorage.setItem('pageId', pageId);
}
