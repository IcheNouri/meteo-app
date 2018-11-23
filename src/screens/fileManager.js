/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, Button, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { DocumentPicker, ImagePicker, FileSystem } from 'expo';
import { Box, Text } from 'react-native-design-utility';
import fileItem from '../components/FileItem';

type Props = {};

export default class fileManager extends Component<Props> {

  state = {
    files: [],
  };

  componentDidMount() {
    this.props.files = this.state.file
    this.init()
  }

  init = async () =>{
    const path = FileSystem.documentDirectory + `/uploaded/`
     let exists = await FileSystem.getInfoAsync(path)
    
      if (!exists) {
         await FileSystem.makeDirectoryAsync(path)
      } else {
        let files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + '/uploaded/')
        await files.map(async file => {
          this.state.files.push(file)
          console.log('add in state: ', file)
        })
      }
  }

  getFileContent = async (uri) => {
    try {
      const fileResponse = await FileSystem.readAsStringAsync(uri)
      console.log(fileResponse)
      return fileResponse
    } catch (error) {
      console.log(error)
    }
    
  }

  _pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});

      if (!result.cancelled) {
        const fileContent = await FileSystem.readAsStringAsync(result.uri)
        let content  = fileContent.split('\n');
        date = content[2].split('\t')[0];
        console.log(date);
        await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + `/uploaded/${date}`, fileContent);
        alert('File uploaded successfully')
        this.getDocuments();
      }
  }

  getDocuments = async () => {
    //return await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + '/uploaded/')
  }

  removeFileFunc = async (file) => {
    try {
      await FileSystem.deleteAsync(FileSystem.documentDirectory + `/uploaded/${file}`);
      alert('File deleted successfully')
    } catch(e) {
      console.log(e);
    }
  }

  removeConfirmationFunc = (file) => {
    Alert.alert(
      'Delete',
      'Are you sure to delete this file ?',
      [
        {text: 'Yes', onPress: () => this.removeFileFunc(file)},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  renderList = () => {
    //const { files } = this.state;
    const files = this.state.files = this.getDocuments();
    console.log('state files: ' + this.state.files)
    console.log('files: ' + files)
    if (files.length !== 0) {
      return (
        <Box center f={1} mt={100}>
          <Text>No file uploaded</Text>
        </Box>
      );
    }

    return (
      files.sort().map((file, i) => (
        <FileItem key={i} file={file} removeConfirmation={this.removeConfirmationFunc} navigation={this.props.navigation} />
        ))
      );
  };

  render() {
    return (
      <View>
        <Text>
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
        <Text></Text>
      </View>

      <ScrollView>
        <StatusBar
        barStyle="light-content"
        translucent
        />
        {this.renderList()}
      </ScrollView>

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
