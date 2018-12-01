import React from 'react';
import { Howl, Howler } from 'howler';

class SingSystem extends React.Component {
  state = {
    currentSingTime: 0,
    currentEffects: [],
    lastKeys: []
  };

  componentDidUpdate(prevProps) {

    console.log('hi')
   

    // this.setState({
    //   prevSantizedKeys: filteredKeys
    // })

    // console.log('sanitizedKeys:', sanitizedKeys);

    // console.log(prevProps.pressedKeys, this.props.pressedKeys);


    // prevProps.pressedKeys.forEach(key => {
    //   const effects = GameConfig.effects;

    //   // check if the sound is running and in case it is kill it
    //   if (this.props.pressedKeys.includes(key)) {
    //     console.log(`effect ${effects[key]} triggered`);

    //   // start a new sound for that key
    //   } else {
    //     console.log(`effect ${effects[key]} stopped`);
    //   }

    // });

    // this.props.pressedKeys.forEach(key => {
    //   const effects = GameConfig.effects;

    //   // check if the sound is running and in case it is kill it
    //   if (this.prevProps.pressedKeys.includes(key)) {
    //     console.log(`effect ${effects[key]} stopped`);

    //   // start a new sound for that key
    //   } else {
    //     console.log(`effect ${effects[key]} triggered`);
    //   }
    // });



    // this.triggerBirdSinging(this.props.keyCode, GameConfig.effects);
  }

  triggerBirdSinging = (key, effects) => {
    if (Object.keys(effects).includes(key)) {
      console.log(`effect ${effects[key]} triggered`);

      // Trigger new sounds
      // this.props.pressedKeys.forEach(key => {
      //   if (this.prevProps.pressedKeys.includes(key)) {
      //     // check if the sound is running and in case it is kill it
  
      //   // start a new sound for that key
      //   } else {
        
  
      //     const sound = new Howl({
      //       src: [`./sounds/${effects[key]}.mp3`],
      //       volume: 0.5,
      //       autoplay: true,
      //       onend: function() {
      //         console.log('finish!');
      //         // this.setState({
      //         //   currentEffects: currentEffects.filter(i => i !== key)
      //         // })
      //       }
      //     });  
  
      //     this.setState({
      //       ongoingSounds: [ ...this.state.ongoingSounds, sound ]
      //     })
      //   }
      // });

     

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
