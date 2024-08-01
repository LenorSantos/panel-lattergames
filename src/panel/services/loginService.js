import { app } from "./config";
// import uniqid from "uniqid";

export const LoginService = {
  initial: async () => {
    return await app.get('/login', {
      params: {
        initial: 1
      }
    });
  },
  login: async (user) => {
    return await app.get('/login', {
      params: {
        login: user
      }
    });
  }
}