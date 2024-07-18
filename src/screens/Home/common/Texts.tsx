import React, {useEffect} from 'react';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

export const TapText = ({x, y, removing}) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (removing) {
      opacity.value = withTiming(0, {duration: 500});
    }
  }, [removing]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.Text
      style={[
        {
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          zIndex: 1,
          position: 'absolute',
          left: x,
          top: y,
        },
        animatedStyle,
      ]}>
      tapped
    </Animated.Text>
  );
};
