import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Linking } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base'; // eslint-disable-line
import { Kohana } from 'react-native-textinput-effects';
import nlp from 'nlp_compromise';
import Hr from 'react-native-hr';

export default class App extends Component {

  constructor() {
    super();
    this.onChangeText = this.onChangeText.bind(this);
  }

  state = {
    tab1: true,
    tab2: false,
    text: ''
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    convertedTextContainer: {
      margin: 10
    },
    convertedTextHeader: {
      margin: 10,
      fontSize: 16,
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
    convertedText: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    aboutContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50
    },
    aboutLinkToGithub: {
      color: 'blue',
      marginTop: 10,
      textDecorationLine: 'underline'
    }
  });

  onChangeText(text) {
    this.setState({ text });
  }

  render() {
    const { tab1, tab2, text } = this.state;

    return (
      <Container>
        <Header>
          <Title>SenTense</Title>
        </Header>

        <Content>
          {tab1 &&
          <View style={this.styles.container}>
            <Kohana
              style={this.styles.input}
              label={'Write something ...'}
              iconClass={Icon}
              iconName={'ios-bulb-outline'}
              iconColor={'black'}

              value={text}
              onChangeText={this.onChangeText}

              multiline={true}
            />

            <Hr lineColor="#b3b3b3" text="Tense" />

            <Text style={this.styles.convertedTextHeader}>
              Past
            </Text>
            <View style={this.styles.convertedTextContainer}>
              <Text style={this.styles.convertedText}>
                {nlp.text(text).to_past().text()}
              </Text>
            </View>

            <Text style={this.styles.convertedTextHeader}>
              Present
            </Text>
            <View style={this.styles.convertedTextContainer}>
              <Text style={this.styles.convertedText}>
                {nlp.text(text).to_present().text()}
              </Text>
            </View>

            <Text style={this.styles.convertedTextHeader}>
              Future
            </Text>
            <View style={this.styles.convertedTextContainer}>
              <Text style={this.styles.convertedText}>
                {nlp.text(text).to_future().text()}
              </Text>
            </View>

          </View>}

          {tab2 &&
            <View style={this.styles.aboutContainer}>
              <Text>
                Contact @ <Text style={this.styles.aboutLinkToGithub} onPress={() => Linking.openURL('https://github.com/AndrewGHC/react-native-tense-app')}> Github</Text></Text>
            </View>}

        </Content>

        <Footer>
          <FooterTab>
            <Button active={tab1} onPress={() => this.setState({ tab1: true, tab2: false })}>
              Writer
              <Icon name="ios-book-outline" />
            </Button>
            <Button active={tab2} onPress={() => this.setState({ tab1: false, tab2: true })}>
              About
              <Icon name="ios-information-circle-outline" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
