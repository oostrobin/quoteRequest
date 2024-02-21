import { UPDATE_FORM_DATA } from "../actions/actions.types"


const initialstate = {
    formData: {}
}

export function formReducer(state = initialstate, action: any) {
    switch (action.type) {
        case UPDATE_FORM_DATA:
            return {
                ...state,
                formData: action.payload
            }
        default:
            return state
    }
}