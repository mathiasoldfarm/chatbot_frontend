import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import currentSectionName from '../../../Utils/CurrentSectionName';
import { base } from '../../../constants';
import { Row, Col } from 'reactstrap';

const Menu = (props) => {
  let { children, opened, title, depth, url, borderBottom, done, onIconClick, onTextClick } = props;
  const history = useHistory();
  // const onClick = () => {
  //   if ( url ) {
  //     history.push(url);
  //   }
  // }

  if ( !depth ) {
    depth = 1
  }
  return (
      <Row
        style={{ borderTop: '1px solid rgb(207 207 207)', borderBottom: borderBottom ? '1px solid rgb(207 207 207)' : '0px solid white', color: '#3b3b3b' }}
      >
        <Col
          className={`py-3 d-flex align-items-center pr-3 pointer-on-hover grey-on-hover ${props.currentSectionName === title ? 'blue-text' : url && window.location.href === base + url ? 'blue-text' : ''}`}
          onClick={onTextClick}
        >
          <p
            className={`mb-0`}
            style={{ paddingLeft: depth*20, fontSize: '1rem'}}
          >
            {title}
          </p>
          {url ? null : <FontAwesomeIcon icon={faCheckCircle} className="ml-2" style={{ fontSize: 12, color: done ? 'rgb(36 205 74)' : '#acacac' }} />}
        </Col>
        <Col
           xs={2}
           className="p-3 pointer-on-hover"
           onClick={onIconClick}
        >
          {(children && children.length) || url ? <FontAwesomeIcon className="ml-auto" icon={opened ? faAngleDown : faAngleRight} /> : null}
        </Col>
      </Row>
);
}

const mapStateToProps = state => ({
  currentSectionName: currentSectionName(state)
});

export default connect(mapStateToProps)(Menu);