import React from 'react';
import _ from 'lodash';
import ReactHowler from 'react-howler' 

import Counter from '../Counter';
import Bird from '../Bird';

import a from '../../../assets/sounds/metal-gong.mp3';
import s from '../../../assets/sounds/chinese-gong.mp3'
import d from '../../../assets/sounds/tibetan-bells.mp3'
import f from '../../../assets/sounds/zen-temple-bells.mp3'
import space from '../../../assets/sounds/zen-temple-bells.mp3'

const sounds = [
  { key: 'a', blob: a },
  { key: 's', blob: s },
  { key: 'd', blob: d },
  { key: 'f', blob: f },
  { key: ' ', blob: space },
]

class SingSystem extends React.Component {
  state = {
    counterStage: Counter.STOP
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()) {

      // Pressed some key
      if (this.props.pressedKeys.length > 0) {
        this.setState({ 
          counterStage: Counter.RUN
        });
      }

      // No keys pressed
      if (this.props.pressedKeys.length === 0) {
        this.setState({ 
          counterStage: Counter.STOP
        });
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
            {sounds.map(sound => (
              <ReactHowler
                key={sound.key}
                ref={(ref) => ( this[`soundSource_${sound.key}`] = ref)}
                src={sound.blob}
                playing={this.props.pressedKeys.includes(sound.key)}
                onPause={() => this[`soundSource_${sound.key}`].stop()}
              />
            ))}

            <Bird pressedKeys={this.props.pressedKeys} />

            {this.props.children(count, this.handleReset)}
          </>
        )}
      </Counter>
    );
  }
}

export default SingSystem;
