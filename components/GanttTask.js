import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

export default function GanttTask({ item, index, lines, start, end, absences }) {

    const [lastDayLeave, setLastDayLeave] = useState(null);
    var absence = {};

    useEffect(() => {
        setLastDayLeave(absences[absences.length - 1].to.getDate());
    }, [])

    console.log("Index ", index);

    const onPress = (index) => {
        console.log("pressed");
        alert("Ciao, sono un task! " + index);
    }

    //converto le date da stringhe a numeri  //TEMPORANEO cambiare in accordo con il tipo data finale!!!
    const startDate = new Date(start);
    const endDate = new Date(end);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    console.log(startDate);
    console.log(endDate);

    // const numberOfDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    // console.log(numberOfDays);

    const getFirstDayOfTheWeek = () => {
        const now = new Date();
        const currentDayOfWeek = ((now.getDay() - 1) + 7) % 7; // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

        console.log(currentDayOfWeek);

        // Set the time to midnight to get the start of the day
        const firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - currentDayOfWeek);
        firstDayOfWeek.setHours(0, 0, 0, 0);

        return firstDayOfWeek;
    }

    const firstDayOfWeek = getFirstDayOfTheWeek();
    console.log(firstDayOfWeek)

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);
    console.log(firstDayOfMonth);

    //calcolo giorno iniziale; se non rientra nella settimana/mese in corso imposto a -1
    const getFirstDayIndex = (startDate, firstDayOfWeek, firstDayOfMonth) => {
        switch (lines) {
            case 5:
                if (startDate <= firstDayOfWeek) {
                    return 0;
                } else {
                    return (startDate - firstDayOfWeek) / (1000 * 60 * 60 * 24) + 1;
                }
            default:
                if (startDate <= firstDayOfMonth) {
                    return 0;
                } else {
                    return (startDate - firstDayOfMonth) / (1000 * 60 * 60 * 24) + 1;
                }
        }
    }

    const firstDayIndex = getFirstDayIndex(startDate, firstDayOfWeek, firstDayOfMonth);
    console.log(firstDayIndex);

    const getNumberOfDays = (firstDayOfWeek, startDate, endDate) => {
        var numberOfDays = 0;
        if (lines === 5) {
            if (firstDayIndex === 0) {
                numberOfDays = (endDate - firstDayOfWeek) / (1000 * 60 * 60 * 24) + 1;
            } else {
                numberOfDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
            }
        } else {
            if (firstDayIndex === 0) {
                numberOfDays = (endDate - firstDayOfMonth) / (1000 * 60 * 60 * 24) + 1;
            } else {
                numberOfDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
            }
        }

        return numberOfDays;
    }

    const numberOfDays = getNumberOfDays(firstDayOfWeek, startDate, endDate);
    console.log(numberOfDays);

    // if (lines != 5) {
    //     lines = lines + 2;
    // }

    const isAbsent = (from, to) =>{
        console.log("ABSENCE - FROM: " + absence.from + " TO: " + absence.to);
        var fromDate = new Date(from);
        var toDate = new Date(to);
        console.log("TASK - FROM: " + fromDate + " TO: " + toDate);
        for (let i=0; i<absences.length; ++i){
            let absence = absences[i];
            if (fromDate <= absence.to && toDate >= absence.from) {
                return 'black';
            }
        }
        return 'blue';
    }

    const isPrevWeek = (taskEnd, firstWeekDay) => {
        if (lines === 5){
            var taskEndDay = String(taskEnd).substring(String(taskEnd).length - 2, String(taskEnd).length);
            var date = new Date();
            date.setDate(taskEndDay);
            return ( date.getDate() < firstWeekDay.getDate() );
        }
    }

    console.log(lines);

    return (
        // <View style={[styles.taskParent, {
        //     top: 65 + (index * 100),
        //     // width: `${(numberOfDays + index) * (1 / 5) * 100}%`
        // }]}>
        <View style={[styles.taskParent, { marginTop: lines === 5 ? 8 : 15 }]}>
            <TouchableOpacity style={[styles.taskContainer,
            {
                width: `${(numberOfDays) * (1 / lines) * 100 + 0.05 * numberOfDays}%`,
                left: `${firstDayIndex === 0 ? 0 : (firstDayIndex - 1) * (1 / lines) * 100 + 0.05 * firstDayIndex}%`,
                height: lines === 5 ? 75 : 40,
                marginTop: lines === 5 ? '7%' : '3%',
                backgroundColor: `${isAbsent(item.StartDate, item.EndDate)}`,
                display: isPrevWeek(item.EndDate, firstDayOfWeek) ? 'none' : 'flex'
            }]}
                onPress={() => { alert(index); }}>
                <Text style={styles.taskTitle}>{item.ID} - {item.Title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        //top: 25,
        // backgroundColor: 'blue', // Set the background color
        padding: 13,
        borderRadius: 5,
        height: 75,
        // marginLeft: 2,
        // marginBottom: 55,
        //top: 219,
        // width: '20%',
        // ...StyleSheet.absoluteFillObject,
        //left: 1.5,
        // position: 'absolute',
    },
    taskTitle: {
        color: 'white',
    },
    taskParent: {
        // flex: 1,
        // //width: '20%',
        // // height: 250,
        // ...StyleSheet.absoluteFillObject,
        // left: 1.5,
        // flexWrap: 'wrap',
        // flexGrow: 1
        // marginTop: 8,
        position: 'relative',
        zIndex: 2,
    }
});