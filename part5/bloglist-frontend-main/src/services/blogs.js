import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObjet => {
  const config = {
    headers: {Authorization: token },
  }

  const response = await axios.post(baseUrl, newObjet, config)
  return response.data
}

export default { getAll, create, setToken }