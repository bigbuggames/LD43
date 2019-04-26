import React from "react";
import ReactDOM from "react-dom";
import ReactHowler from "react-howler";

import { Mandala, Implosion } from "./Elements";
import Explosion from "./Explosion";

import music from "./assets/audio/volca-music.mp3";

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

  automaticLevelChange = interval => {
    setTimeout(() => {
      if (
        this.state.level < this.state.levelBondaries.length - 1 &&
        this.state.implode === false
      ) {
        this.handleImplosion();
      }

      this.automaticLevelChange(interval);
    }, interval);
  };

  handleImplosion = () => {
    this.setState({ implode: true }, () => {
      setTimeout(() => {
        this.setState({ implode: false, level: this.state.level + 1 });
      }, this.props.nextLevelInterval);
    });
  };

  handleExplosion = () => {
    setTimeout(() => {
      if (this.state.level > 0 && this.state.explode === false) {
        this.setState({ level: this.state.level - 1, explode: true }, () => {
          setTimeout(() => {
            this.setState({ explode: false });
          }, 3000);
        });
      }
    }, 1300);
  };

  componentDidMount() {
    this.automaticLevelChange(this.props.nextLevelInterval);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()
    ) {
      if (this.props.pressedKeys.includes(" ")) {
        this.handleExplosion();
      }
    }
  }

  render() {
    const boundary = this.state.levelBondaries[this.state.level];
    return (
      <>
        <ReactHowler src={music} playing={true} volume={0.5} loop={true} />

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

        {this.state.explode && (
          <Explosion
            position={this.props.position}
            duration={this.props.nextLevelInterval}
          />
        )}
      </>
    );
  }
}

export default Sun;
