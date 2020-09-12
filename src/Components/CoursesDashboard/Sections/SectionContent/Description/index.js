import React from 'react';
import DescriptionLevels from './DescriptionLevels';

const Description = (props) => {
  const { id, categories } = props;
  return (
    <div>
      <p>Type: beskrivelse</p>
      <DescriptionLevels descriptionId={id} categories={categories} />
    </div>
  );
}

export default Description;