import React from 'react';
import _ from 'lodash';
import ReactHowler from 'react-howler' 

import Counter from '../Counter/Counter';
import GameConfig from 'constants/Config';

class SingSystem extends React.Component {
  state = {
    counterStage: Counter.STOP
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()) {

      // Pressed some key
      if (this.props.pressedKeys.length > 0) {
        this.setState({ counterStage: Counter.RUN });
      }

      // No keys pressed
      if (this.props.pressedKeys.length === 0) {
        this.setState({ counterStage: Counter.STOP });
      }
    }
  }

  handleReset = () => {
    this.setState({ counterStage: Counter.STOP }, () => {
      if (this.props.pressedKeys.length > 0) {
        this.setState({ counterStage: Counter.RUN })
      }
    });
  }

  render() {
    return (
      <Counter interval={500} stage={this.state.counterStage}>
        {count => (
          <>
            {GameConfig.sounds.map(sound => (
              <ReactHowler
                key={sound.key}
                ref={(ref) => ( this[`soundSource_${sound.key}`] = ref)}
                src={sound.path}
                playing={this.props.pressedKeys.includes(sound.key)}
                onPause={() => this[`soundSource_${sound.key}`].stop()}
              />
            ))}

            {this.props.children(count, this.handleReset)}
          </>
        )}
      </Counter>
    );
  }
}

export default SingSystem;
