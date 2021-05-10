import React from 'react';
import Emoji from '../../../../Utils/Emoji';

const CourseMenuItem = (props) => {
  const { course, color, status } = props;
  const status_percent = status * 100;
  console.log(status);
  return (
    <a
      style={{
        border: '1px solid #413F3F',
        display: 'inline-block',
        borderRadius: 90,
        padding: '8px 20px',
        color: 'black',
        textDecoration: 'none',
        background: `-webkit-linear-gradient(left, #98FB98 ${status_percent}%,#ffffff ${status_percent}%)`,
        background:   `-moz-linear-gradient(left, #98FB98 ${status_percent}%, #ffffff ${status_percent}%)`,
        background:     `-ms-linear-gradient(left, #98FB98 ${status_percent}%,#ffffff ${status_percent}%)`,
        background:      `-o-linear-gradient(left, #98FB98 ${status_percent}%,#ffffff ${status_percent}%)`,
        background:     `linear-gradient(to right, #98FB98 ${status_percent}%,#ffffff ${status_percent}%)`,
      }}
      className="mr-4 course-menu-item pointer-on-hover blue-border-on-hover"
      href={'/learn/' + course.toLowerCase().replace(" ", "-")}
    >
      <Emoji style={{ fontSize: 20 }} className="mr-2" symbol="😀"/>
      <span>{course}</span>
    </a>
  );
}

export default CourseMenuItem;