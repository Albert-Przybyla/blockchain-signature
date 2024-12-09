import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useScrollViewOffset, useAnimatedRef } from "react-native-reanimated";

const HEADER_HEIGHT = 150;

type ListHeaderProps = {
  headerImage: ReactElement;
  scrollRef: ReturnType<typeof useAnimatedRef<Animated.FlatList<any>>>;
};

const ListHeader = ({ scrollRef, headerImage }: ListHeaderProps) => {
  // Użycie offsetu przewijania dla referencji
  const scrollOffset = useScrollViewOffset(scrollRef);

  // Styl animacji dla nagłówkai
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
      },
    ],
  }));

  return <Animated.View style={[styles.header, headerAnimatedStyle]}>{headerImage}</Animated.View>;
};

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
});

export default ListHeader;
