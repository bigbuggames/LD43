import React from 'react';
import ReactDOM from 'react-dom';

import Keyboard from 'Engine/Keyboard';
import AssetLoader from 'Engine/AssetLoader';
import Bird from 'Game/Bird';
import Spawner from 'Game/Spawner';
import Sun from 'Game/Sun';

import {
  Screen,
  GlobalStyle,
  Foreground
} from './Elements';

import assetList from 'constants/Assets';

class Game extends React.Component {
  render() {
    return (
      <AssetLoader assets={assetList}>
        {(loaded, loadedAssets) => {
          if (loaded === false) {
            return <div>Loading...</div>
          }

          return (
            <Screen>
              <GlobalStyle />
      
              <Keyboard allowedKeys={['q', 'w', 'e', ' ']}>
                {pressedKeys => (
                  <>
                    <Foreground />
                    <Bird pressedKeys={pressedKeys} />
                    <Spawner pressedKeys={pressedKeys} spawnRate={2} />
                    <Sun pressedKeys={pressedKeys} />
                  </>
                )}
              </Keyboard>
            </Screen>
          )
        }}
      </AssetLoader>
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

