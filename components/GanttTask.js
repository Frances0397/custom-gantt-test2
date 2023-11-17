import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GanttTask({ item, index }) {

    const onPress = (index) => {
        console.log("pressed");
        alert("Ciao, sono un task! " + index);
    }

    const numberOfDays = 2;

    return (
        <View style={[styles.taskParent, {
            top: 65 + (index * 100),
            // width: `${(numberOfDays + index) * (1 / 5) * 100}%`
        }]}>
            <TouchableOpacity style={[styles.taskContainer,
            {
                // top: 50 + (index * 100),
                width: `${(numberOfDays + index) * (1 / 5) * 100}%`
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
        backgroundColor: 'blue', // Set the background color
        padding: 13,
        borderRadius: 5,
        height: 75,
        // width: '20%'
    },
    taskTitle: {
        color: 'white',
    },
    taskParent: {
        //width: '20%',
        // height: 250,
        ...StyleSheet.absoluteFillObject,
        left: 1.5
    }
});