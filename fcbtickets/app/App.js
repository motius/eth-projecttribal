'use strict';
import React from 'react';
import {Provider} from 'react-redux';
import {AppContainer} from './AppContainer';
import {configureStore} from './config/store';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      store: null,
      persistor: null,
      isLoading: true,
    };
  }

  componentDidMount(){
    const {store, persistor} = configureStore(() => {this.setState({isLoading: false});});
    this.setState({store, persistor});
  }

  render() {
    if(this.state.isLoading || !this.state.store || !this.state.persistor){
      return null;
    }

    return (
      <Provider store={this.state.store} persistor={this.state.persistor}>
        <AppContainer/>
      </Provider>
    );
  }
}
