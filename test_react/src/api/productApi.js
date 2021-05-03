import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = '/comments';
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/todos/${id}`;
    return axiosClient.get(url);
  },
}

export default productApi;