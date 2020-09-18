const convertObjectToCsv = object => {
  let csv = '';

  for (let property in object) {
    csv += property + ',' + object[property] + '\r\n';
  }

  return csv;
};

export default convertObjectToCsv;
