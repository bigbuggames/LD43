import styled, { createGlobalStyle, keyframes } from 'styled-components';

import foregroundImage from '../../assets/images/foreground.png';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    overflow: hidden;

    /* pointer-events: none;
    cursor: default;
    text-decoration: none;
    color: black; */
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Screen = styled.div`
  width: 1920px;
  height: 1080px;
  transform: scale(0.7);
  overflow: hidden;
  background-color: #D46C32;
  animation: ${fadeIn} 4s ease-in;
`;

export const Foreground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${foregroundImage});
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
