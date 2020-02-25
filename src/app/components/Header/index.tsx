import * as React from 'react';
import { UserTextInput } from '../UserTextInput';
import { UserActions } from 'app/actions/users';

export namespace Header {
  export interface Props {
    addUser: typeof UserActions.addUser;
  }
}

export class Header extends React.Component<Header.Props> {
  constructor(props: Header.Props, context?: any) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    if (text.length) {
      this.props.addUser({ text });
    }
  }

  render() {
    return (
      <header>
        <h1>Users</h1>
        <UserTextInput newUser onSave={this.handleSave} placeholder="Enter a name?" />
      </header>
    );
  }
}
