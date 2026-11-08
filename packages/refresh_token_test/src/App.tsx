import axios, { type AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

axios.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

async function refreshToken() {
  const res = await axios.get("http://localhost:3000/user/refresh", {
    params: {
      refresh_token: localStorage.getItem("refresh_token"),
    },
  });
  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);
  return res;
}

interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}

// 并发的时候只请求一次refresh
let refreshing = false;
const queue: PendingTask[] = [];

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let { data, config } = error.response;
    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({ config, resolve });
      });
    }
    if (data.statusCode === 401 && !config.url.includes("user/refresh")) {
      refreshing = true;
      const res = await refreshToken();
      refreshing = false;

      if (res.status === 200) {
        queue.forEach((task) => {
          task.resolve(axios(task.config));
        });
        return axios(error.config);
      } else {
        alert("登录过期，请重新登录");
        return Promise.reject(error);
      }
    }
    return error.response;
  },
);

async function login() {
  const res = await axios.post("http://localhost:3000/user/login", {
    username: "guang",
    password: "123456",
  });
  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);
}

function App() {
  const [aaa, setAaa] = useState();
  const [bbb, setBbb] = useState();

  async function query() {
    if (!localStorage.getItem("access_token")) {
      await login();
    }

    // 模拟并发
    await Promise.all([
      axios.get("http://localhost:3000/bbb"),
      axios.get("http://localhost:3000/bbb"),
      axios.get("http://localhost:3000/bbb"),
    ]);

    const { data: aaaData } = await axios.get("http://localhost:3000/aaa");
    const { data: bbbData } = await axios.get("http://localhost:3000/bbb", {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      // },
    });

    setAaa(aaaData);
    setBbb(bbbData);
  }
  useEffect(() => {
    query();
  }, []);

  return (
    <div>
      <h1>Refresh Token Test</h1>
      <p>{aaa}</p>
      <p>{bbb}</p>
    </div>
  );
}

export default App;
