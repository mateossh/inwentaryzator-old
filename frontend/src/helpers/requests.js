export const makeAPIRequest = async (url, method, data) => {
  const config = {
    body: JSON.stringify(data),
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await fetch(url, config);
    return res;
  } catch (err) {
    const options = {
      status: 503,
      statusText: 'Service Unavailable',
    };

    const res = new Response(null, options);
    return res;
  }
};
