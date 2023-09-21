import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Countdowns from "./screens/Countdowns";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Countdowns"
          component={Countdowns} // Use the SecondScreen component
          options={{ title: "Active Countdowns" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDateTime, setEventDateTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const addEvent = () => {
    if (eventName.length == 0) {
      return Alert.alert("Event Name is empty");
    }
    const newEvent = {
      name: eventName,
      date: new Date(date),
      key: Math.random().toString(),
    };
    setEvents([...events, newEvent]);
    setEventName("");
    setEventDateTime(new Date());
    console.log(newEvent.key);
  };

  //TODO: Add a countdown screen where active countdowns are stored and a live countdown next to them
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Countdown App</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={(text) => setEventName(text)}
      />
      <View style={styles.datePicker}>
        {!show && (
          <Button title="Show Date Picker" onPress={() => showMode("date")} />
        )}
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => addEvent()}>
        <Text>Add Event</Text>
      </TouchableOpacity>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <Text style={styles.eventItem}>
            {item.name + " on: " + item.date.toDateString()}
          </Text>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Countdowns", {events})}
      >
        <Text>Go to Second Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  eventItem: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 10,
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "coral",
  },
  setDateButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "coral",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    textAlign: "justify",
    display: "flex",
    margin: "auto",
    width: "100%",
  },
  selectedDate: {
    fontSize: 18,
    marginTop: 20,
  },
  datePicker: {
    padding: 20,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "justify",
    display: "flex",
    margin: "auto",
    width: "100%",
  },
});
