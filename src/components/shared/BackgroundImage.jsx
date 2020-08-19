import React, { useEffect, createRef, Children } from 'react';
import styled, { css } from 'styled-components';
import { findIndex } from 'lodash';
import ObjectFitImage from '@threespot/object-fit-image';
import * as frontline from '#styles/frontline';

const BackgroundImage = ({ className, children }) => {
  const containerRef = createRef();

  function parseChildren(children) {
    const imgNodes = React.Children.toArray(children).filter(child => {
      return child.type === 'img' || child.type === 'picture';
    });
    imgNodes.length > 1 &&
      console.warn('BackgroundImages should only contain 1 direct `img` or `picture` child element');
    const modifiedChildren = Children.map(children, child => {
      if (child.type === 'img' || child.type === 'picture') {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { className: 'bg-image-source' });
        } else {
          return child;
        }
      }
    });
    return modifiedChildren;
  }

  useEffect(() => {
    new ObjectFitImage(containerRef.current);
  });

  return (
    <div className={`bg-image ${className}`} ref={containerRef}>
      {parseChildren(children)}
    </div>
  );
};

export default BackgroundImage;
