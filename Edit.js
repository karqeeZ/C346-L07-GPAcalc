import React, { useState } from "react";
import {
    TextInput,
    View,
    Text,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {grades} from "./Data";

const Edit = ({ navigation, route }) => {
    const [module, setModule] = useState(route.params.item.module);
    const [title, setTitle] = useState(route.params.item.title);
    const [grade, setGrade] = useState(route.params.item.grade);
    const [section, setSection] = useState(route.params.section);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={false} />
            <Text style={styles.title}>Edit Grade</Text>

            <Text style={styles.label}>Module:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter module name"
                onChangeText={setModule}
                value={module}
            />

            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter title"
                onChangeText={setTitle}
                value={title}
            />

            <Text style={styles.label}>Grade:</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    placeholder={{ label: "Select a grade", value: null }}
                    onValueChange={(value) => setGrade(value)}
                    value={grade}
                    items={[
                        { label: "A", value: "A" },
                        { label: "B", value: "B" },
                        { label: "C", value: "C" },
                        { label: "D", value: "D" },
                        { label: "E", value: "E" },
                    ]}
                    style={{
                        placeholder: {
                            color: "dimgrey",
                        },
                    }}
                />
            </View>

            <Text style={styles.label}>Section:</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    placeholder={{ label: "Select a section", value: null }}
                    value={section}
                    onValueChange={(value) => setSection(value)}
                    items={[
                        { label: "Programming", value: "Programming" },
                        { label: "Design", value: "Design" },
                    ]}
                    style={{
                        placeholder: {
                            color: "dimgrey",
                        },
                    }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (!module || !title || !grade || !section) {
                            alert("Please fill all fields");
                            return;
                        }

                        // Save the updated item
                        const indexnum = section === "Programming" ? 0 : 1;
                        grades[indexnum].data[route.params.index] = {
                            module,
                            title,
                            grade,
                            section,
                        };
                        navigation.navigate("Home");
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        const indexnum = section === "Programming" ? 0 : 1;
                        Alert.alert(
                            "Are you sure?",
                            "",
                            [
                                {
                                    text: "Yeah",
                                    onPress: () => {
                                        grades[indexnum].data.splice(route.params.index, 1);
                                        navigation.navigate("Home");
                                    },
                                },
                                { text: "Nahh" },
                            ]
                        );
                    }}
                >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Edit;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#F9F9F9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "black",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        color: "dimgrey",
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "ghostwhite",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        padding: 5,
        marginBottom: 20,
        backgroundColor: "ghostwhite",
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonText: {
        color: "black",
        fontSize: 20,
        fontWeight: "600",
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: "center",
        backgroundColor: "skyblue",
        borderRadius: 8,
        marginVertical: 10,
    },
    deleteButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: "center",
        backgroundColor: "red",
        borderRadius: 8,
        marginVertical: 10,
    },
});
