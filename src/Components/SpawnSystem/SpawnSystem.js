import React from 'react';

import { SecondaryBird } from '../Elements';

const spawnPositions = [
  { x: 1188, y: 727 }
]

export default class SpawnSystem extends React.Component {
  state = {
    sacrifice: false
  }

  spawnBird = () => {

  }

  render() {
    return (
      <>
        {spawnPositions.map(spawn => <SecondaryBird key={`bird_${spawn.x}`} x={spawn.x} y={spawn.y} />)}
        {this.props.children(this.state.sacrifice)}
      </>
    )
  }
}
