import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';

export default function GanttBackground({ lines, absences }) {
    //const numberOfLines = 5;

    const [lastDayLeave, setLastDayLeave] = useState(null);
    var absence = {};

    useEffect(() => {
        setLastDayLeave(absences[absences.length - 1].to.getDate());
        absence = absences[0]; //MDA
    }, [])

    var holidaysRendered = -1;
    var outOfWork = 0;

    console.log(lines);

    const getCurrentIndex = () => {
        //leggo la data odierna
        const currentDate = new Date();
        if (lines === 5) {
            const currentDay = currentDate.getDay();
            if (currentDay === 0 || currentDay === '6') {
                return -1;
            } else {
                return currentDay - 1;
            }
        } else {
            const currentMonthDay = currentDate.getDate();
            console.log(currentMonthDay);
            return currentMonthDay - 1;
        }
    }

    const currentIndex = getCurrentIndex();
    console.log(currentIndex);

    const isNextHoliday = (index,calc) => {
        let nextDate = new Date();
        let tomorrow = index + 1;
        nextDate.setDate(tomorrow);
        console.log("DATA DI DOMANI: " + nextDate);
        let dayString = nextDate.toLocaleDateString('it-IT',{ weekday: 'short' });
        console.log(dayString.charAt(0) == 's');
        if ( (dayString.charAt(0) == 's' && calc == true)){
            holidaysRendered = holidaysRendered + 2; //di due in due per sab/dom
        } 
        return (dayString.charAt(0) == 's' ? true : false);
    } 

    const isTomorrowOutOfWork = (index, calc) => {
        let date = new Date();
        console.log(index + 1);
        date.setDate(index + 1);
        let dayString = date.toLocaleDateString('it-IT',{ weekday: 'short' });
        if ( dayString.charAt(0) == 's' || dayString.charAt(0) == 'd' ){
            return false;
        }
        for (let i=0; i<absences.length; ++i){
            let absence = absences[i];
            console.log(date.getDate() + ">" + absence.from.getDate() + "?");
            console.log(date.getDate() + "<" + absence.to.getDate() + "?");
            if (date.getDate() <= absence.to.getDate() && date.getDate() >= absence.from.getDate()){
                if (calc){
                    outOfWork = outOfWork + 1;
                }
                return true;
            } 
        }
        return false;
    } 

    return (
        <View style={styles.backgroundContainer}>
            {[...Array(lines)].map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.line,
                        {                                              //holidaysRendered -1 per passare da venerdì a sabato
                            left: `${ index === currentIndex /*&& isNextHoliday(index,false)*/ ? ( ( index - holidaysRendered - outOfWork - 1 ) / lines ) * 100 //today line
                                    : isNextHoliday(index,true) ? ( ( index - ( holidaysRendered - 1 ) - outOfWork - (index > currentIndex ? 1 : 0) ) / lines ) * 100 //holiday line
                                    : isTomorrowOutOfWork(index,true) ? ( ( index - holidaysRendered - outOfWork - (index > currentIndex ? 1 : 0) ) / lines ) * 100
                                    : ( ( index - (index > currentIndex ? 1 : 0) - holidaysRendered - outOfWork) / lines ) * 100}%`, //normal line
                            backgroundColor: index === currentIndex ? 'red' : isNextHoliday(index,false) ? 'lightblue' : '#bbc2c7',
                            width: index === currentIndex || isTomorrowOutOfWork(index,false) ? `${1 / lines * 100}%` : isNextHoliday(index,false) ? `${1 / lines * 200}%` : `0.07%`,
                            borderRadius: index === currentIndex || isNextHoliday(index,false) || isTomorrowOutOfWork(index,false) ? 0 : 50,
                            opacity: index === currentIndex ? '20%' : '100%',
                            zIndex: 0
                        },
                    ]}
                />
            ))}
            <View
                style={[
                    styles.line,
                    {
                        left: `100%`, // Adjust position based on the number of lines
                    },
                ]}
            />
            {/* {currentIndex != -1 ? <View //RIGA DI PARTENZA GIORNO IN CORSO -@TODO: se l'indice è -1 non devo renderarla
                style={[
                    styles.line,
                    {
                        backgroundColor: 'red',
                        zIndex: 1,
                        left: `${(currentIndex - 1 / lines) * 100}%`, // Adjust position based on the number of lines
                    },
                ]}
            /> : <View />} */}
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        //flex: 1,
        height: '100%',
        width: '100%',
        // minHeight: 450, 
        flexDirection: 'row',
        position: 'absolute',
        top: 50,
        bottom: 20
    },
    line: {
        position: 'relative',
        top: 0,
        bottom: 0,
        backgroundColor: '#F3F4F5',
        borderRadius: 50,
        width: '0.05%', //TEMP
        height: '100%',
        //zIndex: 0
    },
});
