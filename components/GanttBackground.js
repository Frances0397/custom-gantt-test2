import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function GanttBackground({ lines }) {
    //const numberOfLines = 5;
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

    return (
        <View style={styles.backgroundContainer}>
            {[...Array(lines)].map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.line,
                        {
                            left: `${(index / lines) * 100}%`, // Adjust position based on the number of lines
                            backgroundColor: index === currentIndex ? 'red' : '#F3F4F5',
                            width: index === currentIndex ? `${1 / lines * 100}%` : 2,
                            borderRadius: index === currentIndex ? 0 : 50,
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
            {currentIndex != -1 ? <View //RIGA DI PARTENZA GIORNO IN CORSO -@TODO: se l'indice è -1 non devo renderarla
                style={[
                    styles.line,
                    {
                        //backgroundColor: 'red',
                        zIndex: 1,
                        left: `${(currentIndex - 1 / lines) * 100}%`, // Adjust position based on the number of lines
                    },
                ]}
            /> : <View />}
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
        top: 40,
        bottom: 20
    },
    line: {
        position: 'relative',
        top: 0,
        bottom: 0,
        backgroundColor: '#F3F4F5',
        borderRadius: 50,
        width: 2, //TEMP
        height: '100%',
        //zIndex: 0
    },
});
