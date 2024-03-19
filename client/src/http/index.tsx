import axios from "axios";
const $host = axios.create({
    // @ts-expect-error TS(1343): The 'import.meta' meta-property is only allowed wh... Remove this comment to see the full error message
    baseURL:import.meta.env.VITE_REACT_APP_API_URL
})
const $authHost = axios.create({
    // @ts-expect-error TS(1343): The 'import.meta' meta-property is only allowed wh... Remove this comment to see the full error message
    baseURL:import.meta.env.VITE_REACT_APP_API_URL
})
const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}