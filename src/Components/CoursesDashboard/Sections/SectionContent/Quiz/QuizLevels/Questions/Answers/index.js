import React, { Component } from 'react';
import { getCourseData, postCourseData } from '../../../../../../request';
import { Card, Row, Col } from 'reactstrap';
import UpdateableData from '../../../../../../UpdateableData';
import SortableWrapper from '../../../../../../SortableWrapper';
import AddButton from '../../../../../../Buttons/Add';
import DeleteButton from '../../../../../../Buttons/Delete';

class Answers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerIds: []
    }

    this.renderAnswers = this.renderAnswers.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async updateValue() {
    const { questionId } = this.props;
    const answerIds = await getCourseData(`/answers/fetch/id/${questionId}`);
    this.setState({ answerIds });
  }

  async componentDidMount() {
    await this.updateValue();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.questionId !== prevProps.questionId) {
      await this.updateValue();
    }
  }
  
  renderAnswers() {
    const { answerIds } = this.state;
    return (
      <SortableWrapper>
        {answerIds.map((id) => {
          return (
            <Card className="mb-3" style={{ border: 'none', background: 'none' }} key={id}>
              <Row>
                <Col>
                  <UpdateableData
                    title={"Answer"}
                    id={id}
                    fetchUrl={`/answers/fetch/answer/${id}`}
                    updateUrl={`/answers/update/answer/${id}`}
                  />
                </Col>
                <Col xs={2}>
                  <div className="d-flex justify-content-end">
                    <DeleteButton onDelete={() => this.onDelete(id)} text="Slet svar" />
                  </div>
                </Col>
              </Row>
            </Card>
          );
        })}
      </SortableWrapper>
    )
  }

  async onAdd() {
    const { questionId } = this.props;
    const response = await postCourseData(`/answers/add/${questionId}`);
    const { id } = response;
    this.setState({ answerIds: [...this.state.answerIds, id] });
  }

  async onDelete(id) {
    await postCourseData(`/answers/delete/${id}`);
    this.setState({ answerIds: this.state.answerIds.filter(answerId => answerId !== id) });
  }

  render() {
    return (
      <div className="px-4 mt-3">
        <Row>
          <Col xs={2}>
            <p>Answers:</p>
          </Col>
          <Col xs={10}>
            <AddButton onAdd={this.onAdd} text="Tilføj svar" />
          </Col>
        </Row>
        {this.renderAnswers()}
      </div>
    );
  }
}

export default Answers;