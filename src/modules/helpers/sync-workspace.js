export default function syncWorkspace({
  notebookId, chapterId, pageId
}) {
  (notebookId !== undefined) && localStorage.setItem('notebookId', notebookId);
  (chapterId !== undefined) && localStorage.setItem('chapterId', chapterId);
  (pageId !== undefined) && localStorage.setItem('pageId', pageId);
}
