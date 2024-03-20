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

    var holidaysRendered = 0;
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
                return currentDay;
            }
        } else {
            const currentMonthDay = currentDate.getDate();
            console.log("MONTHDAY: " + currentMonthDay);
            return currentMonthDay;
        }
    }

    const currentIndex = getCurrentIndex();
    console.log(currentIndex);

    const isTomorrowHoliday = (index,calc) => {
        let nextDate = new Date();
        let tomorrow = index + 1;
        nextDate.setDate(tomorrow);
        console.log("DATA DI DOMANI: " + nextDate);
        let dayString = nextDate.toLocaleDateString('it-IT',{ weekday: 'short' });
        if ( ( ( dayString.charAt(0) == 'd' || dayString.charAt(0) == 'l' ) && calc == true)){
            holidaysRendered = holidaysRendered + 1; //di due in due per sab/dom
        } 
        return (dayString.charAt(0) == 'd' || dayString.charAt(0) == 'l' ? true : false);
    }  

    const isTomorrowOutOfWork = (index, calc) => {
        let date = new Date();
        console.log(index);
        date.setDate(index);
        let dayString = date.toLocaleDateString('it-IT',{ weekday: 'short' });
        if ( dayString.charAt(0) == 's' || dayString.charAt(0) == 'd' ){
            return false;
        }
        for (let i=0; i<absences.length; ++i){
            let absence = absences[i];
            console.log(date.getDate() + ">" + absence.from.getDate() + "?");
            console.log(date.getDate() + "<" + absence.to.getDate() + "?");
            if ( date.getDate() <= absence.to.getDate() && date.getDate() >= absence.from.getDate() ){
                if (calc){
                    outOfWork = outOfWork + 1;
                }
                return true;
            } 
        }
        return false;
    }  

    const isLastOfMonth = (index) => {
        let nextDate = new Date();
        let tomorrow = index + 2;
        let thisMonth = nextDate.getMonth();
        nextDate.setDate(tomorrow);
        let thatMonth = nextDate.getMonth();
        console.log("MESI DIVERSI? " + thisMonth + " " + thatMonth);
        return (thisMonth != thatMonth);
    } 

    return (
        <View style={styles.backgroundContainer}>
            {[...Array(lines)].map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.line,
                        {                                                                     
                            left: `${ index === currentIndex ? ( ( index - holidaysRendered - (index == currentIndex ? 1 : 0) - outOfWork ) / lines ) * 100 //today line
                                    : isTomorrowHoliday(index,true) ? ( ( index - holidaysRendered - outOfWork - (index > currentIndex ? 1 : 0) ) / lines ) * 100 //holiday line
                                    : isTomorrowOutOfWork(index,true) ? ( ( index - holidaysRendered - outOfWork - (index > currentIndex ? 1 : 0) ) / lines ) * 100
                                    : ( ( index - (index > currentIndex ? 1 : 0) - holidaysRendered - outOfWork) / lines ) * 100}%`, //normal line
                            backgroundColor: index === currentIndex ? 'red' : isTomorrowHoliday(index,false) ? 'lightblue' : '#bbc2c7',
                            width: (   isTomorrowOutOfWork(index,false) && isLastOfMonth(index) 
                                    || isTomorrowHoliday(index,false)   && isLastOfMonth(index) ) ? `${1 / lines * 200}%` 
                                :  index === currentIndex 
                                || isTomorrowOutOfWork(index,false) 
                                || isTomorrowHoliday(index,false) ? `${1 / lines * 100}%` : `0.07%`,
                            borderRadius: index === currentIndex || isTomorrowHoliday(index,false) || isTomorrowOutOfWork(index,false) ? 0 : 50,
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
