import axios from "axios"

const http = axios.create({
    baseURL: "https://switch-yam-equator.azurewebsites.net/api"
})
export default {

    getAllActors() {
        return http.get(`/actors`, {headers: {"x-chmura-cors": "30ee585c-820e-4b10-aa59-0946b2087400"}});
    },
    getAllMovies() {
        return http.get(`/movies`, {headers: {"x-chmura-cors": "30ee585c-820e-4b10-aa59-0946b2087400"}});
    }
}