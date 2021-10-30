import axios from "axios";

export const GET = (url) => {
    return axios.get(url)
}

export const POST = (url, payload) => {
    return axios.post(url, payload);
}

export const PUT = (url, payload) => {
  return axios.put(url, payload);
};

export const DELETE = (url) => {
    return axios.delete(url)
}