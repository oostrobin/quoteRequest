import { store } from "../store";


export class Dispatcher {
    dispatch(action: any) {
        store.dispatch(action);
    }
}