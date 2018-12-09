
import React from 'react';

const AssetContext = React.createContext({});

class AssetLoader extends React.Component {
  state = {
    loaded: false,
    loadedAssets: {}
  }

  /**
   * Pre-loading all the assets using dynamic imports
   * 
   * Used `webpackMode: "eager"` to avoid having one network request for the 
   * chunk and another for the actual asset.
   * 
   * TODO: Get rid of the absolute path dependency
   */
  preloadAssets = (assets) => {
    const generatedImports = assets.map(asset => import(
      /* webpackPreload: true */
      /* webpackMode: "eager" */
      `../../../assets/${asset}`
    ));

    Promise.all(generatedImports).then(modules => {
      console.log('assets loaded...')

      const assetsMappedToModules = modules.reduce((acc, currentModule, index) => {
        return {
          ...acc,
          [assets[index]]: currentModule.default
        }
      }, {});

      this.setState({ 
        loaded: true,
        loadedAssets: assetsMappedToModules
      })
    });

  }

  componentDidMount() {
    if (this.props.assets) {
      this.preloadAssets(this.props.assets);
    }
  }

  render() {
    return (
      <AssetContext.Provider value={this.state.loadedAssets}>
        {this.props.children(this.state.loaded)}
      </AssetContext.Provider>
    )
  }
}

export function withAssets(Component) {
  return function WrapperComponent(props) {
    return (
      <AssetContext.Consumer>
        {value => <Component {...props} assets={value} />}
      </AssetContext.Consumer>
    );
  };
}

export default AssetLoader;
