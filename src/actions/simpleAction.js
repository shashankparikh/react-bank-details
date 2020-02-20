import api from "../service";


export const simpleAction = () => dispatch => {
  dispatch({ type: "GET_LOADING_STATUS" });
  return api
    .getData(`https://vast-shore-74260.herokuapp.com/banks?city=UDAIPUR`)
    .getResponseData("")
    .then(res => {
        return dispatch({
          type: "SIMPLE_ACTION",
          value: res.data
        });
     
    })
    .catch(err => {
      console.log(err)

    });
};