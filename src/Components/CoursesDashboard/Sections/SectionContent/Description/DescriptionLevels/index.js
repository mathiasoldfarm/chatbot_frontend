import React, { Component } from 'react';
import { getCourseData, postCourseData } from '../../../../request';
import { Card, Row, Col } from 'reactstrap';
import UpdateableData from '../../../../UpdateableData';
import AddButton from '../../../../Buttons/Add';
import DeleteButton from '../../../../Buttons/Delete';

class DescriptionLevels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levelIds: []
    }

    this.renderLevels = this.renderLevels.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async updateValue() {
    const { descriptionId } = this.props;
    const levelIds = await getCourseData(`/levels/descriptions/fetch/id/${descriptionId}`);
    this.setState({ levelIds });
  }

  async componentDidMount() {
    await this.updateValue();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.descriptionId !== prevProps.descriptionId) {
      await this.updateValue();
    }
  }
  
  renderLevels() {
    const { levelIds } = this.state;
    const { categories } = this.props;
    return levelIds.map((id) => {
      return (
        <Card className="p-2 mb-2" style={{ border: 'none', background: 'none' }} key={id}>
          <Row className="align-items-center">
            <Col xs={11}>
              <UpdateableData
                title={"Description"}
                id={id}
                fetchUrl={`/levels/descriptions/fetch/description/${id}`}
                updateUrl={`/levels/descriptions/update/description/${id}`}
                type="textarea"
              />
              <UpdateableData
                title={"Level"}
                id={id}
                fetchUrl={`/levels/descriptions/fetch/level/${id}`}
                updateUrl={`/levels/descriptions/update/level/${id}`}
              />
              <UpdateableData
                title={"Category"}
                id={id}
                fetchUrl={`/levels/descriptions/fetch/category/${id}`}
                updateUrl={`/levels/descriptions/update/category/${id}`}
                type="select"
                inputs={categories}
              />
            </Col>
            <Col xs={1}>
              <DeleteButton onDelete={() => this.onDelete(id)} />
            </Col>
          </Row>
        </Card>
      )
    })
  }

  async onAdd() {
    const { descriptionId } = this.props;
    const response = await postCourseData(`/levels/descriptions/add/${descriptionId}`);
    const { id } = response;
    this.setState({ levelIds: [...this.state.levelIds, id] });
  }

  async onDelete(id) {
    await postCourseData(`/levels/descriptions/delete/${id}`);
    this.setState({ levelIds: this.state.levelIds.filter(levelId => levelId !== id) });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={2}>
            <p>Levels:</p>
          </Col>
          <Col>
            <AddButton onAdd={this.onAdd} text="Tilføj nyt level" />
          </Col>
        </Row>
        {this.renderLevels()}
      </div>
    );
  }
}

export default DescriptionLevels;