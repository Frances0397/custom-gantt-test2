import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { Card } from 'react-native-elements';

import GanttTask from './components/GanttTask';
import GanttBackground from './components/GanttBackground';
import { ScrollView } from 'react-native-web';

export default function App() {
  const [checked, setChecked] = useState(false);
  const [lines, setLines] = useState(5);

  const items = [
    { ID: '1', Title: 'Item 1', StartDate: '2024-03-02', EndDate: '2024-03-13' },
    { ID: '2', Title: 'Item 2', StartDate: '2024-03-06', EndDate: '2024-04-01' },
    { ID: '3', Title: 'Item 3', StartDate: '2024-03-11', EndDate: '2024-03-30' },
    { ID: '4', Title: 'Item 4', StartDate: '2024-03-08', EndDate: '2024-03-15' },
    { ID: '5', Title: 'Item 5', StartDate: '2024-03-21', EndDate: '2024-03-27' },
    { ID: '6', Title: 'Item 6', StartDate: '2024-03-16', EndDate: '2024-03-30' },
    { ID: '7', Title: 'Item 7', StartDate: '2024-03-31', EndDate: '2024-04-01' },
    // Add more items as needed
  ];

  const absence = {};
  absence.from = new Date();
  absence.from.setDate(1);
  absence.to = new Date();
  absence.to.setDate(31);
  const absences = [];
  absences.push(absence);

  const getDaysInMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const lastDay = new Date(year, month, 0).getDate();

    return lastDay;
  }

  const daysOfCurrentMonth = getDaysInMonth();
  console.log(daysOfCurrentMonth);

  const toggleSwitch = () => {
    setChecked(previousState => !previousState);
    if (!checked) {
      setLines(daysOfCurrentMonth);
    } else {
      setLines(5);
    }
  }

  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven'];

  const currentDate = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  console.log(firstDay);

  const mapDaysToLabel = (day, daysOfCurrentMonth) => {
    const daysMap = {
      1: "L",
      2: "M",
      3: "M",
      4: "G",
      5: "V",
      6: "S",
      0: "D"
    };

    let mappedDays = [];
    while (day < daysOfCurrentMonth + firstDay) {
      const index = day % 7;
      mappedDays.push(daysMap[index]);
      day++
    }

    return mappedDays;
  }

  const monthArray = mapDaysToLabel(firstDay, daysOfCurrentMonth);
  console.log(monthArray);

  return (
    <ScrollView style={styles.container}>
      {/* <Card containerStyle={{ width: '75%', left: '25%' }}  >
        <Text style={{ fontSize: 18 }}>Hello, sono un'altra card</Text>
      </Card> */}
      <Card>
        <Text>cIAO</Text>
        <Switch value={checked} onValueChange={toggleSwitch} />
      </Card>
      <Card containerStyle={styles.ganttCard} wrapperStyle={styles.ganttCardContent}>
        {!checked ?
          <View style={[styles.label]}>
            {daysOfWeek.map(day => (<Text key={day} style={styles.labelText}>{day}</Text>))}
          </View> : <View style={[styles.monthLabel]}>
            {monthArray.map((day, index) => (<Text key={index} style={styles.monthText}>{day}</Text>))}
          </View>}
        <GanttBackground lines={lines} absences={absences} />
        {items.map((item, index) => (
          <GanttTask key={item.ID} item={item} index={index} lines={lines} start={item.StartDate} end={item.EndDate} absences={absences}/>
        ))}
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
    flexGrow: 1,
    height: '150%'
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
    flexGrow: 1,
    height: '150%',
    marginBottom: 55,
    // marginTop: 55
  },
  label: {
    top: 20,
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '89%',
    left: '3%'
  },
  labelText: {
    marginLeft: '6%'
  },
  monthLabel: {
    top: 20,
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    left: '0.5%'
  },
  monthText: {
    marginLeft: '0.5%'
  },
  container: {
    //flex: 1,
    padding: 30
  },
  TestText: {
    fontSize: 45,
  },
  //TEMP
  taskContainer: {
    //top: 25,
    backgroundColor: 'blue', // Set the background color
    padding: 13,
    borderRadius: 5,
    height: 75,
    // width: '20%'
    //...StyleSheet.absoluteFillObject,
  },
  taskTitle: {
    color: 'white',
  },
});
