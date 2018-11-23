/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, Button, Alert, ScrollView, StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { DocumentPicker, ImagePicker, FileSystem, SQLite } from 'expo';
import { Box, Text } from 'react-native-design-utility';
import FileItem from '../components/FileItem';

type Props = {};

export default class fileManager extends Component<Props> {

  state = {
    files: [],
  };

  componentWillMount() {
    this.props.files = this.state.file
    this.init()
  }

  init = async () =>{
    const path = FileSystem.documentDirectory + `/uploaded/`
     let exists = await FileSystem.getInfoAsync(path)
    
      if (!exists) {
         await FileSystem.makeDirectoryAsync(path)
      } else {
        this.getDocuments()
      }
  }

  getFileContent = async (uri) => {
    try {
      const fileResponse = await FileSystem.readAsStringAsync(uri)
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
    let files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + '/uploaded/')
    const tab = []
    if (files.length === 0) {
      this.setState({files: []})
    } else {
      await files.map(async file => {
      tab.push(file)
          this.setState({files: tab})
          console.log('add in state: ', tab)
      })
    }

  }

  removeFileFunc = async (file, key) => {
    try {
      await FileSystem.deleteAsync(FileSystem.documentDirectory + `/uploaded/${file}`);
      alert('File deleted successfully')
      this.getDocuments();
    } catch(e) {
      console.log(e);
    }
  }

  removeConfirmationFunc = (file, key) => {
    Alert.alert(
      'Delete',
      'Confirm delete ?',
      [
        {text: 'Yes', onPress: () => this.removeFileFunc(file, key)},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  renderList = () => {
    const { files } = this.state;
    if (files.length === 0) {
      return (
        <Box center f={1} mt={100}>
          <Text>No file uploaded</Text>
        </Box>
      );
    }

    return (
      files.sort().map((file, i) => (
        <FileItem key={i} file={file} removeConfirmation={this.removeConfirmationFunc} index={i} />
        ))
      );
  };

  render() {
    return (
      <View style={styles.view}>
        <Button
          title="Select Document"
          onPress={this._pickDocument}
        />

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
  view:{
    marginBottom: 40
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
