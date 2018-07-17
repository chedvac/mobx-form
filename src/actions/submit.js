import asyncAction from "../networking/asyncAction";
import MWRequestDefaultBehavior from "../networking/mwWrapper";
import { isSuccededResponse } from "../networking/MWResponse";
import { runInAction } from "mobx";

const submitAction = async function(set_isFormSent) {
  const response = await MWRequestDefaultBehavior({
    action: "submit",
    data: {
      processID: null,
      requestID: "68a3c145-7d73-44c1-9d4e-8d7e5542e8e0",
      formData: {}
    }
  });
  const state = isSuccededResponse(response.data);
  // set_isFormSent(state);
};
export default submitAction;
