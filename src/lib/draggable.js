// @ts-nocheck
export const draggable = (node) => {

  node.addEventListener('mousedown', mouseDown)

  let startX = 0, startY = 0, newX = 0, newY = 0, clone;

  function mouseDown(e) {
    startX = e.clientX
    startY = e.clientY

    clone = node.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.width = node.offsetWidth + "px"
    clone.style.height = node.offsetHeight + "px"
    node.style.opacity = "50%"
    document.body.appendChild(clone)

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }

  function mouseMove(e) {
    newX = e.clientX - startX
    newY = e.clientY - startY

    startX = e.clientX
    startY = e.clientY

    clone.style.left = clone.offsetLeft - newX + "px"
    clone.style.top = clone.offsetTop - newY + "px"
  }

  function mouseUp() {
    node.style.opacity = "100%";
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
    document.body.removeChild(clone);
    clone.destroy();
    clone = null;
  }

  return {
  }
}