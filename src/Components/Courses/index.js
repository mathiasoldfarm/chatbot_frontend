import React, { Component } from 'react';
import InputLine from './InputLine';
import CollapseAbleCard from './CollapseAbleCard';
import {
  updateTitle,
  updateShortdescription,
  fetchJson,
  updateSectionname,
  updateDescription,
  updateQuiztitle,
  updateLevel,
  updateQuestion,
  updatePossibleAnswer
} from '../../Redux/Actions/Courses';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import AddButton from './AddButton';

class Courses extends Component {
  
  componentDidMount() {
    this.props.fetchJson();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.courseData) !== JSON.stringify(this.props.courseData)) {
      axios.post(`http://localhost:8000/update_json`, JSON.stringify(this.props.courseData));
    }
  }

  renderCourses() {
    const { courseData } = this.props;
    return courseData.courses.map((course, index) => {
      const { title, short_description, sections } = course;
      const {
        updateTitle,
        updateShortdescription,
        updateSectionname,
        updateDescription,
        updateQuiztitle,
        updateLevel,
        updateQuestion,
        updatePossibleAnswer
      } = this.props;
      return ( 
        <CollapseAbleCard key={index} className="p-5" type="course">
          <div>
            <InputLine
              name="Title"
              value={title}
              onChange={(e) => updateTitle(e.target.value, index)}
            />
            <InputLine
              name="Intro"
              textarea
              value={short_description}
              onChange={(e) => updateShortdescription(e.target.value, index)}
            />
            <div>
              <h5>Sections:</h5>
              {sections.map((section, sectionindex) => {
                const { sectionname, descriptions, quizzes } = section;
                return (
                  <div key={sectionindex}>
                    <CollapseAbleCard className="p-5" key={sectionindex} courseindex={index} type="section">
                      <InputLine
                        name="Section name"
                        value={sectionname}
                        onChange={(e) => updateSectionname(e.target.value, index, sectionindex)}
                      />
                      <div>
                        <h5>Descriptions: </h5>
                        {descriptions.map((_description, descriptionindex) => {
                          const { description, level, category } = _description;
                          return (
                            <div key={descriptionindex} className="mb-5">
                              <CollapseAbleCard type="description" key={descriptionindex} sectionindex={sectionindex} courseindex={index} className="p-5">
                                <InputLine
                                  name="Description"
                                  value={description}
                                  onChange={(e) => updateDescription(e.target.value, index, sectionindex, descriptionindex, "description")}
                                />
                                <InputLine
                                  name="Level"
                                  value={level}
                                  onChange={(e) => updateDescription(e.target.value, index, sectionindex, descriptionindex, "level")}
                                />
                                <InputLine
                                  name="Category"
                                  value={category}
                                  onChange={(e) => updateDescription(e.target.value, index, sectionindex, descriptionindex, "category")}
                                />
                              </CollapseAbleCard>
                            </div>
                          )
                        })}
                        <h5>Quizzes: </h5>
                        {quizzes.map((quiz, quizindex) => {
                          const { quiztitle, levels } = quiz;
                          return (
                            <div key={quizindex}>
                              <CollapseAbleCard type="quiz" key={quizindex} courseindex={index} sectionindex={sectionindex} className="p-5">
                                <InputLine
                                  name="Quiz name"
                                  value={quiztitle}
                                  onChange={(e) => updateQuiztitle(e.target.value, index, sectionindex, quizindex)}
                                />
                                <div>
                                  <h5>Levels: </h5>
                                  {levels.map((_level, levelindex) => {
                                    const { level, questions } = _level;
                                    return (
                                      <div key={levelindex}>
                                        <CollapseAbleCard type="level" key={levelindex} quizindex={quizindex} sectionindex={sectionindex} courseindex={index} className="p-5 mb-5">
                                          <InputLine
                                            name="level"
                                            value={level}
                                            onChange={(e) => updateLevel(e.target.value, index, sectionindex, quizindex, levelindex)}
                                          />
                                          <div>
                                            <h5>Questions: </h5>
                                            {questions.map((_question, questionindex) => {
                                              const { question, possible_answers, right_answer } = _question;
                                              return (
                                                <div key={questionindex}>
                                                  <CollapseAbleCard type="question" key={questionindex} courseindex={index} sectionindex={sectionindex} levelindex={levelindex} quizindex={quizindex} className="p-5 mb-5">
                                                    <InputLine
                                                      name="Question"
                                                      value={question}
                                                      onChange={(e) => updateQuestion(e.target.value, index, sectionindex, quizindex, levelindex, questionindex, "question")}
                                                    />
                                                    <h5>Possible answers: </h5>
                                                    {possible_answers.map((answer, answerindex) => {
                                                      return (
                                                        <InputLine
                                                          key={answerindex}
                                                          name={`Possible answer ${answerindex+1}`}
                                                          value={answer}
                                                          onChange={(e) => updatePossibleAnswer(e.target.value, index, sectionindex, quizindex, levelindex, questionindex, answerindex)}
                                                        />
                                                      )
                                                    })}
                                                    <InputLine
                                                      name="Right answer"
                                                      value={right_answer}
                                                      onChange={(e) => updateQuestion(e.target.value, index, sectionindex, quizindex, levelindex, questionindex, "right_answer")}
                                                    />
                                                  </CollapseAbleCard>
                                                </div>
                                              )
                                            })}
                                          </div>
                                        </CollapseAbleCard>
                                      </div>
                                    );
                                  })}
                                </div>
                              </CollapseAbleCard>
                            </div>
                          )
                        })}
                      </div>
                    </CollapseAbleCard>
                  </div>
                );
              })}
            </div>
          </div>
        </CollapseAbleCard>
      );
    })
  }

  render() {
    const { courseData } = this.props;
    if (!courseData.courses || courseData.courses.length < 1) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h2>Add, edit or delete course data</h2>
        {this.renderCourses()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courseData: state.courses.data
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateTitle,
  updateShortdescription,
  updateSectionname,
  fetchJson,
  updateDescription,
  updateQuiztitle,
  updateLevel,
  updateQuestion,
  updatePossibleAnswer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Courses);