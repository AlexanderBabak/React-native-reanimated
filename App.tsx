import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withDecay,
  useDerivedValue,
  cancelAnimation,
} from 'react-native-reanimated';
import { Page, PAGE_WIDTH } from './components/Page';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const titles = ["What's", 'up', 'mobile', 'devs?'];
type ContextType = {
  x: number;
};
export default function App() {
  const translateX = useSharedValue(0);

  const clampedTranslateX = useDerivedValue(() => {
    const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: 'row' }}>
          {titles.map((title, index) => {
            return (
              <Page
                key={index.toString()}
                title={title}
                index={index}
                translateX={clampedTranslateX}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
