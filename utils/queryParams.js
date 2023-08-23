const queryParams = (url = null) => {
  const paramsObj = new URLSearchParams(url ? url : window.location.search);
  let newObj = {};
  for (const [key, value] of paramsObj) {
    newObj[key] = value;
  }
  return newObj;
};

export default queryParams;
