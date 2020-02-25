import { UserModel } from 'app/models';

export interface RootState {
  users: RootState.UserState;
  router?: any;
}

export namespace RootState {
  export type UserState = UserModel[];
}
