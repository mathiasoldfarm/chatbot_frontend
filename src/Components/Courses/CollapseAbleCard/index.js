import React, { Component } from 'react';
import { Card, Button, Modal, ModalHeader, ModalFooter  } from 'reactstrap';

class CollapseAbleCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      modal: false
    }

    this.toggle = this.toggle.bind(this);
    this.deleteObject = this.deleteObject.bind(this);
    this.confirmedDeletion = this.confirmedDeletion.bind(this);
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  deleteObject() {
    this.setState({
      modal: !this.state.modal
    })
  }

  confirmedDeletion() {
    this.deleteObject();
  }

  render() {
    const { collapsed, modal } = this.state;
    return (
      <div className="d-flex flex-column">
        <div className="mb-2 ml-auto">
          <Button
            color="info"
            onClick={this.toggle}
            className="mr-3"
          >
            Toggle
          </Button>
          <Button color="danger" onClick={this.deleteObject}>
            Delete
          </Button>
          <Modal isOpen={modal} toggle={this.deleteObject}>
            <ModalHeader toggle={this.deleteObject}>Er du sikker på at du vil slette?</ModalHeader>
            <ModalFooter>
              <Button color="success" onClick={this.deleteObject}>Annuler</Button>{' '}
              <Button color="danger" onClick={this.confirmedDeletion}>Slet</Button>
            </ModalFooter>
          </Modal>
        </div>
        <Card className={collapsed ? null : "p-5"}>
          {collapsed ? null : this.props.children}
        </Card>
      </div>
    );
  }
}

export default CollapseAbleCard;