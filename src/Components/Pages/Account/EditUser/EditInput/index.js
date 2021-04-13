import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { updateUserField } from '../../../../../Redux/Actions/Pages';

class EditInput extends Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    const { value } = e.target;
    const { id, updateUserField} = this.props;
    updateUserField(id, value);
  }

  render() {
    const { type, name, id, placeholder, data } = this.props;
    const value = data[id];
    return (
      <Input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={this.changeHandler}
        value={value}
      />
    )
  }
}

const mapStateToProps = state => ({
  data: state.pages.data
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateUserField }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditInput);