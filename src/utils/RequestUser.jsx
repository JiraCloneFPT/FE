import axios from "axios";

const Request = axios.create({
    baseURL: "https://localhost:7112/api/user/",
});
export default Request;