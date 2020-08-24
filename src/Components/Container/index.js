import React from 'react';

const Container = (props) => (
  <div style={{ maxWidth: 1000, marginLeft: "auto", marginRight: "auto", textAlign: "left", paddingTop: 50 }}>
    {props.children}
  </div>
)

export default Container;