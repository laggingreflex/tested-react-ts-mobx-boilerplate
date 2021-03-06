import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { TodoFilter, TODO_FILTER_TITLES, TODO_FILTER_TYPES } from '../../constants/todos';

export interface FooterProps {
  filter: TodoFilter;
  activeCount: number;
  completedCount: number;
  onChangeFilter: (filter: TodoFilter) => any;
  onClearCompleted: () => any;
}

export interface FooterState {
  /* empty */
}

export class Footer extends React.Component<FooterProps, FooterState> {

  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: TodoFilter) {
    const title = TODO_FILTER_TITLES[filter];
    const { filter: selectedFilter, onChangeFilter } = this.props;
    const className = classNames({
      [style.selected]: filter === selectedFilter
    });

    return (
      <a className={className}
         style={{ cursor: 'pointer' }}
         onClick={() => onChangeFilter(filter)}
         data-automation-id={'BUTTON_' + title.toUpperCase()}>
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button className={style.clearCompleted} onClick={onClearCompleted}>
          Clear completed
        </button>
      );
    }
    return undefined;   //dummy
  }

  render() {
    return (
      <footer className={style.normalFooter}>
        {this.renderTodoCount()}
        <ul className={style.filters}>
          {TODO_FILTER_TYPES.map((filter) =>
            <li key={filter} children={this.renderFilterLink(filter)} />
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

export default Footer;
