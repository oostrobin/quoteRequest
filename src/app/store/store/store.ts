import { BehaviorSubject } from "rxjs";
import { formReducer } from "./reducers/form.reducer";


class Store {
  private state = new BehaviorSubject<any>({ formData : {} });

  get stateAsObservable() {
    return this.state.asObservable();
  }

  dispatch(action: any) {
    const currentState = this.state.getValue();
    const newState = formReducer(currentState, action);
    this.state.next(newState);
  }
}

export const store = new Store();