import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { UserActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { UserModel } from 'app/models';
import { omit } from 'app/utils';
import { Header, UserList } from 'app/components';

const FILTER_VALUES = (Object.keys(UserModel.Filter) as (keyof typeof UserModel.Filter)[]).map(
  (key) => UserModel.Filter[key]
);

const FILTER_FUNCTIONS: Record<UserModel.Filter, (user: UserModel) => boolean> = {
  [UserModel.Filter.SHOW_ALL]: () => true,
  [UserModel.Filter.SHOW_ACTIVE]: (user) => !user.completed,
  [UserModel.Filter.SHOW_COMPLETED]: (user) => user.completed
};

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    users: RootState.UserState;
    actions: UserActions;
    filter: UserModel.Filter;
  }
}

@connect(
  (state: RootState, ownProps): Pick<App.Props, 'users' | 'filter'> => {
    const hash = ownProps.location && ownProps.location.hash.replace('#', '');
    const filter = FILTER_VALUES.find((value) => value === hash) || UserModel.Filter.SHOW_ALL;
    return { users: state.users, filter };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(omit(UserActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {
    filter: UserModel.Filter.SHOW_ALL
  };

  constructor(props: App.Props, context?: any) {
    super(props, context);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleClearCompleted(): void {
    const hasCompletedUser = this.props.users.some((user) => user.completed || false);
    if (hasCompletedUser) {
      this.props.actions.clearCompleted();
    }
  }

  handleFilterChange(filter: UserModel.Filter): void {
    this.props.history.push(`#${filter}`);
  }

  render() {
    const { users, actions, filter } = this.props;

    const filteredUsers = filter ? users.filter(FILTER_FUNCTIONS[filter]) : users;

    return (
      <div className={style.normal}>
        <Header addUser={actions.addUser} />
        <UserList users={filteredUsers} actions={actions} />
      </div>
    );
  }
}
