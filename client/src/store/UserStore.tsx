import {makeAutoObservable} from "mobx";

export default class UserStore {
    _isAuth: any;
    _user: any;
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool: any) {
        this._isAuth = bool
    }

    setUser(user: any) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}