import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory} from 'react-router-dom';

const Menu = (props) => {
  let { children, opened, title, depth, url, borderBottom } = props;
  const history = useHistory();
  const onClick = () => {
    if ( url ) {
      history.push(url);
    }
  }
  if ( !depth ) {
    depth = 1
  }
  return (
      <div
        style={{ borderTop: '1px solid rgb(227,227,227)', borderBottom: borderBottom ? '1px solid rgb(227,227,227)' : '0px solid white' }}
        className={`py-3 d-flex pr-3 ${(children && children.length) || url  ? 'pointer-on-hover': ''} ${(children && children.length) || url ? 'red-on-hover': ''} ${opened ? 'red-text' : ''}`}
        onClick={onClick}
      >
          <p
            className={`mb-0`}
            style={{ paddingLeft: depth*20, fontSize: 12}}
          >
            {title}
          </p>
          {(children && children.length) || url ? <FontAwesomeIcon className="ml-auto" icon={opened ? faAngleDown : faAngleRight} /> : null}
        </div>
  );
}

export default Menu;