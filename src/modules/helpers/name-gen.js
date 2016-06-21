function indexifyName(prefix, names = []) {
  let index = 1;
  let name;
  do {
    name = `${prefix} ${index++}`;
  } while (names.indexOf(name) !== -1);
  return name;
}
export function genNotebookName(names) {
  return indexifyName('Notebook', names);
}
export function genChapterName(names) {
  return indexifyName('Chapter', names);
}
export function genPageName(names) {
  return indexifyName('Page', names);
}
