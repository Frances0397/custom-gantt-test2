import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GanttTask({ item, index }) {

    const onPress = (index) => {
        console.log("pressed");
        alert("Ciao, sono un task! " + index);
    }

    const numberOfDays = 2;

    return (
        // <View style={[styles.taskParent, {
        //     top: 65 + (index * 100),
        //     // width: `${(numberOfDays + index) * (1 / 5) * 100}%`
        // }]}>
        <View style={styles.taskParent}>
            <TouchableOpacity style={[styles.taskContainer,
            {
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
        marginTop: 25,
        marginLeft: 2,
        // marginBottom: 55,
        //top: 219,
        // width: '20%',
        // ...StyleSheet.absoluteFillObject,
        left: 1.5,
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
        position: 'relative',
        zIndex: 2
    }
});