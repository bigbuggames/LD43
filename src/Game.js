import React from 'react';
import ReactDOM from 'react-dom';

import Keyboard from './Components/Keyboard/Keyboard';
import SingSystem from './Components/SingSystem/SingSystem';

function Game() {
  return (
    <Keyboard>
      {key => (
        <SingSystem keyCode={key}>
          {(currentSingTime, handleSingTimeReset) => {
            return (
              <div>
                <div>key: {key}</div>
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

