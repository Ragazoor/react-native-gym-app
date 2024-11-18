import { fetchWorkoutsStartDateAtom } from "@/atoms/fetchWorkoutsAtom";
import { MuscleEmoji } from "@/components/MuscleEmoji";
import VenueFilterButton from "@/components/VenueFilterButton";
import WorkoutFilterIcon from "@/components/WorkoutFilterIcon";
import { dateToWeekDay, VenueName, Workout } from "@/models/workout";
import WorkoutCard from "@/components/WorkoutCard";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { useGetFilteredWorkouts } from "@/hooks/useGetFilteredWorkouts";
import { useAtomValue } from "jotai";
import React, { useState, useMemo } from "react";
import { FlatList } from "react-native";
import { useTheme, Surface, Text, Button } from "react-native-paper";
import { CustomTheme } from "../_layout";

export default function WorkoutsScreen() {
  const { colors, spacing, fonts } = useTheme<CustomTheme>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateTime, setSelectedDate] = useState(new Date());
  const startDate = useAtomValue(fetchWorkoutsStartDateAtom);

  const selectedWeekDay = useMemo(
    () => dateToWeekDay(selectedDateTime),
    [selectedDateTime]
  );

  const filteredWorkouts = useGetFilteredWorkouts(selectedDateTime);

  const onSelectDateTime = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <>
      <Surface
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: spacing.large,
        }}
      >
        <Text variant="headlineMedium" style={{ flex: 1 }}>
          Fysiken Pass
        </Text>
        <MuscleEmoji />
        <WorkoutFilterIcon />
      </Surface>

      <Surface
        style={{ padding: spacing.medium, backgroundColor: colors.background }}
      >
        <Text variant="titleMedium" style={{ marginBottom: spacing.small }}>
          {selectedWeekDay}
        </Text>
        <Button mode="contained" onPress={() => setShowDatePicker(true)}>
          Välj Datum
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode="date"
            display="default"
            onChange={onSelectDateTime}
          />
        )}
      </Surface>

      <Surface
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: spacing.medium,
        }}
      >
        <VenueFilterButton buttonVenueName={VenueName.GIBRALTARGATAN} />
        <VenueFilterButton buttonVenueName={VenueName.KASTERNTORGET} />
      </Surface>

      <Surface style={{ flex: 1, marginBottom: spacing.large }}>
        <FlatList
          data={filteredWorkouts.map((workout) => ({
            key: workout.id,
            ...workout,
          }))}
          renderItem={({ item }) => <WorkoutCard workout={item} />}
        />
      </Surface>
    </>
  );
}
