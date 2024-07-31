import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const TapText = ({x, y, removing, plusTap, cipherView, longPress,}) => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (removing) {
      opacity.value = withTiming(0, {duration: 500});
      translateY.value = withTiming(-50, {duration: 500});
    }
  }, [removing]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <>
      {cipherView ? (
        <>
          {longPress ? (
            <Animated.View
              style={[styles.dash, {left: x, top: y}, animatedStyle]}
            />
          ) : (
            <Animated.View
              style={[styles.ball, {left: x, top: y}, animatedStyle]}
            />
          )}
        </>
      ) : (
        <Animated.Text
          style={[styles.animatedText, {left: x, top: y}, animatedStyle]}>
          +{plusTap}
        </Animated.Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  animatedText: {
    color: 'white',
    fontSize: 23,
    fontWeight: '800',
    zIndex: 1,
    position: 'absolute',
  },
  ball: {
    backgroundColor: 'red',
    height: 15,
    width: 15,
    borderRadius: 20,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
  dash: {
    backgroundColor: 'red',
    height: 3,
    width: 25,
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
  },
});
