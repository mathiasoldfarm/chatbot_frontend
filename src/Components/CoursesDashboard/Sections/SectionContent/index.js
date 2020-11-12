import React, { Component } from 'react';
import { getCourseData } from '../../request';
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
    const { id, type } = await getCourseData(`/sections/fetch/content/${sectionId}`);
    this.setState({ sections: [{ id, type }] });
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