import {makeAutoObservable} from "mobx";

export default class RecordStore {
    constructor() {
        this._records = []
        this._activeFollows = []
        makeAutoObservable(this)
    }

    setRecords(records) {
        records = records.sort((r1, r2) => (new Date(r2.date) - new Date(r1.date)))
        this._records = records
    }

    get records() {
        return this._records
    }

    setActiveFollows(activeFollows) {
        this._activeFollows = activeFollows
    }


    get activeFollows() {
        return this._activeFollows
    }


    groupVideosByChannelName() {
        const records = this.records;

        const groupedObj = records.reduce((acc, record) => {
            const {channelId} = record;
            if (!acc[channelId]) {
                acc[channelId] = [];
            }
            acc[channelId].push(record);
            return acc;
        }, {});

        const groupedArray = Object.values(groupedObj);
        return groupedArray;
    }
    /*
 groupVideosByChannelName() {
        const records = this.records
        const groupedObj = Object.groupBy(records, ({channelId}) => channelId)

        const groupedArray = [...Object.values(groupedObj).map(r => r)]//grouping
        return groupedArray
    } */
}