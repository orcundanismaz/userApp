import * as React from 'react';
import * as style from './style.css';
import * as classNames from 'classnames';
import { UserModel } from 'app/models';

export const FILTER_TITLES = {
  [UserModel.Filter.SHOW_ALL]: 'All',
  [UserModel.Filter.SHOW_ACTIVE]: 'Active',
  [UserModel.Filter.SHOW_COMPLETED]: 'Completed'
};

export namespace Footer {
  export interface Props {
    filter: UserModel.Filter;
    activeCount?: number;
    completedCount?: number;
    onClickFilter: (filter: UserModel.Filter) => any;
    onClickClearCompleted: () => any;
  }
}

export class Footer extends React.Component<Footer.Props> {
  static defaultProps: Partial<Footer.Props> = {
    activeCount: 0,
    completedCount: 0
  };

  renderUserCount(): JSX.Element {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: UserModel.Filter): JSX.Element {
    const { filter: selectedFilter, onClickFilter } = this.props;

    return (
      <a
        className={classNames({ [style.selected]: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onClickFilter(filter)}
        children={FILTER_TITLES[filter]}
      />
    );
  }

  renderClearButton(): JSX.Element | void {
    const { completedCount, onClickClearCompleted } = this.props;
    if (completedCount! > 0) {
      return (
        <button
          className={style.clearCompleted}
          onClick={onClickClearCompleted}
          children={'Clear completed'}
        />
      );
    }
  }

  render() {
    return (
      <footer className={style.normal}>
        {this.renderUserCount()}
        <ul className={style.filters}>
          {(Object.keys(UserModel.Filter) as (keyof typeof UserModel.Filter)[]).map((key) => (
            <li key={key} children={this.renderFilterLink(UserModel.Filter[key])} />
          ))}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
