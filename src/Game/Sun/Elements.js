import React from 'react';
import styled, { keyframes } from 'styled-components';

import { withAssets } from 'Engine/AssetLoader';

import implosionImg from '../../../assets/images/implosion.png';


const generateMandalaAnimation = boundary => keyframes`
  from { background-position: 0 0; }
  to { background-position: -${3 * boundary}px 0; }
`;

export const Mandala = withAssets((props) => {
  // console.log('mandala', props);

  const mandalaSprites = [
    props.assets['images/mandala-01.png'],
    props.assets['images/mandala-02.png'],
    props.assets['images/mandala-03.png'],
    props.assets['images/mandala-04.png'],
    props.assets['images/mandala-05.png'],
    props.assets['images/mandala-06.png'],
    props.assets['images/mandala-07.png'],
    props.assets['images/mandala-08.png'],
    props.assets['images/mandala-09.png'],
  ];

  const StyledComponent = styled.div`
    position: fixed;
    top: ${props.position.y}px;
    left: ${props.position.x}px;
    transform: translate(-50%, -50%);
    z-index: -1;

    height: ${props.boundary}px;
    width: ${props.boundary}px;
    border-radius: 50%;
    background-image: url(${mandalaSprites[props.level]});
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

export const Implosion = styled.div`
  position: fixed;
  top: ${props => props.position.y}px;
  left: ${props => props.position.x}px;
  z-index: -1;

  background-image: url(${implosionImg});
  height: 1167px;
  width: 1167px;

  animation: ${implodeAnim} ${props => props.duration}ms linear forwards;
`;
