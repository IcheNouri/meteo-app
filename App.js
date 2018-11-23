import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import fileManager from './src/screens/fileManager';
import Graph from './src/screens/Graph';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="fileManager" component={fileManager} title="File manager"/>
          <Scene key="graph" component={Graph} title="Graphs"/>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
