import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Linking,
  Platform,
  StatusBar,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

// Assests
import ContactUs from '../../assests/images/ContactUs.jpg';

const Contact = () => {
  StatusBar.setBarStyle('dark-content', true);
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={ContactUs} style={styles.image} />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Get In Touch</Text>
        <Text style={styles.text}>
          Want to get in touch? We'd love to hear from you. Here's how you can
          reach us
        </Text>
        <Collapse style={styles.list}>
          <CollapseHeader>
            <View>
              <Text style={styles.listTitle}>RESERVIOR</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL(
                  'https://www.google.com/maps/search/?api=1&query=307 Spring Street, Reservoir, 3073',
                )
              }>
              307 Spring Street, Reservoir, 3073
            </Text>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL('mailto: reservoir@lovere.com.au')
              }>
              reservoir@lovere.com.au
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('tel: +61395606511')}>
              (03) 9460 6511
            </Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={styles.list}>
          <CollapseHeader>
            <View>
              <Text style={styles.listTitle}> MILL PARK</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL(
                  'https://www.google.com/maps/search/?api=1&query=508 Plenty Road, Mill Park, 3082',
                )
              }>
              508 Plenty Road, Mill Park, 3082
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('mailto: millpark@lovere.com.au')}>
              millpark@lovere.com.au
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('tel: +61394044955')}>
              (03) 9404 4955
            </Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={styles.list}>
          <CollapseHeader>
            <View>
              <Text style={styles.listTitle}>THORNBURY</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL(
                  'https://www.google.com/maps/search/?api=1&query= 770 High Street, Thornbury, 3071',
                )
              }>
              770 High Street, Thornbury, 3071
            </Text>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL('mailto: thornbury@lovere.com.au')
              }>
              {' '}
              thornbury@lovere.com.au
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('tel: +61394802288')}>
              (03) 9480 2288
            </Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={styles.list}>
          <CollapseHeader>
            <View>
              <Text style={styles.listTitle}> COUNTRY SALES</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('mailto: country@lovere.com.au')}>
              country@lovere.com.au
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('tel: +61356592297')}>
              (03) 5659 2297
            </Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={styles.list}>
          <CollapseHeader>
            <View>
              <Text style={styles.listTitle}>PRESTON</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL(
                  'https://www.google.com/maps/search/?api=1&query=274 High Street, Preston, 3072',
                )
              }>
              274 High Street, Preston, 3072
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('mailto: preston@lovere.com.au')}>
              preston@lovere.com.au
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('tel: +61394710233')}>
              (03) 9471 0233
            </Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={styles.list}>
          <CollapseHeader>
            <View>
              <Text style={styles.listTitle}>IVANHOE</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL(
                  'https://www.google.com/maps/search/?api=1&query=215 Lower Heidelberg Road, Ivanhoe East, 3079',
                )
              }>
              215 Lower Heidelberg Road, Ivanhoe East, 3079
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('mailto: ivanhoe@lovere.com.au')}>
              ivanhoe@lovere.com.au
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('tel: +61394995611')}>
              (03) 9499 5611
            </Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={styles.list}>
          <CollapseHeader>
            <View>
              <Text style={styles.listTitle}> EPPING</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL(
                  'https://www.google.com/maps/search/?api=1&query=780 High Street, Epping, 3076',
                )
              }>
              780 High Street, Epping, 3076
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('mailto: epping@lovere.com.au')}>
              epping@lovere.com.au
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('tel: +61394012322')}>
              (03) 9401 2322
            </Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={styles.list}>
          <CollapseHeader>
            <View>
              <Text style={styles.listTitle}>THOMASTOWN</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL(
                  'https://www.google.com/maps/search/?api=1&query=201 High Street, Thomastown, 3074',
                )
              }>
              201 High Street, Thomastown, 3074
            </Text>
            <Text
              style={styles.listText}
              onPress={() =>
                Linking.openURL('mailto: thomastown@lovere.com.au')
              }>
              thomastown@lovere.com.au
            </Text>
            <Text
              style={styles.listText}
              onPress={() => Linking.openURL('tel: +61394652133')}>
              (03) 9465 2133
            </Text>
          </CollapseBody>
        </Collapse>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: '#dbe8f0',
  },
  listContainer: {
    borderRadius: 50,
    backgroundColor: '#dbe8f0',
    position: 'relative',
    bottom: 60,
    borderTopColor: '#1f394a',
  },
  image: {
    width: '100%',
    height: Platform.OS === 'ios' ? 250 : 220,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4b8ab4',
    padding: 10,
    paddingVertical: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#1f394a',
    padding: 10,
  },
  list: {
    alignItems: 'center',
    padding: 5,
  },
  listTitle: {
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 19 : 17,
    color: '#4b8ab4',
    padding: 10,
    fontWeight: '600',
  },
  listText: {
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 18 : 17,
    color: '#1f394a',
    fontWeight: '400',
  },
});

export default Contact;
