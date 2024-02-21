import { UPDATE_FORM_DATA } from "./actions.types";

export function updateFormData(payload: any)   {
  return { type: UPDATE_FORM_DATA, payload };
}