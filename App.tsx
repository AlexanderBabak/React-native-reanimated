import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, Image, Dimensions, ImageBackground } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function App() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: Math.max(scale.value, 0) }] };
  });

  const rTextStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  const doubleTapRef = useRef();

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          onSingleTap();
        }}
      >
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={() => {
            onDoubleTap();
          }}
        >
          <Animated.View>
            <ImageBackground source={require('./assets/image.jpeg')} style={styles.image}>
              <AnimatedImage
                source={require('./assets/heart.png')}
                style={[
                  styles.image,
                  { shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.35, shadowRadius: 35 },
                  rStyle,
                ]}
                resizeMode={'center'}
              />
              <Animated.Text style={[styles.turtles, rTextStyle]}>🐢🐢🐢🐢🐢</Animated.Text>
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
}

const { width: SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  turtles: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 30,
  },
});
