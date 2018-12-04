import React from 'react';
import ReactDOM from 'react-dom';
import ReactHowler from 'react-howler' 

import { Mandala, Implosion } from './Elements';
import Explosion from './Explosion';

import music from '../../../assets/sounds/volca-music.mp3';

class Sun extends React.Component {
  state = {
    level: 0,
    implode: false,
    explode: false,
    levelBondaries: [330, 494, 563, 605, 699, 901, 983, 1076, 1213]
  };

  static defaultProps = {
    nextLevelInterval: 10000,
    pressedKeys: []
  };

  handlePrev = () => {
    if (this.state.level > 0 && this.state.explode === false) {
      this.handleExplosion();
      this.setState({ level: this.state.level - 1 });
    }
  };

  handleNext = () => {
    if (
      this.state.level < this.state.levelBondaries.length - 1 &&
      this.state.implode === false
    ) {
      this.handleImplosion();
    }
  };

  handleImplosion = () => {
    if (this.state.implode) {
      return;
    }

    this.setState({ implode: true }, () => {
      setTimeout(() => {
        this.setState({ implode: false, level: this.state.level + 1 });
      }, this.props.nextLevelInterval);
    });
  };

  handleExplosion = () => {
    if (this.state.explode) {
      return;
    }

    this.setState({ explode: true }, () => {
      setTimeout(() => {
        this.setState({ explode: false });
      }, 4000);
    });
  };

  automaticLevelChange = interval => {
    setTimeout(() => {
      this.handleNext();
      this.automaticLevelChange(interval);
    }, interval);
  };

  componentDidMount() {
    this.automaticLevelChange(this.props.nextLevelInterval);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()
    ) {
      if (this.props.pressedKeys.includes(' ')) {
        setTimeout(() => {
          this.handlePrev();
        }, 3000);
      }
    }
  }

  render() {
    const boundary = this.state.levelBondaries[this.state.level];
    return (
      <>
        <ReactHowler
          src={music}
          playing={true}
          volume={0.5}
          loop={true}
        />

        {this.state.implode && (
          <Implosion
            position={this.props.position}
            duration={this.props.nextLevelInterval}
          />
        )}

        <Mandala
          position={this.props.position}
          boundary={boundary}
          level={this.state.level}
        />

        <Explosion
          position={this.props.position}
          duration={this.props.nextLevelInterval}
        />

        {/* {this.state.explode && (
          <Explosion
            position={this.props.position}
            duration={this.props.nextLevelInterval}
          />
        )} */}
    
      </>
    );
  }
}

export default Sun;
