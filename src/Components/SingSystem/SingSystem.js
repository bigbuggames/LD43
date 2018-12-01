import React from 'react';
import { Howl, Howler } from 'howler';

import GameConfig from 'constants/Config';

class SingSystem extends React.Component {
  state = {
    currentSingTime: 0,
    currentEffects: []
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.keyCode === this.props.keyCode ||
      this.state.currentEffects.includes(this.props.keyCode)
    ) {
      return;
    }

    this.triggerBirdSinging(this.props.keyCode, GameConfig.effects);
  }

  triggerBirdSinging = (key, effects) => {
    if (Object.keys(effects).includes(key)) {
      console.log(`effect ${effects[key]} triggered`);

      this.setState({
        currentEffects: [ ...this.state.currentEffects, key ]
      })

      new Howl({
        src: [`./sounds/${effects[key]}.mp3`],
        volume: 0.5,
        autoplay: true,
        onend: function() {
          console.log('finish!');
          this.setState({
            currentEffects: currentEffects.filter(i => i !== key)
          })
        }
      });   

      this.setState({
        currentSingTime: this.state.currentSingTime + 1
      });
    }
  };

  handleSingTimeReset = () => {
    this.setState({
      currentSingTime: 0
    });
  };

  render() {
    return (
      <div>
        {this.props.children(
          this.state.currentSingTime,
          this.handleSingTimeReset
        )}
      </div>
    );
  }
}

export default SingSystem;
