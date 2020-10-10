import React, { Component } from 'react';
import { getCourseData, postCourseData } from '../request';
import { Card, Button, Row, Col, Modal, ModalBody } from 'reactstrap';
import UpdateableData from '../UpdateableData';
import DeleteButton from '../Buttons/Delete';
import AddButton from '../Buttons/Add';
import SectionContent from './SectionContent';
import SortableWrapper from '../SortableWrapper';

class Sections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionIds: [],
      openedIds: [],
      modalIsOpen: false
    }

    this.renderSections = this.renderSections.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateSort = this.updateSort.bind(this);
  }

  async updateValue() {
    const { courseId } = this.props;
    const sectionIds = await getCourseData(`/sections/fetch/id/${courseId}`);
    this.setState({ sectionIds });
  }

  async componentDidMount() {
    await this.updateValue();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.courseId !== prevProps.courseId) {
      await this.updateValue();
    }
  }

  handleCollapse(id, opened) {
    if (opened) {
      this.setState({
        openedIds: this.state.openedIds.filter(_id => _id !== id)
      });
    } else {
      this.setState({
        openedIds: [...this.state.openedIds, id]
      })
    }
  }

  async updateSort(data) {
    const { oldIndex, newIndex } = data;
    const { courseId } = this.props;
    const body = { oldIndex, newIndex };
    const sectionIds = await postCourseData(`/sections/update/section/order/${courseId}`, body);
    this.setState({
      openIds: [],
      sectionIds
    });
  }
  
  renderSections() {
    const { sectionIds, openedIds } = this.state;
    const { descriptionCategories } = this.props;
    return (
      <SortableWrapper onSortEnd={this.updateSort}>
        {sectionIds.map((id) => {
          const opened = openedIds.includes(id);
          return (
            <Card className="mb-3 p-3" style={{ border: '1px solid lightgrey', backgroundColor: '#f8f8f8' }} key={id}>
              <Row className="align-items-center">
                <Col xs={8}>
                  <UpdateableData
                    title={"Title"}
                    id={id}
                    fetchUrl={`/sections/fetch/title/${id}`}
                    updateUrl={`/sections/update/title/${id}`}
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
                    <DeleteButton onDelete={() => this.onDelete(id)} text="Slet sektion" />
                  </div>
                </Col>
              </Row>
              {opened ? <SectionContent sectionId={id} descriptionCategories={descriptionCategories} /> : null}
            </Card>
          )
        })}
      </SortableWrapper>
    );
  }

  async onAdd(type) {
    const { courseId } = this.props;
    const response = await postCourseData(`/sections/add/${courseId}/${type}`);
    const { id } = response;
    this.setState({ sectionIds: [...this.state.sectionIds, id] });
    this.toggle();
  }

  async onDelete(id) {
    await postCourseData(`/sections/delete/${id}`);
    this.setState({ sectionIds: this.state.sectionIds.filter(sectionId => sectionId !== id) });
  }

  toggle() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  render() {
    const { modalIsOpen } = this.state;
    return (
      <div className="mt-3">
        <Row>
          <Col xs={2}>
            <p>Sections:</p>
          </Col>
          <Col>
            {/* <AddButton onAdd={this.onAdd} className="mb-2" text="Tilføj sektion" /> */}
            <Button size="sm" color="success" onClick={this.toggle}>Tilføj sektion</Button>
          </Col>
        </Row>
        {this.renderSections()}
        <div>
        <Modal isOpen={modalIsOpen} toggle={this.toggle}>
          <ModalBody>
            <p>Hvilken type sektion ønsker du at tilføje?</p>
            <AddButton
              onAdd={() => this.onAdd("description")}
              color="primary"
              className="mr-3"
              text="Description"
            />
            <AddButton
              onAdd={() => this.onAdd("quiz")}
              color="primary"
              text="Quiz"
            />
          </ModalBody>
        </Modal>
        </div>
      </div>
    );
  }
}

export default Sections;