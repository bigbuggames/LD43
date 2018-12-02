import React from 'react';
import ReactDOM from 'react-dom';

import styled, { createGlobalStyle } from 'styled-components';


import Keyboard from './Components/Keyboard';
import SingSystem from './Components/SingSystem';
import BirdSpawner from './Components/SpawnSystem';

import GameConfig from 'constants/Config';

import { Foreground, Button } from './Components/Elements';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    margin: 0px;
    padding: 0px;
  }
`;

const LogicContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;


function Game() {
  const allowedSoundKeys = GameConfig.sounds.map(sound => sound.key);

  return (
    <div>
      <GlobalStyle />
      <Foreground />

      <Keyboard allowedKeys={allowedSoundKeys}>
        {pressedKeys => (
          <SingSystem pressedKeys={pressedKeys}>
            {(currentSingTime, handleSingTimeReset) => {
              return (
                <BirdSpawner
                  singTime={currentSingTime}
                  singTimeReset={handleSingTimeReset}
                >
                {(props) => {
                  return (
                    <LogicContainer>
                      <div>pressedKeys: {JSON.stringify(pressedKeys)}</div>
                      <div>singTime: {currentSingTime}</div>
                      <Button onClick={handleSingTimeReset}>RESET</Button>
                    </LogicContainer>
                  )
                }}
                </BirdSpawner>
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

