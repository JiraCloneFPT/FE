import axios from "axios";

const Request = axios.create({
    baseURL: "https://localhost:7112/api/",
});
export default Request;