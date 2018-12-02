import React from 'react';
import _ from 'lodash';
import ReactHowler from 'react-howler' 

import Counter from '../Counter/Counter';
import GameConfig from 'constants/Config';

class SingSystem extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()) {
      if (this.props.pressedKeys.length > 0) {
        this.setState({ counterStage: Counter.RUNNING });
      } else {
        this.setState({ counterStage: Counter.CLEAR });
      }
    }
  }

  render() {
    return (
      <Counter interval={500} stage={this.state.counterStage}>
        {count => (
          <>
            {GameConfig.sounds.map(sound => {
              return (
                <ReactHowler
                  key={sound.key}
                  ref={(ref) => ( this[`soundSource_${sound.key}`] = ref)}
                  src={sound.path}
                  playing={this.props.pressedKeys.includes(sound.key)}
                  onPause={() => this[`soundSource_${sound.key}`].stop()}
                />
              )
            })}

            {this.props.children(count)}
          </>
        )}
      </Counter>
    );
  }
}

export default SingSystem;
