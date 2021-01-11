function getQuery() {
  let params = {};
  window.location.search.slice(1).split('&').forEach(s => {
    if (s === '') {
      return false;
    }
    const tmp = s.split('=');
    params[tmp[0]] = tmp[1];
  });
  return params;
}

export { getQuery };
