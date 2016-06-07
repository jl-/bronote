export default function domContains(root, child) {
  while (child) {
    if (child === root) return true;
    child = child.parentNode
  }
  return false;
}
