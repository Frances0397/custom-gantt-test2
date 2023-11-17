import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card } from 'react-native-elements';

import GanttTask from './components/GanttTask';
import GanttBackground from './components/GanttBackground';
import { ScrollView } from 'react-native-web';

export default function App() {
  const numberOfLines = 6;

  const items = [
    { ID: '1', Title: 'Item 1', StartDate: '2023-01-01', EndDate: '2023-01-10' },
    { ID: '2', Title: 'Item 2', StartDate: '2023-02-01', EndDate: '2023-02-10' },
    { ID: '3', Title: 'Item 3', StartDate: '2023-02-01', EndDate: '2023-02-10' },
    { ID: '4', Title: 'Item 4', StartDate: '2023-02-01', EndDate: '2023-02-10' },
    { ID: '5', Title: 'Item 5', StartDate: '2023-02-01', EndDate: '2023-02-10' },
    // { ID: '6', Title: 'Item 6', StartDate: '2023-02-01', EndDate: '2023-02-10' },
    // Add more items as needed
  ];

  return (
    <ScrollView style={styles.container}>
      {/* <Card containerStyle={{ width: '75%', left: '25%' }}  >
        <Text style={{ fontSize: 18 }}>Hello, sono un'altra card</Text>
      </Card> */}
      <Card containerStyle={styles.ganttCard} wrapperStyle={styles.ganttCardContent}>
        {/* <View style={styles.label}>
          <Text>LUN</Text>
        </View>
        <GanttBackground />
        {items.map((item, index) => (
          <GanttTask key={item.ID} item={item} index={index} />
        ))} */}
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
        <Text style={styles.TestText}>Suca</Text>
      </Card>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  ganttCard: {
    flex: 1,
    width: '75%',
    left: '25%',
    minHeight: 500,
    // // width: '250',
    // // minHeight: '100%',
    // height: 'children',
    borderRadius: 20,
    overflow: 'hidden',
    // flexDirection: 'column',
    flexWrap: 'wrap',
  },
  ganttCardContent: {
    flex: 1,
    flexDirection: 'column',
    // alignContent: 'center',
    // justifyContent: 'center',
    // //minHeight: '100%',
    // height: 'children',
    // // overflow: 'hidden',
    // bottom: 10
    flexWrap: 'wrap',
    flexGrow: 1
  },
  label: {
    top: 20,
    bottom: 15,
    left: `${2 / 25 * 100}%`
  },
  container: {
    //flex: 1,
    padding: 30
  },
  TestText: {
    fontSize: 45,
  }
});
