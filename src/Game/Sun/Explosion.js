import React from 'react';
import styled, { keyframes } from 'styled-components';

import explosionSheet from '../../../assets/images/explosion.png';

const explosionAnimation = angle => keyframes`
  0% { 
    background-position: 0 0;
    transform: rotate(${angle}deg);
    opacity: 0;
  }

  1% {
    opacity: 1;
  }

  100% { 
    background-position: -15138px 0px; 
    transform: rotate(${angle}deg);
  }
`;

const Piece = styled.div`
  position: absolute;
  height: 1531px;
  width: 522px;
  background-image: url(${explosionSheet});
  transform-origin: top left;
  animation: ${props => props.animation} 3s steps(29) infinite;
`;

const generatePieceAngles = () => {
  const numberOfPieces = 7;
  const pieceAngle = 180 / numberOfPieces;
  const startingPoint = 120;

  const pieces = [];
  for (let x = 0; x < numberOfPieces; x++) {
    pieces.push(startingPoint + x * pieceAngle);
  }

  return pieces;
};

const ExplosionContainer = styled.div`
  position: fixed;
  top: ${props => props.position.y}px;
  left: ${props => props.position.x}px;
  z-index: -1;
`;

export default function Explosion(props) {
  return (
    <ExplosionContainer position={props.position}>
      {generatePieceAngles().map(angle => (
        <Piece key={`angle_${angle}`} animation={explosionAnimation(angle)} />
      ))}
    </ExplosionContainer>
  );
}
