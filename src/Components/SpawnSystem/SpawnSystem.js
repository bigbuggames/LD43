import React from 'react';
import styled, { keyframes } from 'styled-components';
import { getRandomInt } from 'utils/random';

import SpiritBird from 'components/SpiritBird';


const sunPosition = { x: 900, y: 700 };
const spawningTime = 4;

export default class SpawnSystem extends React.Component {
  state = {
    spawning: false,
    spawnPoints: [
      { x: 1168, y: 695, scale: 0.3, mirror: true, render: false },
      { x: 1603, y: 490, scale: 0.4, mirror: true, render: false },
      { x: 1550, y: 510, scale: 0.4, mirror: true, render: false },
      { x: 1560, y: 680, scale: 0.4, mirror: true, render: false },
      { x: 1140, y: 910, scale: 0.3, mirror: true, render: false },
      { x: 1100, y: 920, scale: 0.3, mirror: true, render: false },
      { x: 685, y: 720, scale: 0.2, mirror: false, render: false },
      { x: 720, y: 890, scale: 0.2, mirror: false, render: false },
    ]
  };

  // TODO: Avoid repeating same spawn point
  spawnSpiritBird = () => {
    let nextActiveSpawn = getRandomInt(0, this.state.spawnPoints.length - 1);
    // while (this.state.spawnPoints[nextActiveSpawn].render === true) {
    //   nextActiveSpawn = getRandomInt(0, this.state.spawnPoints.length - 1);
    // }

    const nextState = this.state.spawnPoints.map((item, index) => {
      if (index === nextActiveSpawn) {
        return {
          ...item,
          render: true
        };
      }

      return item;
    });

    this.setState({
      spawning: true,
      spawnPoints: nextState
    });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.spawning === true && this.nextState.spawning === true) {
  //     return false
  //   }

  //   return true;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.singTime !== 0 && 
      this.props.singTime % spawningTime === 0 && 
      this.state.spawning === false
    ) {
      console.log('test')
      this.props.singTimeReset();
      this.spawnSpiritBird();
      this.setState({ spawning: false })
    }
  }

  // componentDidMount() {
  //   this.spawnSpiritBird();
  // }

  hanldeSpawnUnmount = () => {
    this.setState({
      spawnPoints: this.state.spawnPoints.map(i => (i.render = false))
    });
  };

  render() {
    const sacrifice = (this.props.pressedKeys.includes(' '));
    return (
      <>
        {this.state.spawnPoints.map((spawn, index) => {
          if (spawn.render) {
            return (
              <SpiritBird
                key={`spawn_${index}`}
                position={{ x: spawn.x, y: spawn.y }}
                sunPosition={sunPosition}
                scale={spawn.scale}
                mirror={spawn.mirror}
                pressedKeys={this.props.pressedKeys}
                handleUnmount={this.hanldeSpawnUnmount}
              />
            );
          }
        })}

        {this.props.children(this.state.sacrifice)}
      </>
    )
  }
}
