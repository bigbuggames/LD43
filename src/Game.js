import React from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Keyboard from './Components/Keyboard';
import SingSystem from './Components/SingSystem';
import SpawnSystem from './Components/SpawnSystem';

import Config from 'constants/Config';
import { Button } from './Components/Elements';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    transform: scale(0.8);
    background-color: black;
  }
`;

const Foreground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  background-image: url(${Config.images.foreground});
  background-color: #D46C32;
`;

const LogicContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

function Game() {
  const allowedSoundKeys = Config.sounds.map(sound => sound.key);

  return (
    <div>
      <GlobalStyle />
      <Foreground />

      <Keyboard allowedKeys={allowedSoundKeys}>
        {pressedKeys => (
          <SingSystem pressedKeys={pressedKeys}>
            {(currentSingTime, handleSingTimeReset) => {
              return (
                <div>
                  <SpawnSystem
                    pressedKeys={pressedKeys}
                    singTime={currentSingTime}
                    singTimeReset={handleSingTimeReset}
                  >
                    {sacrifice => {
                      return <div>Hello</div>
                    }}
                  </SpawnSystem>
                </div>
              );
            }}
          </SingSystem>
        )}
      </Keyboard>
    </div>
  );
}


const rootElement = document.getElementById('root');
ReactDOM.render(<Game />, rootElement);

if (process.env.NODE_ENV !== 'production') {
  // Enables hot module reloading
  if(module.hot) {
    module.hot.accept();
  }
}

