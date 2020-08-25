import { 
  UPDATE_TITLE,
  UPDATE_SHORT_DESCRIPTION,
  FETCH_JSON,
  UPDATE_SECTION_NAME,
  UPDATE_DESCRIPTION,
  UPDATE_QUIZ_TITLE,
  UPDATE_LEVEL,
  UPDATE_QUESTION,
  UPDATE_POSSIBLE_ANSWER,
  DELETE_COURSE,
  DELETE_DESCRIPTION,
  DELETE_LEVEL,
  DELETE_QUESTION,
  DELETE_QUIZ,
  DELETE_SECTION,
} from '../../ActionTypes/Courses';

const INITIAL_STATE = {
  data: {}
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, index) => {
          if (index === action.index) {
            return {
              ...course,
              title: action.value
            }
          }
          return course;
        })}
      }
    case UPDATE_SHORT_DESCRIPTION:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, index) => {
          if (index === action.index) {
            return {
              ...course,
              short_description: action.value
            }
          }
          return course;
        })}
      }
    case UPDATE_SECTION_NAME:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, index) => {
          if (index === action.index) {
            return {
              ...course,
              sections: course.sections.map((section, sectionindex) => {
                if (sectionindex === action.sectionindex) {
                  return {
                    ...section,
                    sectionname: action.value
                  }
                }
                return section;
              })
            }
          }
          return course;
        })}
      }
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, index) => {
          if (index === action.index) {
            return {
              ...course,
              sections: course.sections.map((section, sectionindex) => {
                if (sectionindex === action.sectionindex) {
                  return {
                    ...section,
                    descriptions: section.descriptions.map((_description, descriptionindex) => {
                      if (descriptionindex === action.descriptionindex) {
                        return {
                          ..._description,
                          [action.inputtype]: action.value
                        }
                      }
                      return _description;
                    })
                  }
                }
                return section;
              })
            }
          }
          return course;
        })}
      }
    case UPDATE_QUIZ_TITLE:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, index) => {
          if (index === action.index) {
            return {
              ...course,
              sections: course.sections.map((section, sectionindex) => {
                if (sectionindex === action.sectionindex) {
                  return {
                    ...section,
                    quizzes: section.quizzes.map((quiz, quizindex) => {
                      if (quizindex === action.quizindex) {
                        return {
                          ...quiz,
                          quiztitle: action.value
                        }
                      }
                      return quiz;
                    })
                  }
                }
                return section;
              })
            }
          }
          return course;
        })}
      }
    case UPDATE_LEVEL:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, index) => {
          if (index === action.index) {
            return {
              ...course,
              sections: course.sections.map((section, sectionindex) => {
                if (sectionindex === action.sectionindex) {
                  return {
                    ...section,
                    quizzes: section.quizzes.map((quiz, quizindex) => {
                      if (quizindex === action.quizindex) {
                        return {
                          ...quiz,
                          levels: quiz.levels.map((level, levelindex) => {
                            if (levelindex === action.levelindex) {
                              return {
                                ...level,
                                ["level"]: action.value
                              }
                            }
                            return level;
                          })
                        }
                      }
                      return quiz;
                    })
                  }
                }
                return section;
              })
            }
          }
          return course;
        })}
      }
    case UPDATE_QUESTION:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, index) => {
          if (index === action.index) {
            return {
              ...course,
              sections: course.sections.map((section, sectionindex) => {
                if (sectionindex === action.sectionindex) {
                  return {
                    ...section,
                    quizzes: section.quizzes.map((quiz, quizindex) => {
                      if (quizindex === action.quizindex) {
                        return {
                          ...quiz,
                          levels: quiz.levels.map((level, levelindex) => {
                            if (levelindex === action.levelindex) {
                              return {
                                ...level,
                                questions: level.questions.map((question, questionindex) => {
                                  if (questionindex === action.questionindex) {
                                    return {
                                      ...question,
                                      [action.inputtype]: action.value
                                    }
                                  }
                                  return question;
                                })
                              }
                            }
                            return level;
                          })
                        }
                      }
                      return quiz;
                    })
                  }
                }
                return section;
              })
            }
          }
          return course;
        })}
      }
    case UPDATE_POSSIBLE_ANSWER:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, index) => {
          if (index === action.index) {
            return {
              ...course,
              sections: course.sections.map((section, sectionindex) => {
                if (sectionindex === action.sectionindex) {
                  return {
                    ...section,
                    quizzes: section.quizzes.map((quiz, quizindex) => {
                      if (quizindex === action.quizindex) {
                        return {
                          ...quiz,
                          levels: quiz.levels.map((level, levelindex) => {
                            if (levelindex === action.levelindex) {
                              return {
                                ...level,
                                questions: level.questions.map((question, questionindex) => {
                                  if (questionindex === action.questionindex) {
                                    return {
                                      ...question,
                                      possible_answers: question.possible_answers.map((answer, answerindex) => {
                                        if (answerindex === action.answerindex) {
                                          return action.value;
                                        }
                                        return answer;
                                      })
                                    }
                                  }
                                  return question;
                                })
                              }
                            }
                            return level;
                          })
                        }
                      }
                      return quiz;
                    })
                  }
                }
                return section;
              })
            }
          }
          return course;
        })}
      }
    case DELETE_COURSE:
      return {
        ...state,
        data: {
          courses: state.data.courses.filter((course, courseindex) => courseindex !== action.courseindex)
        }
      }
    case DELETE_SECTION:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, courseindex) => {
          if (courseindex === action.courseindex) {
            return {
              ...course,
              sections: course.sections.filter((section, sectionindex) => sectionindex !== action.sectionindex)
            }
          }
          return course;
        })}
      }
    case DELETE_DESCRIPTION:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, courseindex) => {
          if (courseindex === action.courseindex) {
            return {
              ...course,
              sections: course.sections.map((section, sectionindex) => {
                if (sectionindex === action.sectionindex) {
                  return {
                    ...section,
                    descriptions: section.descriptions.filter((description, descriptionindex) => descriptionindex !== action.descriptionindex)
                  }
                }
                return section;
              })
            }
          }
          return course;
        })}
      }
    case DELETE_QUIZ:
      return {
        ...state,
        data: {courses: state.data.courses.map((course, courseindex) => {
          if (courseindex === action.courseindex) {
            return {
              ...course,
              sections: course.sections.map((section, sectionindex) => {
                if (sectionindex === action.sectionindex) {
                  return {
                    ...section,
                    quizzes: section.quizzes.filter((quiz, quizindex) => quizindex !== action.quizindex)
                  }
                }
                return section;
              })
            }
          }
          return course;
        })}
      }
    case FETCH_JSON:
      return {
        ...state,
        data: action.data
      }
    default:
      return state;
  }
}

export default reducer;