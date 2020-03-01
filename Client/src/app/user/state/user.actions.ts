import { User, UserToLogin } from '../user.model';

/* NgRx */
import { Action } from '@ngrx/store';

export enum UserActionTypes {
  CreateUser = '[User] Create User',
  CreateUserSuccess = '[User] Create User Success',
  CreateUserFailure = '[User] Create User Failure',
  LoginUser = '[User] Login User',
  LoginUserSuccess = '[UserSuccess] Login User Success',
  LoginUserFailure = '[User] Login User Failure',
  LogoutUser = '[User] Logout User',
  GetAdminUsers = '[User] Get Admin Users',
  GetAdminUsersSuccess = '[User] Get Admin Users Success',
  GetAdminUsersFailure = '[User] Get Admin Users Failure'
}

// Action Creators

export class CreateUser implements Action {
  readonly type = UserActionTypes.CreateUser;

  constructor(public payload: User) {
      this.type = UserActionTypes.CreateUser;
  }
}

export class CreateUserSuccess implements Action {
  readonly type = UserActionTypes.CreateUserSuccess;

  constructor(public payload: any) {
      this.type = UserActionTypes.CreateUserSuccess
  }
}

export class CreateUserFailure implements Action {
  readonly type = UserActionTypes.CreateUserFailure;

  constructor(public payload: any) {
      this.type = UserActionTypes.CreateUserFailure
  }
}

export class LoginUser implements Action {
  readonly type = UserActionTypes.LoginUser;

  constructor(public payload: UserToLogin) {
      this.type = UserActionTypes.LoginUser
  }
}
export class LoginUserSuccess implements Action {
  readonly type = UserActionTypes.LoginUserSuccess;

  constructor(public payload: any) {
      this.type = UserActionTypes.LoginUserSuccess
  }
}
export class LoginUserFailure implements Action {
  readonly type = UserActionTypes.LoginUserFailure;

  constructor(public payload: any) {
      this.type = UserActionTypes.LoginUserFailure
  }
}

export class LogoutUser implements Action {
  readonly type = UserActionTypes.LogoutUser;

  constructor() {
      this.type = UserActionTypes.LogoutUser
  }
}

export class GetAdminUsers implements Action {
  readonly type = UserActionTypes.GetAdminUsers;

  constructor(public payload: number) {
      this.type = UserActionTypes.GetAdminUsers
  }
}
export class GetAdminUsersSuccess implements Action {
  readonly type = UserActionTypes.GetAdminUsersSuccess;

  constructor(public payload: any) {
      this.type = UserActionTypes.GetAdminUsersSuccess
  }
}
export class GetAdminUsersFailure implements Action {
  readonly type = UserActionTypes.GetAdminUsersFailure;

  constructor(public payload: any) {
      this.type = UserActionTypes.GetAdminUsersFailure
  }
}

export type UserActions = CreateUser
    | CreateUserSuccess
    | CreateUserFailure
    | LoginUser
    | LoginUserSuccess
    | LoginUserFailure
    | LogoutUser
    | GetAdminUsers
    | GetAdminUsersSuccess
    | GetAdminUsersFailure;