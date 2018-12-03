import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import mandala from '../../../assets/images/mandala.png';

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid tomato;
  background-color: papayawhip;
  margin: 10px 10px;
`;

const Anchor = styled.div`
  position: relative;
  top: 865px;
  left: 50%;
  z-index: -1;
`;

const Mandala = styled.div`
  transform: translate(-50%, -50%);

  height: ${props => props.boundary}px;
  width: ${props => props.boundary}px;
  border-radius: 50%;
  background-image: url(${mandala});
  background-position: center;
  background-color: #fad48b;
  box-shadow: 0 0 0 10px #fad48b;
`;

const sunPosition = { x: 900, y: 700 };

export default class Sun extends React.Component {
  state = {
    level: 0,
    levelBondaries: [330, 494, 563, 605, 699, 901, 983, 1076]
  };

  handlePrev = () => {
    if (this.state.level > 0) {
      this.setState({ level: this.state.level - 1 });
    }
  };

  handleNext = () => {
    if (this.state.level < this.state.levelBondaries.length - 1) {
      this.setState({ level: this.state.level + 1 });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()) {
      if (this.props.pressedKeys.includes(' ')) {
        this.handleNext();
      }
    }
  }

  render() {

    const boundary = this.state.levelBondaries[this.state.level];
    return (
      <div>
        <Anchor position={sunPosition}>
          <Mandala 
            position={sunPosition}
            boundary={boundary} 
          />
        </Anchor>
      </div>
    );
  }
}
