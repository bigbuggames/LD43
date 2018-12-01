import React from 'react';
import ReactDOM from 'react-dom';

import Keyboard from './Components/Keyboard/Keyboard';
import SingSystem from './Components/SingSystem/SingSystem';

import GameConfig from 'constants/Config';


function Game() {
  return (
    <Keyboard allowedKeys={GameConfig.effects}>
      {pressedKeys => (
        <SingSystem pressedKeys={pressedKeys}>
          {(currentSingTime, handleSingTimeReset) => {
            return (
              <div>
                <div>pressedKeys: {JSON.stringify(pressedKeys)}</div>
                <div>singTime: {currentSingTime}</div>
                <div onClick={handleSingTimeReset}>Reset time</div>
              </div>
            );
          }}
        </SingSystem>
      )}
    </Keyboard>
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

