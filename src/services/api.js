import axios from 'axios'

const urlDoBackEnd = 'http://localhost:3333' //mais tarde fazer o process.env.baseurl

const api = axios.create({
    baseURL:urlDoBackEnd
})

export default api