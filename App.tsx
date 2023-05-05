import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Page } from './components/Page';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

export default function App() {
  const translateX = useSharedValue(0);

  const scrollHAndler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHAndler}
      scrollEventThrottle={16}
      horizontal
      style={styles.container}
    >
      {WORDS.map((title, index) => {
        return <Page key={index.toString()} title={title} index={index} translateX={translateX} />;
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
