export const makeAPIRequest = async (url, method, data) => {
  const config = {
    body: JSON.stringify(data),
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const res = await fetch(url, config);
  return res.json();
};
