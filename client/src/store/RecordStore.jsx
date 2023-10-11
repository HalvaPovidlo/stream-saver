import {makeAutoObservable} from "mobx";

export default class RecordStore {
    constructor() {
        this._follows = []
        this._records = []
        this._channels = []
        this._page = 1
        this._totalCount = 0
        this._limit = 40
        makeAutoObservable(this)
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    setLimit(limit) {
        this._limit = limit
    }

    setFollows(follows) {
        this._follows = follows
    }

    setRecords(records) {
        this._records = records
    }
    setChannels(channels){
        this._channels = channels
    }

    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
    get follows() {
        return this._follows
    }

    get records() {
        return this._records
    }
    get channels() {
        return this._channels
    }

}