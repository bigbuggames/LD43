import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import sample from 'lodash/sample';
import { withAssets } from 'Engine/AssetLoader';

export const animations = {
  'idle': keyframes`
    from { background-position: 0 0; }
    to { background-position: -20944px 0; }
  `,
  // 'sacrifice': birdSacrifice,
  // 'sing': [ birdSing01, birdSing02, birdSing03 ]
};

export const Idle = withAssets(styled.div`
  width: 238px;
  height: 222px;
  background-image: url(${props => props.assets.images['bird-idle'].locator});
  background-origin: top left;
  animation: ${animations['idle']} ${props => props.duration}s steps(88) infinite;
`);

export const Sing = withAssets((props) => {
  const currentSprite = sample([
    props.assets.images['bird-sing-01'].locator,
    props.assets.images['bird-sing-02'].locator,
    props.assets.images['bird-sing-03'].locator
  ])

  const StyledComponent =styled.div`
    width: 254px;
    height: 328px;
    background-repeat: no-repeat;
    display: block;
    background-origin: top left;
    background-image: url(${currentSprite});
  `;

  return <StyledComponent />
});

export const Sacrifice = withAssets((props) => {
  const StyledComponent =styled.div`
    width: 254px;
    height: 328px;
    background-origin: top left;
    background-image: url(${props.assets.images['bird-sacrifice'].locator});
    background-repeat: no-repeat;
    display: block;
  `;

  return <StyledComponent />
});

export const AnimationContainer = styled.div`
  position: absolute;

  ${props => props.state === 0 
    ? css`
      left: 250px;
      top: 610px;
      width: 238px;
       height: 222px;
    `
    : css`
      left: 250px;
      top: 510px;
      height: 328px;
      width: 254px;
    `
  }

  transform-origin: top right;
  transform: 
    rotateY(${props => props.mirror ? '180deg' : '0deg' })
    scale(${props => props.scale});
`;
