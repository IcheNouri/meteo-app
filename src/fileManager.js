/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import MyHeader from './MyHeader';

type Props = {};

export default class fileManager extends Component<Props> {
  
  render() {
    return (
      <View>
        <MyHeader/>
        <Card>
          <CardItem>
            <Body>
              <Text>
                //Your text here
              </Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loremStyle:{
    padding: 10
  }
})
