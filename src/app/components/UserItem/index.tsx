import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { UserModel } from 'app/models';
import { UserActions } from 'app/actions';

export namespace UserItem {
  export interface Props {
    user: UserModel;
    editUser: typeof UserActions.editUser;
    deleteUser: typeof UserActions.deleteUser;
    completeUser: typeof UserActions.completeUser;
  }

  export interface State {
    editing: boolean;
  }
}

export class UserItem extends React.Component<UserItem.Props, UserItem.State> {
  constructor(props: UserItem.Props, context?: any) {
    super(props, context);
    this.state = { editing: false };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id: number, text: string) {
    if (text.length === 0) {
      this.props.deleteUser(id);
    } else {
      this.props.editUser({ id, text });
    }
    this.setState({ editing: false });
  }

  render() {
    const { user, deleteUser } = this.props;

    let element = (
      <div className={style.view}>
        <label>{user.text}</label>
        <button
          className={style.destroy}
          onClick={() => {
            if (user.id) deleteUser(user.id);
          }}
        />
      </div>
    );

    // TODO: compose
    const classes = classNames({
      [style.completed]: user.completed,
      [style.editing]: this.state.editing,
      [style.normal]: !this.state.editing
    });

    return <li className={classes}>{element}</li>;
  }
}
