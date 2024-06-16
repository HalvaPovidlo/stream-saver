import {AxiosError, AxiosResponse} from "axios";
import { User, UserSchema } from "../store/UserStore";
import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

function decodeAndValidateToken(token: string): User {
  const decodedUser = jwtDecode<User>(token);
  return UserSchema.parse(decodedUser);
}

async function handleUserResponse(promise: Promise<AxiosResponse>): Promise<User> {
  try {
    const { data } = await promise;
    const validatedUser = decodeAndValidateToken(data.token);
    localStorage.setItem("token", data.token);
    return validatedUser;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log("Unauthorized");
      throw error;
    } else {
      throw error;
    }
  }
}

// Регистрация нового пользователя
export const registration = (
  email: string,
  password: string
): Promise<User> => {
  return handleUserResponse(
    $host.post("api/user/registration", {
      email,
      password,
      role: "ADMIN",
    })
  );
};

// Логин пользователя
export const login = (email: string, password: string): Promise<User> => {
  return handleUserResponse($host.post("api/user/login", { email, password }));
};

// Проверка авторизации пользователя
export const check = (): Promise<User> => {
  return handleUserResponse($authHost.get<{ token: string }>("api/user/check"));
};
