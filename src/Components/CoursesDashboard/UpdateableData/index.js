import React, { Component } from 'react';
import { Label, Input } from 'reactstrap';
import { getCourseData, postCourseData } from '../request';

class UpdateableData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  async updateValue() {
    const { fetchUrl } = this.props;
    const value = await getCourseData(fetchUrl);
    this.setState({ value })
  }

  async componentDidMount() {
    await this.updateValue();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      await this.updateValue();
    }
  }

  changeHandler(e) {
    const { title, updateUrl } = this.props;
    const { value } = e.target;
    const type = title.toLowerCase();
    postCourseData(updateUrl, { [type]: value });
    this.setState({ value: value })
  }

  renderInputType() {
    const { value } = this.state;
    const { type, inputs } = this.props;

    if (type) {
      switch(type) {
        case "select":
          return (
            <Input type="select" name="select" id="exampleSelect" value={value} onChange={this.changeHandler}>
              {inputs.map((input, index)=> <option key={index} value={input.id}>{input.category}</option>)}
            </Input>
          )
        case "textarea":
          return (
            <Input
              type="textarea"
              value={value}
              onChange={this.changeHandler}
              style={{ height: 200 }}
            />
          );
        default:
          break;
      }
    }

    return (
      <Input value={value} onChange={this.changeHandler} />
    );
  }

  render() {
    const { title, mb } = this.props;
    return (
      <div className={`${mb ? `mb-${mb}` : 'mb-2'} d-flex align-items-center`}>
        <Label className="mr-3 mb-0">{title}: </Label>
        {this.renderInputType()}
      </div>
    );
  }
}

export default UpdateableData;