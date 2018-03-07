let isEmpty = (obj) => {
  return JSON.stringify(obj) === '{}';
}

module.exports = {isEmpty}