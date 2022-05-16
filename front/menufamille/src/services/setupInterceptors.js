import axiosInstance from "./api";
import TokenService from "./token.service";
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      if(config.url !== '/user/roles/update' && !config.url.includes("/recette/FindRecipe/") && store.state.auth.status.loggedIn) {
        store.dispatch("loading/loading");
      }
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (res) => {
      store.dispatch("loading/reset");
      const originalConfig = res.config;
      console.log(!originalConfig.url.includes("/user/remove/"))
      if(res.data.roles === undefined && !originalConfig.url.includes("/user/remove/")) {
        axiosInstance.get("/user/roles/update").then(
          (response) => {
              store.dispatch("auth/updateRoles", response.data);
          }
        )
      }
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if(store.state.auth.status.loggedIn) {
        if(err.response.data !== undefined) {
          store.dispatch("loading/error", err.response.data.message);
        }
      }
      
      if (originalConfig.url !== "/user/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await axiosInstance.post("/user/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });
            const { accessToken } = rs.data;
            store.dispatch('auth/refreshToken', accessToken);
            TokenService.updateLocalAccessToken(accessToken);
            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};
export default setup;