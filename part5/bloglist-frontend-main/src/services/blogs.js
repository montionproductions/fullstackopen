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

const updateLikes = async (id, updatedBlog) => {
  const config = {
    headers: {Authorization: token },
  }

  //console.log('info obj: ', newObjet)
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)

  return response.data
}

const remove = async (id) => {
  const config = {
    headers: {Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}

export default { getAll, create, setToken, updateLikes, remove }