import React from 'react';
import ReactDOM from 'react-dom';

import Counter from '../Counter/Counter';

import {
  Anchor,
  Mandala,
  Explosion,
  Implosion
} from './Elements';

const sunPosition = { x: 50, y: 700 };
const explosionTime = 2400;
const implosionTime = 1300;

export default class Sun extends React.Component {
  state = {
    level: 0,
    exploding: false,
    imploding: false,
    levelBondaries: [330, 494, 563, 605, 699, 901, 983, 1076]
  };

  handlePrev = () => {
    if (this.state.level > 0) {
      this.setState({ 
        exploding: true,
        level: this.state.level - 1 
      }, () => {
        setTimeout(() => {
          this.setState({
            exploding: false
          })
        }, explosionTime);
      });
    }
  };

  handleNext = () => {
    if (this.state.level < this.state.levelBondaries.length - 1) {
      this.setState({ 
        imploding: true
      }, () => {
        setTimeout(() => {
          this.setState({
            level: this.state.level + 1,
            imploding: false
          })
        }, implosionTime);
      });
    }
  };

  grow = (interval) => {
    setTimeout(() => {
      this.handleNext();
      this.grow(interval);
    }, interval);
  }

  componentDidMount() {
    this.grow(10000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()) {
      if (this.props.pressedKeys.includes(' ')) {
        setTimeout(() => {
          this.handlePrev();
        }, 1300);
      }
    }
  }

  render() {
    const boundary = this.state.levelBondaries[this.state.level];
    const currentCenter = boundary / 2;

    return (
      <div>
        <Counter interval={2000} onTick={() => console.log('grow!!!!')}>{() => {}}</Counter>

        <Anchor>
          <Mandala 
            position={sunPosition}
            boundary={boundary} 
          >
            {this.state.exploding && <Explosion boundary={boundary} />}
            {this.state.imploding && <Implosion boundary={boundary} />}
          </Mandala>
        </Anchor>
      </div>
    );
  }
}
