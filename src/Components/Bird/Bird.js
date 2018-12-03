import React from 'react';
import ReactHowler from 'react-howler' 

import { 
  AnimationContainer, 
  Idle, 
  Sing, 
  Sacrifice, 
  animations 
} from './Elements';

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

class Bird extends React.PureComponent {
  static IDLE = 0;
  static SING = 1;
  static SACRIFICE = 2;

  state = {
    birdState: Bird.IDLE
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()) {

      // Sacrifice state
      if (this.props.pressedKeys.includes(' ') === true) {
        this.setState({ 
          birdState: Bird.SACRIFICE
        });
        return;
      }

      // Sing state
      if (this.props.pressedKeys.length > 0) {
        this.setState({ 
          birdState: Bird.SING
        });
        return;
      }

      // Idle state
      this.setState({ 
        birdState: Bird.IDLE
      });
    }  
  }

  render() {
    return (
      <AnimationContainer state={this.state.birdState}>

        {sounds.map(sound => (
          <ReactHowler
            key={sound.key}
            ref={(ref) => ( this[`soundSource_${sound.key}`] = ref)}
            src={sound.blob}
            playing={this.props.pressedKeys.includes(sound.key)}
            onPause={() => this[`soundSource_${sound.key}`].stop()}
          />
        ))}

        {this.state.birdState === Bird.IDLE && 
          <Idle duration={6.3} />
        }

        {this.state.birdState === Bird.SING &&
          <Sing url={_.sample(animations['sing'])} />
        }

        {this.state.birdState === Bird.SACRIFICE &&
          <Sacrifice>

          </Sacrifice>
        }

      </AnimationContainer>
    )
  }
}

export default Bird;
