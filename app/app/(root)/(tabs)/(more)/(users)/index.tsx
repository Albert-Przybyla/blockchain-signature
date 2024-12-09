import ListEmpty from "@/components/ListEmpty";
import { PagedResponse } from "@/models/pagedResponse";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { ListItem, SwipeButton } from "@/components/ListItem";
import { router } from "expo-router";
import { fetchUserList } from "@/api/user";
import { UserResponse } from "@/models/user/user.model";

const ItemsScreen = () => {
  const [data, setData] = useState<UserResponse[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async (nextPage = 1) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response: PagedResponse<UserResponse> = await fetchUserList(nextPage, 10);
      if (response) {
        setData((prevData) => [...prevData, ...response.items]);
        setHasMore(response.current_page < response.total_pages);
      }
    } catch (error) {
      console.error("Błąd podczas ładowania danych:", error);
    } finally {
      setIsLoading(false);
      setPage(nextPage);
    }
  };

  const handleLoadMore = () => {
    if (hasMore) {
      getItems(page + 1);
    }
  };

  const handleReload = () => {
    setPage(1);
    getItems(page);
  };

  return (
    <View>
      {data && (
        <SwipeListView
          className="h-full"
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={(item) => (
            <ListItem
              title={`${item.item.first_name} ${item.item.last_name} (${item.item.email})`}
              leftIconName="person-outline"
              onPress={() => console.log(item.item.id)}
            />
          )}
          renderHiddenItem={(item) => (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              <SwipeButton iconName="trash" onPress={() => console.log("Delete")} />
              <SwipeButton
                iconName="create"
                onPress={() => router.push({ pathname: "/(users)/user_form", params: { id: item.item.id } })}
              />
            </View>
          )}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#0000ff" className="p-2" /> : null}
          rightOpenValue={-130}
          onEndReached={handleLoadMore}
          onStartReached={handleReload}
          onEndReachedThreshold={0.5}
          onStartReachedThreshold={0.5}
          disableRightSwipe
        />
      )}
    </View>
  );
};

export default ItemsScreen;
