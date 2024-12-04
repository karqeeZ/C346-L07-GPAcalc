import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    StatusBar,
    SectionList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { grades } from './Data.js';
import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    icons: {
        color: 'black',
        fontSize: 30,
        marginRight: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
    },
    sectionHeader: {
        padding: 10,
        elevation: 2,
        shadowColor: 'black',
        borderRadius: 15,
        marginTop: 10,
        marginHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    card: {
        marginTop: 10,
        flex: 0.48,
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        elevation: 5,
        shadowColor: 'black',
        borderWidth: 0.3,
        borderColor: 'black',
        borderRadius: 15,
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    grade: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'lightseagreen',
    },
    edit: {
        borderRadius: 8,
        marginTop: 8,
        backgroundColor: 'teal',
        color: 'white',
        elevation: 5,
        shadowColor: 'black',
        padding: 10,
        alignSelf: 'flex-end',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonStyle: {
        backgroundColor: 'skyblue', // Green background color
        borderRadius: 8,
        padding: 20,
        width: '49%', // Button width to fit two in one row
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

const renderSectionHeader = ({ section }) => (
    <View style={[styles.sectionHeader, { backgroundColor: section.bgColor }]}>
        <View style={styles.headerContainer}>
            <Text style={[styles.sectionTitle, { color: section.txtColor }]}>{section.sectionTitle} </Text>
            <Icon style={[styles.icons, { color: section.txtColor }]} name={section.icon} />
        </View>
    </View>
);

const Home = ({ navigation }) => {
    const gradeToGPA = (grade) => {
        switch (grade) {
            case "A":
                return 4.0;
            case "B":
                return 3.0;
            case "C":
                return 2.0;
            case "D":
                return 1.0;
            case "E":
                return 0.0;
            default:
                return 0.0;
        }
    };

    const calculateCGPA = (gradesArray) => {
        const totalGPA = gradesArray.reduce((sum, grade) => {
            return sum + gradeToGPA(grade.grade);
        }, 0);

        return totalGPA / gradesArray.length;
    };

    const renderItem = ({ item, index, section }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.module} : {item.title}</Text>
            <Text style={styles.grade}>Grade: {item.grade}</Text>
            <Icon
                style={styles.edit}
                name="edit"
                onPress={() => {
                    navigation.navigate("Edit", {
                        index: index,
                        item: item,
                        section: section.sectionTitle,
                    });
                }}
            />
        </View>
    );

    const handleCGPACalculation = () => {
        const allGrades = grades.flatMap((section) => section.data);
        const cgpa = calculateCGPA(allGrades);
        Alert.alert("Calculating...", `Your CGPA is: ${cgpa.toFixed(2)}`);
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} />
            <SectionList
                sections={grades} // Updated data
                renderItem={(props) => renderItem(props)}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => item.title + index}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                    navigation.navigate("Add");
                }}>
                    <Text style={styles.buttonText}>Add new module</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={handleCGPACalculation}>
                    <Text style={styles.buttonText}>Calculate CGPA</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;
