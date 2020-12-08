import React from 'react';
import { Card } from 'reactstrap';
import Math from '../../Chatbot/Math';
import { images_url_base } from '../../../constants';

const getElementByTag = (tag, content) => {
  switch(tag) {
    case "title":
      return <h5 className="mb-0">{content}</h5>;
    case "latex":
      return <Math style={{ display: "inline-block" }} tex={content} key={tag} />;
    case "image":
      return <img style={{ display: "block", maxWidth: '100%' }} alt={content} src={`${images_url_base}/${content}`} key={tag} />;
    default:
      throw new Error("Couldn't recognize tag");
  }
}

const updateElementMapper = (elementMapper, description, tag) => {
  let matches = description.matchAll(new RegExp(`(<${tag}>).*?(</${tag}>)`, 'g'));
  for(const match of matches) {
    const content = match[0].replace(match[1], '').replace(match[2], '');
    elementMapper[match.index] = {
      element: getElementByTag(tag, content),
      endIndex: match.index + match[0].length
    };
  }
}

const getElementMapper = (description) => {
  const elementMapper = {};
  updateElementMapper(elementMapper, description, 'title');
  updateElementMapper(elementMapper, description, 'latex');
  updateElementMapper(elementMapper, description, 'image');

  return elementMapper;
}

const Description = (props) => {
  let { name, description } = props.data;

  const renderDescription = () => {
    const children = [];
    if ( description && description.length > 0 ) {
      const elementMapper = getElementMapper(description);
      let stringBuilder = '';
      let ignoreUntil = -1;
      [...description].forEach((c, index) => {
        if (index < ignoreUntil) {
          return;
        } else if (index === ignoreUntil) {
          ignoreUntil = -1;
        }
        if ( index in elementMapper ) {
          children.push(<span key={index}>{stringBuilder}</span>);
          children.push(elementMapper[index].element);
          ignoreUntil = elementMapper[index].endIndex;
          stringBuilder = '';
        } else {
          stringBuilder += c;
        }
      });
      children.push(<span key={children.length}>{stringBuilder}</span>);
    } else {
      children.push(<p>Non elements found</p>);
    }
    
    return <div className="description-container" style={{ whiteSpace: "pre-wrap" }}>
      {children.map(child => child)}
    </div>;
  }

  const { className } = props;
  return (
    <Card className={className ? `p-4 ${className}` : `p-4`}>
      <h4>{name}</h4>
      {renderDescription()}
    </Card>
  );
}

export default Description;