import { makeAutoObservable } from "mobx";
import z from "zod";

export const UserSchema = z.object({
  email: z.string(),
  role: z.string(),
  id: z.number(),
  exp: z.number(),
  iat: z.number(),
});

export type User = z.infer<typeof UserSchema>;

export default class UserStore {
  _isAuth = false;
  _user: User | null;

  constructor() {
    this._isAuth = false;
    this._user = null;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUser(user: User): void {
    if (UserSchema.parse(user)) {
      this._isAuth = true;
      this._user = user;
    }
  }

  removeUser(): void {
    this._isAuth = false;
    this._user = null;
  }

  get isAuth(): boolean {
    return this._isAuth;
  }

  get user(): User | null {
    return this._user;
  }
}
