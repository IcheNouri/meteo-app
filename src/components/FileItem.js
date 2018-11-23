import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import Swipeout from 'react-native-swipeout';
import { Feather } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';


export default class FileItem extends Component {
  render() {
    const { removeConfirmation, file, index } = this.props;
    return (
      <Swipeout right={[{
        component: <Box f={1} center><Feather name='x' color='white' size={40}/></Box>,
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { removeConfirmation(file, index) }
      }]}
      style={{marginTop: 16, width: '100%',}}
      autoClose={true}
      backgroundColor= 'transparent'>
        <Box h={100} w='110%' bg='white' dir='row' >
        <TouchableOpacity style={styles.item} onPress={() => Actions.graph() }>
          <Text size='2xl' pl='lg' f={1} color='#666666' font='bold'>{file}</Text>
        </TouchableOpacity>
        </Box>
      </Swipeout>
    );
  }
}

const mapStateToProps = state => ({
  files: state.files,
})

export { FileItem };

const styles = StyleSheet.create({
  item: {
    height: 100,
    width: '100%',
    justifyContent: 'center'
  },
});