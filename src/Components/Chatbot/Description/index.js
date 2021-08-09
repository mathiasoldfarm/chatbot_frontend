import React from 'react';
//import Math from '../../Chatbot/Math';
import ReactHtmlParser from 'react-html-parser';

//<Math style={{ display: "inline-block" }} tex={content} key={key} />

// const getElementMapper = (description) => {
//   const elementMapper = {};
//   updateElementMapper(elementMapper, description, 'title');
//   updateElementMapper(elementMapper, description, 'latex');
//   updateElementMapper(elementMapper, description, 'image');
//   updateElementMapper(elementMapper, description, 'H2');

//   return elementMapper;
// }

const Description = (props) => {
  // const renderDescription = (description) => {
  //   const children = [];
  //   if ( description && description.length > 0 ) {
  //     const elementMapper = getElementMapper(description);
  //     let stringBuilder = '';
  //     let ignoreUntil = -1;
  //     [...description].forEach((c, index) => {
  //       if (index < ignoreUntil) {
  //         return;
  //       } else if (index === ignoreUntil) {
  //         ignoreUntil = -1;
  //       }
  //       if ( index in elementMapper ) {
  //         children.push(<span key={index}>{stringBuilder}</span>);
  //         children.push(elementMapper[index].element);
  //         ignoreUntil = elementMapper[index].endIndex;
  //         stringBuilder = '';
  //       } else {
  //         stringBuilder += c;
  //       }
  //     });
  //     children.push(<span key={children.length}>{stringBuilder}</span>);
  //   } else {
  //     children.push(<p>Non elements found</p>);
  //   }
    
  //   return <div className="description-container" style={{ whiteSpace: "pre-wrap" }}>
  //     {children.map(child => child)}
  //   </div>;
  // }

  const { className, data } = props;
  return (
    <div className={className ? className : null}>
      {/* TODO: Handle different levels */}
      {/* {renderDescription(data.levels[0].description)} */}
      {ReactHtmlParser(data.levels[0].description)}
    </div>
  );
}

export default Description;