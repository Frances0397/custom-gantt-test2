import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function GanttBackground() {
    const numberOfLines = 5;
    const currentIndex = 3;

    return (
        <View style={styles.backgroundContainer}>
            {[...Array(numberOfLines)].map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.line,
                        {
                            left: `${(index / numberOfLines) * 100}%`, // Adjust position based on the number of lines
                            backgroundColor: index === currentIndex ? 'red' : '#F3F4F5',
                            width: index === currentIndex ? `${1 / numberOfLines * 100 + 0.3}%` : 2,
                            borderRadius: index === currentIndex ? 0 : 50,
                            opacity: index === currentIndex ? '20%' : '100%'
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
            <View //RIGA DI PARTENZA GIORNO IN CORSO
                style={[
                    styles.line,
                    {
                        left: `${(currentIndex / numberOfLines) * 100}%`, // Adjust position based on the number of lines
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        //flex: 1,
        height: '100%',
        // minHeight: 450, 
        flexDirection: 'row',
        position: 'relative',
        top: 40,
        bottom: 20
    },
    line: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        backgroundColor: '#F3F4F5',
        borderRadius: 50,
        width: 2, //TEMP
        height: '100%'
    },
});
