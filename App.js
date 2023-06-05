import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

//navigation
import StackNavigation from './src/navigation/StackNavigation';

const slides = [
  {
    key: 1,
    title: 'Find Your Next Home With Us',
    description:
      'Check out different properties and find one thats right for you',
    image: require('./src/assests/images/AppIntroImage1.png'),
  },
  {
    key: 2,
    title: 'Real Estate Without the Hassle',
    description: 'We are here to help you out with all the paper works.',
    image: require('./src/assests/images/AppIntroImage2.png'),
  },
  {
    key: 3,
    title: 'On-Going Support',
    description: 'We are just a call away for all your queries and issues',
    image: require('./src/assests/images/AppIntroImage3.png'),
  },
];

const App = () => {
  const [showApp, setShowApp] = useState(false);
  StatusBar.setBarStyle('light-content', true);
  const buttonLabel = label => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{label}</Text>
      </View>
    );
  };
  if (!showApp) {
    StatusBar.setBarStyle('light-content', true);
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View style={styles.introContainer}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={styles.image}
              />
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
          );
        }}
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
        renderNextButton={() => buttonLabel('Next')}
        showSkipButton
        renderSkipButton={() => buttonLabel('Skip')}
        showPrevButton
        renderPrevButton={() => buttonLabel('Prev')}
        renderDoneButton={() => buttonLabel('Done')}
        onDone={() => {
          setShowApp(true);
        }}
      />
    );
  }
  return <StackNavigation />;
};

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    padding: 15,
    alignContent: 'center',
    backgroundColor: '#1f394a',
  },
  image: {
    width: '100%',
    height: 550,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 20,
    color: 'white',
    padding: 5,
    textAlign: 'center',
  },
  activeDotStyle: {
    backgroundColor: 'white',
    width: 30,
  },
  dotStyle: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
});
export default App;
