import {
  Image,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Pressable,
  FlatList,
  View,
  TextInput,
  Button,
  Keyboard,
  ScrollView,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CheckBox, darkColors } from "@rneui/themed";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

const routes = [
  {
    id: 1,
    color: "green",
    grade: "V0",
    sent: true,
    attempts: 3,
    image:
      "https://images.pexels.com/photos/7590882/pexels-photo-7590882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    notes: "this is an epic note",
    dateSet: "04-09-2024",
  },
];

type Route = {
  id: number;
  color: string;
  grade: string;
  sent: boolean;
  attempts: number;
  image: string;
  notes: string;
  dateSet: string;
};

type Inputs = {
  attempts: string;
  notes: string;
  sent: boolean;
};

export default function Route() {
  let routeId = useLocalSearchParams().id;
  console.log(routeId);

  if (routeId !== undefined && Array.isArray(routeId)) {
    routeId = routeId[0];
  }

  const route =
    routeId !== undefined
      ? routes.find((route) => route.id === parseInt(routeId))
      : undefined;

  const [check, setCheck] = useState(route?.sent || false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      attempts: route?.attempts.toString() || "0",
      notes: route?.notes || "",
      sent: route?.sent || false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  if (route === undefined) {
    return (
      <View>
        <Text>Route not found</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Stack.Screen options={{ title: "Route" }} />
      <ThemedView style={styles.routeInfoContainer}>
        <ThemedText style={{ fontWeight: "bold" }}>{route.grade}</ThemedText>
        <Image
          source={{ uri: route.image }}
          style={{ width: 200, height: 300 }}
        />
        <ThemedText style={{ marginBottom: 30, marginTop: -5, fontSize: 12 }}>
          {route.dateSet}
        </ThemedText>

        <ThemedView style={{ gap: 20 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedView>
                <CheckBox
                  center
                  iconRight
                  title={"Sent"}
                  checked={check}
                  onPress={() => {
                    setCheck(!check);
                    console.log(check);
                  }}
                  onBlur={onBlur}
                  uncheckedColor="#fff"
                  checkedColor="green"
                  titleProps={{
                    style: {
                      color: Colors.dark.text,
                      fontWeight: "700",
                      fontSize: 16,
                      marginRight: 6,
                    },
                  }}
                  wrapperStyle={{ backgroundColor: Colors.dark.background }}
                  containerStyle={{ backgroundColor: Colors.dark.background }}
                />
              </ThemedView>
            )}
            name="sent"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedView>
                <ThemedView style={styles.attemptsContainer}>
                  <ThemedText style={{ fontWeight: 700 }}>Attempts:</ThemedText>
                  <View
                    style={{ display: "flex", flexDirection: "row", gap: 15 }}
                  >
                    <Button
                      title="-"
                      onPress={() =>
                        +value > 0
                          ? onChange((parseInt(value) - 1).toString())
                          : onChange("0")
                      }
                    />
                    <TextInput
                      returnKeyType="done"
                      placeholder={route.attempts.toString() || "0"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={{
                        color: "white",
                        width: 25,
                        textAlign: "center",
                        borderRadius: 5,
                      }}
                    />
                    <Button
                      title="+"
                      onPress={() => onChange((parseInt(value) + 1).toString())}
                    />
                  </View>
                </ThemedView>
              </ThemedView>
            )}
            name="attempts"
          />
          {errors.attempts && <Text>This is required.</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedView style={styles.notesContainer}>
                <ThemedText style={{ fontWeight: 700 }}>Notes:</ThemedText>
                <TextInput
                  editable
                  multiline
                  onSubmitEditing={Keyboard.dismiss}
                  placeholder="This is the best route ever!"
                  placeholderTextColor={"#999"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={{
                    color: "black",
                    backgroundColor: "white",
                    width: 200,
                    borderRadius: 5,
                    height: 100,
                  }}
                />
              </ThemedView>
            )}
            name="notes"
          />

          <Button title="Save" onPress={handleSubmit(onSubmit)} />
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  routeInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
    paddingBottom: 20,
  },
  sent: {
    color: "white",
  },
  attemptsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  notesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    width: "100%",
  },
  wallsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 40,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  wallContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    minHeight: 150,
    width: "40%",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
});
