import * as React from 'react';
import * as style from './style.css';
import { UserActions } from 'app/actions/users';
import { UserItem } from '../UserItem';
import { UserModel } from 'app/models/UserModel';

export namespace UserList {
  export interface Props {
    users: UserModel[];
    actions: UserActions;
  }
}

export class UserList extends React.Component<UserList.Props, any> {
  constructor(props: UserList.Props) {
    super(props);

    this.state = { selectedUser: '' };
  }

  render() {
    const { users, actions } = this.props;
    return (
      <section className={style.main}>
        <ul className={style.normal}>
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              completeUser={actions.completeUser}
              deleteUser={actions.deleteUser}
              editUser={actions.editUser}
            />
          ))}
        </ul>
        <input type="button" className={style.btnPick} value="Pick User" onClick={this.pickUser} />
      </section>
    );
  }

  pickUser = () => {
    let item = this.props.users[Math.floor(Math.random() * this.props.users.length)];

    while (item.text == this.state.selectedUser && this.props.users.length > 1) {
      item = this.props.users[Math.floor(Math.random() * this.props.users.length)];
    }
    this.setState({ selectedUser: item.text });
    alert('Selected User: ' + item.text);
  };
}
