import React, { useState } from "react";
import {
    TextInput,
    View,
    Text,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { grades } from "./Data";

const Add = ({ navigation }) => {
    const [module, setModule] = useState("");
    const [title, setTitle] = useState("");
    const [grade, setGrade] = useState("");
    const [section, setSection] = useState("");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar hidden={false} />
            <Text style={styles.title}>Add a New Grade</Text>

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
                placeholder="Enter assignment or test title"
                onChangeText={setTitle}
                value={title}
            />

            <Text style={styles.label}>Grade:</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    placeholder={{ label: "Select a grade", value: null }}
                    onValueChange={(value) => setGrade(value)}
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
                    onValueChange={(value) => setSection(value)}
                    items={grades.map((section) => ({
                        label: section.sectionTitle,
                        value: section.sectionTitle,
                    }))}
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
                        const targetSection = grades.find(
                            (sec) => sec.sectionTitle === section
                        );

                        if (targetSection) {
                            const newGrade = { title, module, grade };
                            targetSection.data.push(newGrade);
                            navigation.navigate("Home");
                        } else {
                            alert("Selected section not found.");
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Add;

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
        color: "black",
        paddingHorizontal: 20,
        marginHorizontal: 100,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "skyblue",
    },
    buttonText: {
        color: "black",
        fontSize: 20,
        fontWeight: "600",
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: "center",
    },
});
