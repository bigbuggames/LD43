import React from 'react';
import styled from 'styled-components';

import Counter from 'Engine/Counter';
import SpiritBird from '../SpiritBird';
import { getRandomInt } from 'utils/random';

export default class Spawner extends React.Component {
  static defaultProps = {
    spawnRate: 4,
    sunPosition: { x: 900, y: 700 }
  };

  state = {
    counterState: Counter.STOP,
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

  handleStart = () => this.setState({ counterState: Counter.RUN });
  handlePause = () => this.setState({ counterState: Counter.PAUSE });
  handleClear = () =>
    this.setState({ counterState: Counter.CLEAR }, () => {
      this.setState({ counterState: Counter.RUN });
    });

  handleSpawn = () => {
    // Getting an empty spawn point for the next animation
    const canRender = this.state.spawnPoints.map(i => i.render).includes(false);
    let nextActiveSpawn = getRandomInt(0, this.state.spawnPoints.length - 1);
    while (this.state.spawnPoints[nextActiveSpawn].render && canRender) {
      nextActiveSpawn = getRandomInt(0, this.state.spawnPoints.length - 1);
    }

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
      spawnPoints: nextState
    });
  };

  hanldeAnimationUnmount = key => {
    this.setState({
      spawnPoints: this.state.spawnPoints.map(item => {
        if (item.key === key) {
          return {
            ...item,
            render: false
          };
        }

        return item;
      })
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()
    ) {
      // sacrifice
      if (this.props.pressedKeys.includes(' ')) {
        this.handlePause();

      // spawn
      } else {
        if (this.props.pressedKeys.length > 0) {
          this.handleStart();
        } else {
          this.handlePause();
        }
      }
    }
  }

  render() {
    return (
      <Counter interval={400} stage={this.state.counterState}>
        {count => {
          if (
            count % this.props.spawnRate === 0 &&
            count !== 0 &&
            this.state.spawning === false
          ) {
            this.setState(
              {
                counterState: Counter.CLEAR,
                spawning: true
              },
              () => {
                this.handleSpawn();
                this.setState({ counterState: Counter.RUN, spawning: false });
              }
            );
          }

          return (
            <div>
              {this.state.spawnPoints.map((spawn, index) => {
                if (spawn.render) {
                  return (
                    <SpiritBird
                      key={`spawn_${index}`}
                      position={{ x: spawn.x, y: spawn.y }}
                      sunPosition={this.props.sunPosition}
                      scale={spawn.scale}
                      mirror={spawn.mirror}
                      pressedKeys={this.props.pressedKeys}
                      handleUnmount={() =>
                        this.hanldeAnimationUnmount(spawn.key)
                      }
                    />
                  );
                }
              })}
            </div>
          );
        }}
      </Counter>
    );
  }
}
