import { fetchTransfers } from "@/api/transfer";
import ListEmpty from "@/components/ListEmpty";
import { ListItem, SwipeButton } from "@/components/ListItem";
import { PagedResponse } from "@/models/pagedResponse";
import { TransferResponse } from "@/models/transfer/transferResponse.model";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const DocumentsScreen = () => {
  const [data, setData] = useState<PagedResponse<TransferResponse> | undefined>(undefined);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const response = await fetchTransfers(1, 10);
    if (response) {
      setData(response);
    }
  };

  return (
    <View>
      {data && (
        <SwipeListView
          className="h-full"
          keyExtractor={(item) => item.id}
          data={data.items}
          renderItem={(item) => (
            <ListItem
              title={item.item.id}
              leftIconName="star"
              rightIconName="chevron-forward"
              onPress={() => console.log(item.item.id)}
            />
          )}
          renderHiddenItem={(item) => (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              <SwipeButton iconName="trash" onPress={() => console.log("Delete")} />
              <SwipeButton iconName="create" onPress={() => console.log("Edit")} />
            </View>
          )}
          ListEmptyComponent={ListEmpty}
          rightOpenValue={-130}
          disableRightSwipe
        />
      )}
    </View>
  );
};

export default DocumentsScreen;
