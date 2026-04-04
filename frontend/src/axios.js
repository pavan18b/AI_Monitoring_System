import axios from "axios";

const instance = axios.create({
  baseURL: "https://ai-monitoring-system-mwxa.onrender.com/api",
});

// ✅ ADD TOKEN TO EVERY REQUEST
instance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;