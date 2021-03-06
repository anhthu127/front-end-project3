import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "../../crud/auth.crud";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  ForgotPassword: "[ForgotPassword] Action",
  ConfirmForgotPassword: "[ConfirmForgotPassword] Action"
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  userRole: undefined
};

export const reducer = persistReducer(
  { storage, key: "vietlook-auth", whitelist: ["user", "authToken", "userRole"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;
        console.log(authToken);
        localStorage.setItem("token", authToken)
        return { authToken, user: undefined, userRole: undefined };
      }

      case actionTypes.ForgotPassword: {
        const { authToken } = action.payload;
        return { authToken, user: undefined, userRole: undefined };
      }

      case actionTypes.ConfirmForgotPassword: {
        const { authToken } = action.payload;

        return { authToken, user: undefined, userRole: undefined };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined, userRole: undefined };
      }
      case actionTypes.Logout: {
        console.log(state.authToken);
        routerHelpers.forgotLastLocation();
        console.log(initialAuthState);
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user, userRole } = action.payload;
        // localStorage.setItem("token", user.token)
        console.log(action.payload);
        return { ...state, user, userRole };
      }

      default:
        return { ...state };
    }
  }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: (user, userRole) => ({ type: actionTypes.UserLoaded, payload: { user, userRole } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga(data) {
    yield put(actions.requestUser(data.payload.authToken));
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested(data) {
    // const { data: user } = yield getUserByToken(data.payload.user);
    // if (user.signal) {
    const user = {
      data: {
        id: "3b57945d-db28-4f28-af12-15706c00ab24",
        username: "admin1",
        role: "admin"
      }
    }
    yield put(actions.fulfillUser(user.data, user.data.role));
    // } else {
    // yield put(actions.logout());
    // }
  });
}
