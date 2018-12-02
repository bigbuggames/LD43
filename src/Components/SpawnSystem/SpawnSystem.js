import React from 'react';


export default class SpawnSystem extends React.Component {

  render() {

    return (
      <div>
        {this.props.children(this.props)}
      </div>
    )
  }
}
