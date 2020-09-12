import React, { Component } from 'react';
import { getCourseData, postCourseData } from '../../../../request';
import { Card, Row, Col, Button } from 'reactstrap';
import UpdateableData from '../../../../UpdateableData';
import AddButton from '../../../../Buttons/Add';
import DeleteButton from '../../../../Buttons/Delete';
import Questions from './Questions';

class QuizLevels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelIds: [],
      openLevelIds: []
    }

    this.renderLevels = this.renderLevels.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async updateValue() {
    const { quizId } = this.props;
    const levelIds = await getCourseData(`/levels/quizzes/fetch/id/${quizId}`);
    this.setState({ levelIds });
  }

  async componentDidMount() {
    await this.updateValue();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.quizId !== prevProps.quizId) {
      await this.updateValue();
    }
  }

  handleCollapse(id, opened) {
    if (opened) {
      this.setState({
        openLevelIds: this.state.openLevelIds.filter(_id => _id !== id)
      });
    } else {
      this.setState({
        openLevelIds: [...this.state.openLevelIds, id]
      })
    }
  }
  
  renderLevels() {
    const { levelIds, openLevelIds } = this.state;
    return levelIds.map((id) => {
      const opened = openLevelIds.includes(id);
      return (
        <Card className="mb-5" style={{ border: 'none', background: 'none' }} key={id}>
          <Row className="align-items-center mb-3">
            <Col xs={8}>
              <UpdateableData
                title={"Level"}
                id={id}
                fetchUrl={`/levels/quizzes/fetch/level/${id}`}
                updateUrl={`/levels/quizzes/update/level/${id}`}
                mb='0'
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
            <Col xs={2}>
              <div className="d-flex justify-content-end">
                <DeleteButton onDelete={() => this.onDelete(id)} text="Slet level" />
              </div>
            </Col>
          </Row>
          {opened ? <Questions levelId={id} /> : null}
        </Card>
      )
    })
  }

  async onAdd() {
    const { quizId } = this.props;
    const response = await postCourseData(`/levels/quizzes/add/${quizId}`);
    const { id } = response;
    this.setState({ levelIds: [...this.state.levelIds, id] });
  }

  async onDelete(id) {
    await postCourseData(`/levels/quizzes/delete/${id}`);
    this.setState({ levelIds: this.state.levelIds.filter(levelId => levelId !== id) });
  }

  render() {
    return (
      <div className="px-4">
        <Row>
          <Col xs={2}>
            <p>Levels:</p>
          </Col>
          <Col xs={10}>
            <AddButton onAdd={this.onAdd} text="Tilføj nyt level" />
          </Col>
        </Row>
        {this.renderLevels()}
      </div>
    );
  }
}

export default QuizLevels;