const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGOUT = "LOGOUT";

export const loginSuccess = (payload) => ({
  type: "LOGIN_SUCCESS",
  payload,
});
export const loginFailure = (payload) => ({
  type: "LOGIN_FAILURE",
  payload,
});
export const logout = () => ({
  type: "LOGOUT",
});

const initialState = {
  isAuthenticated: false,
  user: null,
};

function procesUserData(userData) {
  let user = null;
  if (userData.data.userDetails) {
    user = {
      userDetails: userData.data.userDetails,
    };
  }
  return user;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: procesUserData(action.payload),
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
