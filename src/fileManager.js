/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { DocumentPicker, ImagePicker, FileSystem } from 'expo';

type Props = {};

export default class fileManager extends Component<Props> {

  state = {
    image: null,
    file: null,
  };

  componentDidMount() {
    this._retrieveData()
  }

  _storeData = async (value) => {
    try {
      await AsyncStorage.setItem('file', value);
    } catch (error) {
      console.log(error)
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('file');
      console.log(value)
      if (value !== null) {
        //this.setState({ file: value })
       // return value
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  getFileContent = async (uri) => {
    try {
      const fileResponse = await FileSystem.readAsStringAsync(uri)
      console.log(fileResponse)
      return fileResponse
    } catch (error) {
      console.log("KOKOKOKOKOKO" + error)
    }
    
  }

  _pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});

      if (!result.cancelled) {
        const value = this.getFileContent(result.uri)
//        this._storeData(value)
        this._storeData(result.uri)
      }
  }

  render() {
    let { image } = this.state;
    return (
      <View>
        <Text>
            //Your text here
        </Text>
        <Button 
          title="Go to graph"
          onPress={() => {
          Actions.graph()
        }}> 
        </Button>

        <Button
          title="Select Document"
          onPress={this._pickDocument}
        />

      <View style={{ 'marginTop': 20}}>
        <Text>test</Text>
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  loremStyle:{
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
