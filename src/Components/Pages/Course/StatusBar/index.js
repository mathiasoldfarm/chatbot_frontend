import React from 'react';

const StatusBar = (props) => {
  const { level, status, title, onClick } = props;
  return (
    <div className="mb-4 pointer-on-hover" onClick={onClick}>
      <div style={{ backgroundColor: 'rgb(84,213,114)', position: 'relative' }}>
        <div
          style={{ backgroundColor: 'rgb(21,172,56)', position: 'absolute', top: 0, bottom: 0, width: `${status}%`, display: 'block' }}
        ></div>
        <span
          style={{
            fontSize: 10,
            padding: 1,
            width: 'fit-content',
            position: 'relative',
          }}
          className="mx-auto d-block text-white"
        >
          Level {level}: {status}% completed
        </span>
      </div>
      <p className="mb-0 underline-on-parent-hover">{title}</p>
    </div>
  );
}

export default StatusBar;