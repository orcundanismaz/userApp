import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { UserActions } from 'app/actions/users';
import { UserModel } from 'app/models';

const initialState: RootState.UserState = [
  {
    id: 1,
    text: 'Orcun',
    completed: false
  }
];

export const userReducer = handleActions<RootState.UserState, UserModel>(
  {
    [UserActions.Type.ADD_USER]: (state, action) => {
      if (action.payload && action.payload.text) {
        return [
          {
            id: state.reduce((max, user) => Math.max(user.id || 1, max), 0) + 1,
            completed: false,
            text: action.payload.text
          },
          ...state
        ];
      }
      return state;
    },
    [UserActions.Type.DELETE_USER]: (state, action) => {
      return state.filter((user) => user.id !== (action.payload as any));
    },
    [UserActions.Type.EDIT_USER]: (state, action) => {
      return state.map((user) => {
        if (!user || !action || !action.payload) {
          return user;
        }
        return (user.id || 0) === action.payload.id ? { ...user, text: action.payload.text } : user;
      });
    },
    [UserActions.Type.COMPLETE_USER]: (state, action) => {
      return state.map((user) =>
        user.id === (action.payload as any) ? { ...user, completed: !user.completed } : user
      );
    },
    [UserActions.Type.COMPLETE_ALL]: (state, action) => {
      return state.map((user) => ({ ...user, completed: true }));
    },
    [UserActions.Type.CLEAR_COMPLETED]: (state, action) => {
      return state.filter((user) => user.completed === false);
    }
  },
  initialState
);
