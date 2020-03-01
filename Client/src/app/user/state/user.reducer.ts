import { UserActionTypes, UserActions } from './user.actions';


export interface UserState {
  currentUser: any;
  error: string;
  response: any;
  adminUsers: any[];
}

const initialState: UserState = {
  currentUser: null,
  error: '',
  response: null,
  adminUsers: []
};

export function reducer(state = initialState, action: UserActions): UserState {

  switch (action.type) {
    case UserActionTypes.CreateUserSuccess:
      return {
        ...state,
        response: action.payload,
        error: ''
      };
    case UserActionTypes.CreateUserFailure:
      return {
        ...state,
        response: null,
        error: action.payload
      };
    case UserActionTypes.LoginUserSuccess:
      sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
      return {
        ...state,
        currentUser: action.payload,
        error: ''
      };
    case UserActionTypes.LoginUserFailure:
      return {
        ...state,
        currentUser: null,
        error: action.payload
      };
    case UserActionTypes.LogoutUser:
      sessionStorage.removeItem('currentUser');
      return {
        ...state,
        currentUser: null,
        error: ''
      };
    case UserActionTypes.GetAdminUsersSuccess:
      return {
        ...state,
        adminUsers: action.payload,
        error: ''
      };
    case UserActionTypes.GetAdminUsersSuccess:
      return {
        ...state,
        adminUsers: [],
        error: action.payload
      };
    default:
      return {
        ...state
      };
  }
}    