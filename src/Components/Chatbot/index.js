import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import Message from './Message';
import axios from 'axios';

class Chatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      MessageList: [{
        "type": "bot",
        "message": "Hello there"
      }],
      input: ""
    }

    this.InputChangeHandler = this.InputChangeHandler.bind(this);
    this.HandleSend = this.HandleSend.bind(this);
    this.RenderMessageList = this.RenderMessageList.bind(this);
  }

  InputChangeHandler(e) {
    this.setState({
      input: e.target.value
    })
  }

  async HandleSend() {
    const { input, MessageList } = this.state;
    const response = await axios.get(`http://localhost:8000/get_answer/${input}`);
    const answer = response.data;
    console.log(response)
    this.setState({
      MessageList: [...MessageList, {"type": "user", "message": input}, {"type": "bot", "message": answer}],
      input: ""
    } );
  }

  RenderMessageList() {
    const { MessageList } = this.state;
    return MessageList.map((message) => {
      if (message.type === "bot") {
        return <Message color="#1c1c88" type="bot" text={message.message} />
      }
      return <Message color="#cc1b1b" text={message.message} />
    })
  }

  render() {
    const { input } = this.state;

    return (
      <div style={{ maxWidth: 700 }}>
        {this.RenderMessageList()}
        <div style={{ marginTop: 50 }}>
          <FormGroup>
            <Label for="exampleText">Skriv din besked</Label>
            <Input type="textarea" name="text" id="exampleText" value={input} onChange={this.InputChangeHandler} />
            <Button color="success" className="mt-3" onClick={this.HandleSend} >Send</Button>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default Chatbot;