import { createAction } from 'redux-actions';
import { UserModel } from 'app/models';

export namespace UserActions {
  export enum Type {
    ADD_USER = 'ADD_USER',
    EDIT_USER = 'EDIT_USER',
    DELETE_USER = 'DELETE_USER',
    COMPLETE_USER = 'COMPLETE_USER',
    COMPLETE_ALL = 'COMPLETE_ALL',
    CLEAR_COMPLETED = 'CLEAR_COMPLETED'
  }

  export const addUser = createAction<PartialPick<UserModel, 'text'>>(Type.ADD_USER);
  export const editUser = createAction<PartialPick<UserModel, 'id'>>(Type.EDIT_USER);
  export const deleteUser = createAction<UserModel['id']>(Type.DELETE_USER);
  export const completeUser = createAction<UserModel['id']>(Type.COMPLETE_USER);
  export const completeAll = createAction(Type.COMPLETE_ALL);
  export const clearCompleted = createAction(Type.CLEAR_COMPLETED);
}

export type UserActions = Omit<typeof UserActions, 'Type'>;
