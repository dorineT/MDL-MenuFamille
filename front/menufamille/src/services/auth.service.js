import api from "./api";
import TokenService from "./token.service";
class AuthService {
  login({ email, password }) {
    return api
      .post("/user/signin", {
        email,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }
        return response.data;
      });
  }
  logout() {
    TokenService.removeUser();
  }
  register({ firstname, lastname, email, password }) {
    return api.post("/user/signup", {
      firstname,
      lastname,
      email,
      password
    });
  }
}
export default new AuthService();