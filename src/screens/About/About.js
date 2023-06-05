import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
} from 'react-native';

// Component
import Logo from '../../components/Logo/Logo';

const About = () => {
  StatusBar.setBarStyle('light-content', true);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo source={Logo} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.descriptionText}>
          <Text style={styles.textBold}> Love & Co</Text> is an agency built on
          results, not promises – after all, happy clients are our livelihood.
          {'\n'}
          {'\n'}Our agents are passionate local advocates who know and love the
          area, who live here and who play an active role in the community.{' '}
          {'\n'}
          {'\n'} Our vast experience means we know the market inside and out.
          From Preston to Epping, Mill Park to Poowong, Reservoir to Thomastown
          and Thornbury and beyond, we are deeply engaged and involved with our
          local community. We share a real connection with its people, its
          culture and its properties and are passionate about colouring the
          lifestyle our residents enjoy.{'\n'}
          {'\n'} Proud of our intimate local knowledge, experience and long-term
          success, we love bringing buyers and sellers together in mutually
          beneficial transactions.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  logoContainer: {
    width: '100%',
    height: 250,
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f394a',
  },
  textContainer: {
    borderRadius: 50,
    backgroundColor: 'white',
    position: 'relative',
    bottom: 60,
  },
  image: {
    width: '100%',
    height: 200,
  },
  descriptionText: {
    fontSize: Platform.OS === 'ios' ? 18 : 17,
    color: '#1f394a',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default About;
