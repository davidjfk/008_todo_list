const deleteAllChildNodes = parent => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const deleteOneChildNode = (parent, child) => {
  parent.removeChild(child)
}

const log = console.log;





