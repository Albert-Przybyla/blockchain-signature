import { fetchUserList } from "@/api/user";
import SelectListItem from "@/components/SelectListItem";
import TabSwitch from "@/components/TabSwitch";
import { Text } from "@/components/Text";
import { PagedResponse } from "@/models/pagedResponse";
import { User } from "@/models/user/user.model";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Modal, View } from "react-native";
import { AgendaList, Calendar, CalendarList, CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import { Positions } from "react-native-calendars/src/expandableCalendar";
import { FlatList } from "react-native-gesture-handler";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [data, setData] = useState<PagedResponse<User> | undefined>(undefined);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetchUserList(1, 10);
    if (response) {
      setData(response);
    }
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={handlePresentModalPress} title="Filtruj" />,
    });
  }, [navigation]);

  return (
    <View>
      <CalendarList
        onVisibleMonthsChange={(months) => {
          console.log("now these months are visible", months);
        }}
        pastScrollRange={50}
        futureScrollRange={50}
        scrollEnabled={true}
        showScrollIndicator={true}
        // theme={{
        //   backgroundColor: "#ffffff",
        //   calendarBackground: "#ffffff",
        //   textSectionTitleColor: "#b6c1cd",
        //   selectedDayBackgroundColor: "#00adf5",
        //   selectedDayTextColor: "#ffffff",
        //   todayTextColor: "#00adf5",
        //   dayTextColor: "#2d4150",
        //   textDisabledColor: "#dd99ee",
        // }}
      />

      <BottomSheetModalProvider>
        <BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
          <BottomSheetView>
            <View className="p-4">
              <TabSwitch
                options={[
                  { name: "Użytkownicy", value: "users" },
                  { name: "Zasoby", value: "items" },
                ]}
                value="users"
                setValue={() => {}}
              />
              {data && (
                <FlatList
                  data={data?.items}
                  renderItem={({ item }) => (
                    <SelectListItem
                      title={`${item.first_name} ${item.last_name} (${item.email})`}
                      selected={false}
                      onPress={(selected) => {
                        console.log(selected);
                      }}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              )}
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default CalendarScreen;
