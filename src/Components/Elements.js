import styled from 'styled-components';

import Config from 'constants/Config';

console.log(Config.images.foreground)

export const Foreground = styled.div`
  position: absolute;
  top: 0;
  width: 1920px;
  height: 1080px;
  background-image: url(${Config.images.foreground});
`;


export const Button = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid tomato;
  background-color: papayawhip;
  margin: 10px 10px;
`;

export const MainBird = styled.div`
  position: absolute;
  left: 250px;
  top: 510px;

  width: 254px;
  height: 328px;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  display: block;
`;

export const SecondaryBird = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;

  width: 50px;
  height: 50px;
  border: 3px dashed lightgreen;
`;

