const BASE_URL = "http://localhost:3001/api/";

export const postData = async (endpoint, data = {}) => {
  const res = await fetch(BASE_URL + endpoint, {
    method: "POST",
    mode: "cors",
    body: data
  });
  return res;
};

export const getData = async endpoint => {
  const res = await fetch(BASE_URL + endpoint, {
    mode: "cors"
  });
  return await res.json();
};
