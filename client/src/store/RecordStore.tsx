import {makeAutoObservable} from "mobx";

export default class RecordStore {
    _activeFollows: any;
    _records: any;
    constructor() {
        this._records = []
        this._activeFollows = []
        makeAutoObservable(this)
    }

    setRecords(records: any) {
        // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        records = records.sort((r1: any, r2: any) => (new Date(r2.date) - new Date(r1.date)))
        this._records = records
    }

    get records() {
        return this._records
    }

    setActiveFollows(activeFollows: any) {
        this._activeFollows = activeFollows
    }


    get activeFollows() {
        return this._activeFollows
    }


    groupVideosByChannelName() {
        const records = this.records;

        const groupedObj = records.reduce((acc: any, record: any) => {
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