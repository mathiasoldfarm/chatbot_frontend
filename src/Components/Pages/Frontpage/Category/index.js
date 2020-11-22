import React from 'react';

const Category = (props) => {
  const {
    onClick,
    colorClass,
    category
  } = props;
  return (
    <div
      style={{ backgroundColor: "black" }}
      onClick={onClick}
    >
      <div
        className={`bg-${colorClass} pointer-on-hover`}
        style={{
          paddingTop: '50%',
          paddingBottom: '50%'
        }}
        >
        <span 
          className="position-absolute d-flex justify-content-center align-items-center text-white text-decoration-none"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {category}
        </span>
      </div>
    </div>
  );
}

export default Category;