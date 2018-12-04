import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

import Keyboard from './Components/Keyboard';
import Bird from './Components/Bird';
import Spawner from './Components/Spawner';
import Sun from './Components/Sun';

import Config from 'constants/Config';
import { Button } from './Components/Elements';

import foregroundImage from '../assets/images/Background.png';

const GlobalStyle = createGlobalStyle`
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
    pointer-events: none;
    cursor: none;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Screen = styled.div`
  width: 1920px;
  height: 1080px;
  transform: scale(0.7);
  overflow: hidden;
  background-color: #D46C32;
  animation: ${fadeIn} 4s ease-in;
`;

const Foreground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${foregroundImage});
`;

class Game extends React.Component {

  render() {
    return (
      <Screen>
        <GlobalStyle />

        <Keyboard allowedKeys={['q', 'w', 'e', ' ']}>
          {pressedKeys => (
            <div>
              <Foreground />
              <Bird pressedKeys={pressedKeys} />
              <Spawner pressedKeys={pressedKeys} spawnRate={2} />
              <Sun pressedKeys={pressedKeys} />
            </div>
          )}
        </Keyboard>
      </Screen>
    )
  }
}


const rootElement = document.getElementById('root');
ReactDOM.render(<Game />, rootElement);

if (process.env.NODE_ENV !== 'production') {
  // Enables hot module reloading
  if(module.hot) {
    module.hot.accept();
  }
}

