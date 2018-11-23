import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
//import Swipeout from 'react-native-swipeout';
import { Feather } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';


class FileItem extends Component {

  render() {
    const { removeConfirmation, file } = this.props;
    return (
      <View>
        <Box h={100} w='110%' bg='white' dir='row' >
        <TouchableOpacity style={styles.item} onPress={() => Actions.graph() }>
          <Text size='2xl' pl='lg' f={1} color='#666666' font='bold'>{file}</Text>
        </TouchableOpacity>
        </Box>
      </View>
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