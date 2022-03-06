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
  register({ nom, prenom , email, password }) {
    return api.post("/user/signup", {
      nom,
      prenom,
      email,
      password
    });
  }
}
export default new AuthService();