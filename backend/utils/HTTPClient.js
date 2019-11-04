const fetch = require('node-fetch');

const client = async (endpoint) => {
  const resp = await fetch(endpoint);
  if (resp.status !== 200) throw Error(resp.status);
  const data = await resp.json();
  return data;
};

module.exports = client;
