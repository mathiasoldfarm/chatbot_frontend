import React, { Component, Children, cloneElement } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({child}) => {
  return <div id={child.key}>{cloneElement(child)}</div>;
});

const SortableList = SortableContainer(({children}) => {
  return (
    <ul style={{ paddingLeft: 0, marginBottom: 0 }}>
      {Children.map(children, (child, index) => (
        <SortableItem key={child.key} index={index} child={child} />
      ))}
    </ul>
  );
});

class SortableWrapper extends Component {
  render() {
    const { children, onSortEnd } = this.props;
    if ( children.length > 0 ) {
      return (
        <SortableList children={children} onSortEnd={onSortEnd} />
      )
    } return null;
  }
}

export default SortableWrapper;