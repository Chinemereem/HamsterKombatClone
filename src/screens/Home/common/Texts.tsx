import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const TapText = ({x, y, removing, plusTap}) => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (removing) {
      opacity.value = withTiming(0, {duration: 500});
      translateY.value = withTiming(-20, {duration: 500});
    }
  }, [removing]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <Animated.Text
      style={[styles.animatedText, {left: x, top: y}, animatedStyle]}>
      +{plusTap}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  animatedText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '800',
    zIndex: 1,
    position: 'absolute',
  },
});
