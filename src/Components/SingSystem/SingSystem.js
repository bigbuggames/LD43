import React from 'react';
import { Howl, Howler } from 'howler';

import Constants from '../../Constants/Config';

class SingSystem extends React.Component {
  state = {
    currentSingTime: 0
  };

  componentDidUpdate(prevProps) {
    if (prevProps.keyCode === this.props.keyCode) {
      return;
    }

    this.triggerBirdSinging(this.props.keyCode, Constants.effects);
  }

  triggerBirdSinging = (key, effects) => {
    if (Object.keys(effects).includes(key)) {
      console.log(`effect ${effects[key]} triggered`);

      // TODO: Finish loading effects
      const effectName = effects[key];
      const sound = new Howl({
        src: [`assets/effects/${effectName}.mp3`],
        volume: 0.5,
        onend: function() {
          console.log('Finished!');
        }
      });

      sound.play();

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
