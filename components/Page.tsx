import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { width: PAGE_WIDTH } = Dimensions.get('window');

export const Page: React.FC<PageProps> = ({ title, index, translateX }) => {
  const pageOffcet = PAGE_WIDTH * index;
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffcet }],
    };
  });
  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
          alignItems: 'center',
          justifyContent: 'center',
        },
        rStyle,
      ]}
    >
      <Text
        style={{ fontSize: 70, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export { PAGE_WIDTH };
