import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GanttTask({ item, index, lines, start, end }) {

    const onPress = (index) => {
        console.log("pressed");
        alert("Ciao, sono un task! " + index);
    }

    //converto le date da stringhe a numeri  //TEMPORANEO cambiare in accordo con il tipo data finale!!!
    const startDate = new Date(start);
    const endDate = new Date(end);

    console.log(startDate);
    console.log(endDate);

    const numberOfDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
    console.log(numberOfDays);

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

    //calcolo giorno iniziale; se non rientra nella settimana/mese in corso imposto a -1
    const getFirstDayIndex = () => {
        switch (lines) {
            case 5:
                startDate
            default:

        }
    }

    //calcolo giorno finale; se non rientra nella settimana/mese in corso imposto a 9999

    return (
        // <View style={[styles.taskParent, {
        //     top: 65 + (index * 100),
        //     // width: `${(numberOfDays + index) * (1 / 5) * 100}%`
        // }]}>
        <View style={styles.taskParent}>
            <TouchableOpacity style={[styles.taskContainer,
            {
                width: `${(numberOfDays) * (1 / lines) * 100}%`
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
        marginTop: 25,
        position: 'relative',
        zIndex: 2
    }
});