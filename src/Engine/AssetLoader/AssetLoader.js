
import React from 'react';

export default class AssetLoader extends React.Component {
  state = {
    loaded: true,
    loadedAssets: []
  }

  // preloadAssets = (assetsList) => {
  //   Promise
  //     .all(assetPaths.map(path => import(path))
  //     .then(() => {
  //       this.setState({ loaded: true })
  //     }));
  // }

  componentDidMount() {
    // this.preloadAssets(this.props.assets);
  }

  render() {
    return this.props.children(this.state.loaded);
  }
}
