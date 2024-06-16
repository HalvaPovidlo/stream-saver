import {createContext} from "react";
import UserStore from "./store/UserStore";
import RecordStore from "./store/RecordStore";

export interface IGlobalContent {
    userStore: UserStore;
    recordStore: RecordStore;
}

const Context = createContext<IGlobalContent>({userStore: new UserStore, recordStore: new RecordStore});

export default Context;
