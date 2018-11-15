import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import fileManager from './src/fileManager';
import Graph from './src/Graph';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene key="fileManager" component={fileManager} title="file manager page"/>
          <Scene key="graph" component={Graph} title="Graph page"/>
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
