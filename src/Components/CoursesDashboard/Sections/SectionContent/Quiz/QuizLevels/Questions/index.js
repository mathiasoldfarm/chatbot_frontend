import React, { Component } from 'react';
import { getCourseData, postCourseData } from '../../../../../request';
import { Card, Row, Col, Button } from 'reactstrap';
import UpdateableData from '../../../../../UpdateableData';
import AddButton from '../../../../../Buttons/Add';
import DeleteButton from '../../../../../Buttons/Delete';
import Answers from './Answers';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIds: [],
      openIds: [],
      possibleAnswers: {}
    }

    this.renderQuestions = this.renderQuestions.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async updateValue() {
    const { levelId } = this.props;
    const questionData = await getCourseData(`/questions/fetch/id/${levelId}`);
    this.setState({
      questionIds: questionData.questionIds,
      possibleAnswers: questionData.possibleAnswers
    });
  }

  async componentDidMount() {
    await this.updateValue();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.levelId !== prevProps.levelId) {
      await this.updateValue();
    }
  }

  handleCollapse(id, opened) {
    if (opened) {
      this.setState({
        openIds: this.state.openIds.filter(_id => _id !== id)
      });
    } else {
      this.setState({
        openIds: [...this.state.openIds, id]
      })
    }
  }
  
  renderQuestions() {
    const { questionIds, possibleAnswers, openIds } = this.state;
    return questionIds.map((id) => {
      const opened = openIds.includes(id);
      return (
        <Card className="mb-3" style={{ border: 'none', background: 'none' }} key={id}>
          <Row>
            <Col xs={7}>
              <UpdateableData
                title={"Question"}
                id={id}
                fetchUrl={`/questions/fetch/question/${id}`}
                updateUrl={`/questions/update/question/${id}`}
              />
            </Col>
            <Col xs={2}>
              <div className="d-flex justify-content-end">
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => this.handleCollapse(id, opened)}
                >
                  {opened ? "Luk" : "Åben"}
                </Button>
              </div>
            </Col>
            <Col xs={3}>
              <div className="d-flex justify-content-end">
                <DeleteButton onDelete={() => this.onDelete(id)} text="Slet spørgsmål" />
              </div>
            </Col>
          </Row>
          {opened ? (
              <React.Fragment>
                <UpdateableData
                  title={"Correct"}
                  id={id}
                  fetchUrl={`/questions/fetch/correct/${id}`}
                  updateUrl={`/questions/update/correct/${id}`}
                  type="select"
                  inputs={possibleAnswers[id]}
                />
                <Answers questionId={id} />
              </React.Fragment>
          ) : null}
        </Card>
      )
    })
  }

  async onAdd() {
    const { levelId } = this.props;
    const response = await postCourseData(`/questions/add/${levelId}`);
    const { id } = response;
    this.setState({
      questionIds: [...this.state.questionIds, id],
      possibleAnswers: {...this.state.possibleAnswers, [id]: []}
    });
  }

  async onDelete(id) {
    await postCourseData(`/questions/delete/${id}`);
    const updatedPossibleAnswers = {
      ...this.state.possibleAnswers
    }
    delete updatedPossibleAnswers[id];
    this.setState({
      questionIds: this.state.questionIds.filter(levelId => levelId !== id),
      possibleAnswers: updatedPossibleAnswers
    });
  }

  render() {
    return (
      <div className="px-4 mt-2">
        <Row>
          <Col xs={2}>
            <p>Questions:</p>
          </Col>
          <Col xs={10}>
            <AddButton onAdd={this.onAdd} text="Tilføj spørgsmål" />
          </Col>
        </Row>
        {this.renderQuestions()}
      </div>
    );
  }
}

export default Questions;