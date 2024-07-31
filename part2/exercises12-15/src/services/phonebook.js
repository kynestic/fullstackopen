import axios from "axios"

const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(url).then(response => response.data)
}

const create = (newPerson) =>{
    return axios.post(url, newPerson).then(response => response.data)
}

const erase = (id) => {
    return axios.delete(`${url}/${id}`).then(response => response.data)
}

const update = (updatedPerson ,id) => {
    return axios.put(`${url}/${id}`, updatedPerson).then(response => response.data)
}

export default{
    getAll, create, erase, update
}