import React, { Component } from 'react';
import AddButton from './Buttons/Add';
import DeleteButton from './Buttons/Delete';
import { Spinner, Alert, Card } from 'reactstrap';
import { getCourseData, postCourseData } from './request';
import { connect } from 'react-redux';
import UpdateableData from './UpdateableData';
import Sections from './Sections';

class CoursesDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesIds: [],
      descriptionCategories: []
    }

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() {
    const coursesIds = await getCourseData('/courses/fetch/id');
    const descriptionCategories = await getCourseData('/levels/descriptions/fetch/categories');
    this.setState({ coursesIds, descriptionCategories });
  }

  renderLoader() {
    const { loading } = this.props;
    if (loading) {
      return <div><Spinner color="primary" className="float-right" /></div>
    }
  }

  renderError() {
    const { error } = this.props;
    if ( error ) {
      return <div><Alert color="danger">{error}</Alert></div>
    }
  }

  renderCourses() {
    const { coursesIds, descriptionCategories } = this.state;
    return coursesIds.map((id, index) => {
      return (
        <Card className="p-5 mt-5" key={index}>
          <DeleteButton onDelete={() => this.onDelete(id)} text="Slet kursus" />
          <UpdateableData
            title={"Title"}
            id={id}
            fetchUrl = {`/courses/fetch/title/${id}`}
            updateUrl = {`/courses/update/title/${id}`}
          />
          <UpdateableData
            title={"Description"}
            id={id}
            fetchUrl = {`/courses/fetch/description/${id}`}
            updateUrl = {`/courses/update/description/${id}`}
          />
          <Sections courseId={id} descriptionCategories={descriptionCategories} />
        </Card>
      );
    })
  }

  async onAdd() {
    const response = await postCourseData("/courses/add");
    const { id } = response;
    this.setState({ coursesIds: [...this.state.coursesIds, id] });
  }

  async onDelete(id) {
    await postCourseData(`/courses/delete/${id}`);
    this.setState({ coursesIds: this.state.coursesIds.filter(courseId => courseId !== id) });
  }

  render() {
    return (
      <div>
        {this.renderLoader()}
        {this.renderError()}
        <div>
          <p>Edit/Add/Delete coursedata:</p>
          <AddButton onAdd={this.onAdd} text="Tilføj kursus" />
          <div>
            {this.renderCourses()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.courses.coursesFetching,
  error: state.courses.coursesFetchingError
})

export default connect(mapStateToProps)(CoursesDashboard);