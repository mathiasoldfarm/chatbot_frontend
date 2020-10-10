import React from 'react';
import { MathComponent } from 'mathjax-react'

const Math = (props) => {
  return (
    <MathComponent tex={String.raw`${props.tex}`} />
  );
}

export default Math;