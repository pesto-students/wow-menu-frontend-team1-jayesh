const SET_DETAILS = "SET_DETAILS";

export const setCompanyDetails = (payload) => ({
  type: "SET_DETAILS",
  payload, // {restaurant details}
});

const initialState = {
  id: "12345",
  name: "ZEESHAN",
  address: "5/1, Ho Chi Minh Sarani, Kolkata 40",
  table: "7",
  cgst: "5",
  sgst: "5",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAILS: {
      return action.payload;
    }
    default:
      return state;
  }
};
