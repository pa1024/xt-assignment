import axios from 'axios'

const reqInstance = axios.create({
    baseURL: "https://api.spaceXdata.com/v3/launches",
    headers: {}
})

export default {
    getData: (query) =>
    reqInstance({
        'method':'GET',
        'url': "",
        'params': query,
    })
}