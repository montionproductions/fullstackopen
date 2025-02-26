import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id) => {
    console.log(`Intentando eliminar el ID: ${id}`);
    console.log(`URL generada: ${baseUrl}/${id}`);

    return axios.delete(`${baseUrl}/${id}`)
        .then(response => {
            console.log('Respuesta del servidor:', response);
        })
        .catch(error => {
            console.error('Error al eliminar:', error.response ? error.response.data : error);
        });
}

export default { getAll, create, update, deletePerson}