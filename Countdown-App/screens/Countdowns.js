import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from "react-native";
import { React, useState, useEffect } from "react";
import {
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
import { useRoute } from "@react-navigation/native";

const Countdowns = () => {
  const route = useRoute();
  const events = route.params.events;

  if (events == null || events.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noCountdownsText}>No Active Countdowns</Text>
      </View>
    );
  }

  const [countdowns, setCountdowns] = useState([]);

  useEffect(() => {
    // Calculate countdowns for each event
    const intervalId = setInterval(() => {
      const now = new Date();
      const updatedCountdowns = events.map((event) => {
        const eventDate = new Date(event.date);
        const timeRemaining = eventDate - now;
        const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hoursRemaining = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutesRemaining = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondsRemaining = Math.floor(
          (timeRemaining % (1000 * 60)) / 1000
        );

        return {
          ...event,
          countdown: {
            days: daysRemaining,
            hours: hoursRemaining,
            minutes: minutesRemaining,
            seconds: secondsRemaining,
          },
        };
      });
      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval
  }, [events]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {countdowns.map((event) => (
        <View key={event.key} style={styles.countdownItem}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.countdownText}>
            {`${event.countdown.days}d ${event.countdown.hours}h ${event.countdown.minutes}m ${event.countdown.seconds}s`}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noCountdownsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countdownItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "90%", // Adjust the width to your preference
    alignItems: "center",
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countdownText: {
    fontSize: 16,
  },
});

export default Countdowns;