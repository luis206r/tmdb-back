const compareObj = (obj1, obj2) => {

  const propsA = Object.keys(obj1);
  const propsB = Object.keys(obj2);

  for (const prop of propsA) {
    if (objetoA[prop] !== objetoB[prop]) {
      return false;
    }
  }
  return true;
}

module.exports = { compareObj };