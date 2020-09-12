import React, { Component } from 'react';
import { getCourseData, postCourseData } from '../../request';
import { Card } from 'reactstrap';
import Quiz from './Quiz';
import Description from './Description';

class SectionContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: []
    }

    this.renderSectionContentz = this.renderSectionContents.bind(this);
  }

  async updateValue() {
    const { sectionId } = this.props;
    const sectionData = await getCourseData(`/sections/fetch/content/${sectionId}`);
    const sections = sectionData.map((data) => {
      return {
        id: data.type_ref_id,
        type: data.type
      }
    });
    this.setState({ sections });
  }

  async componentDidMount() {
    await this.updateValue();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.sectionId !== prevProps.sectionId) {
      await this.updateValue();
    }
  }
  
  renderSectionContents() {
    const { sections } = this.state;
    const { descriptionCategories } = this.props;
    return sections.map((section) => {
      const { id, type } = section;
      return (
        <Card style={{ border: 'none', background: 'none' }} key={id}>
          {type === "description" ? <Description id={id} categories={descriptionCategories} /> : <Quiz id={id} />}
        </Card>
      )
    })
  }

  render() {
    return (
      <div className="mt-2">
        {this.renderSectionContents()}
      </div>
    );
  }
}

export default SectionContent;