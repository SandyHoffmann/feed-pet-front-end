import axios from 'axios';
import authServices from "./authServices";

export const api = axios.create({
    baseURL:"https://feed-pet-back.herokuapp.com/",
    timeout:2000
})

api.interceptors.request.use(config => {
    const accessToken = authServices.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if(config.url === '/animais'){
      return config
    }
    return config;
});

api.interceptors.response.use(function (response) {
    return response;
  }, async function (error) {
      const originalRequest = error.config;
      const loginUrl = `https://feed-pet-back.herokuapp.com/auth/login`;
      const homeUrl = `https://feed-pet-back.herokuapp.com/animais`;
      const refreshTokenUrl = "https://feed-pet-back.herokuapp.com/auth/refreshToken";    
      if (error.response?.status === 401
        && originalRequest.url !== refreshTokenUrl
        && error.request.responseURL !== loginUrl
        && error.request.responseURL !== homeUrl) {      
        await authServices.refreshToken();     
        window.location.replace("/login"); 
        return api(originalRequest);
    }
    return Promise.reject(error);
    
    
});

export const cancelTokenSource = axios.CancelToken.source();