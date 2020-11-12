import React from 'react';
import { MathComponent } from 'mathjax-react'

const Math = (props) => {
  return (
    <div style={props.style || ''}>
      <MathComponent tex={String.raw`${props.tex}`} />
    </div>
  );
}

export default Math;