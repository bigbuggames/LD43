import React from 'react';
import styled, { keyframes } from 'styled-components';

import { withAssets } from 'Engine/AssetLoader';

const generateMandalaAnimation = boundary => keyframes`
  from { background-position: 0 0; }
  to { background-position: -${3 * boundary}px 0; }
`;

export const Mandala = withAssets((props) => {
  const StyledComponent = styled.div`
    position: fixed;
    top: ${props.position.y}px;
    left: ${props.position.x}px;
    transform: translate(-50%, -50%);
    z-index: -1;

    height: ${props.boundary}px;
    width: ${props.boundary}px;
    border-radius: 50%;
    background-image: url(${props.assets.images[`mandala-0${props.level + 1}`].locator});
    background-color: #fad48b;
    box-shadow: 0 0 0 10px #fad48b;

    animation: ${generateMandalaAnimation(props.boundary)} 200ms steps(3)
      infinite;
  `;

  return <StyledComponent />
});

const implodeAnim = keyframes`
  from { 
    transform: 
      translate3d(-50%, -50%, 0)
      scale3d(3, 3, 3); 
  }
  to { 
    transform: 
      translate3d(-50%, -50%, 0) 
      scale3d(0, 0, 0); 
  }
`;

export const Implosion = withAssets(styled.div`
  position: fixed;
  top: ${props => props.position.y}px;
  left: ${props => props.position.x}px;
  z-index: -1;

  background-image: url(${props => props.assets.images['implosion'].locator});
  height: 1167px;
  width: 1167px;

  animation: ${implodeAnim} ${props => props.duration}ms linear forwards;
`);
