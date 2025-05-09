
import axios from "axios";
import { get_token } from "./capacitor/auth";
export const api_url = "http://backend.test/api"

export const api = async () => {
    let token: null | string = null
    try {
        token = await get_token()
    } catch (e) {
        console.error("ERROR THERE IS NO TOKEN")
    }
    return axios.create({
        baseURL: api_url,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),

        }
    })
}