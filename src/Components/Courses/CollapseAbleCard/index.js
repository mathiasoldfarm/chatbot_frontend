import React, { Component } from 'react';
import { Card, Button, Modal, ModalHeader, ModalFooter  } from 'reactstrap';
import {
  deleteCourse,
  deleteSection,
  deleteDescription,
  deleteQuiz,
  deleteLevel,
  deleteQuestion
} from '../../../Redux/Actions/Courses';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    const { 
      type,
      deleteCourse,
      deleteSection,
      deleteDescription,
      deleteQuiz,
      deleteLevel,
      deleteQuestion,
      key,
      courseindex,
      sectionindex,
      descriptionindex,
      quizindex,
      levelindex,
      questionindex
    } = this.props;
    switch(type) {
      case "course":
        deleteCourse(courseindex);
        break;
      case "section":
        deleteSection(sectionindex, courseindex);
        break;
      case "description":
        deleteDescription(descriptionindex, sectionindex, courseindex);
        break;
      case "quiz":
        deleteQuiz(quizindex, sectionindex, courseindex);
        break;
      case "level":
        deleteLevel(levelindex, quizindex, sectionindex, courseindex);
        break;
      case "question":
        deleteQuestion(questionindex, levelindex, quizindex, sectionindex, courseindex);
        break;
      default:
        break;
    }
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

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteCourse,
  deleteSection,
  deleteDescription,
  deleteQuiz,
  deleteLevel,
  deleteQuestion
}, dispatch);

export default connect(null, mapDispatchToProps)(CollapseAbleCard);