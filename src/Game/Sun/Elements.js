import React from 'react';
import styled, { keyframes } from 'styled-components';

import mandala01 from '../../../assets/images/mandala-01.png';
import mandala02 from '../../../assets/images/mandala-02.png';
import mandala03 from '../../../assets/images/mandala-03.png';
import mandala04 from '../../../assets/images/mandala-04.png';
import mandala05 from '../../../assets/images/mandala-05.png';
import mandala06 from '../../../assets/images/mandala-06.png';
import mandala07 from '../../../assets/images/mandala-07.png';
import mandala08 from '../../../assets/images/mandala-08.png';
import mandala09 from '../../../assets/images/mandala-09.png';

import implosionImg from '../../../assets/images/implosion.png';

const mandalaSprites = [
  mandala01,
  mandala02,
  mandala03,
  mandala04,
  mandala05,
  mandala06,
  mandala07,
  mandala08,
  mandala09
];

const generateMandalaAnimation = boundary => keyframes`
  from { background-position: 0 0; }
  to { background-position: -${3 * boundary}px 0; }
`;

export const Mandala = styled.div.attrs()`
  position: fixed;
  top: ${props => props.position.y}px;
  left: ${props => props.position.x}px;
  transform: translate(-50%, -50%);
  z-index: -1;

  height: ${props => props.boundary}px;
  width: ${props => props.boundary}px;
  border-radius: 50%;
  background-image: url(${props => mandalaSprites[props.level]});
  background-color: #fad48b;
  box-shadow: 0 0 0 10px #fad48b;

  animation: ${props => generateMandalaAnimation(props.boundary)} 200ms steps(3)
    infinite;
`;

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
