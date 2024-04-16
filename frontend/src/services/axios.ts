import axios from 'axios'

const BASE_URL = 'https://teste-fullstack.onrender.com/api/v1/'

export const API = axios.create({
  baseURL: BASE_URL,
})
