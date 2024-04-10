import { app } from "./config";
import uniqid from "uniqid";

export const LoginService = {
  initial: async () => {
    return await app.get('/login', {
      params: {
        initial: `${uniqid()}`
      }
    });
  },
  login: async (user, pass) => {
    return await app.get('/login', {
      params: {
        login: {
          user: user,
          pass: pass
        }
      }
    });
  }
}