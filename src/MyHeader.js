import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {Actions} from 'react-native-router-flux'

type Props = {};

export default class MyHeader extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {page: props.page}
  }
  render() {
    return (
        <Header>
          <Left>
            <Button transparent onPress={() => {
              Actions.fileManager()
            }}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {
              Actions.graph()
            }}>
              <Icon name='add-user' type='Entypo' />
            </Button>
          </Right>
        </Header>
    );
  }
}
