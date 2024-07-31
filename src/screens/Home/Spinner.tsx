import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SpinningLoader = ({
  radius = 7,
  strokeWidth = 3,
  duration = 1000,
  outerColor = '#4D4E52',
  innerColor = 'white',
}) => {
  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotationAnim, duration]);

  const interpolatedRotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const circleCircumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth / 2;

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Svg
        width={radius * 2 + strokeWidth}
        height={radius * 2 + strokeWidth}
        viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}>
        <Circle
          cx={halfCircle}
          cy={halfCircle}
          r={radius}
          stroke={outerColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Animated.View
          style={{
            position: 'absolute',
            width: radius * 2 + strokeWidth,
            height: radius * 2 + strokeWidth,
            transform: [{rotate: interpolatedRotation}],
          }}>
          <Svg
            width={radius * 2 + strokeWidth}
            height={radius * 2 + strokeWidth}
            viewBox={`0 0 ${radius * 2 + strokeWidth} ${
              radius * 2 + strokeWidth
            }`}
            style={{position: 'absolute', top: 0, left: 0}}>
            <AnimatedCircle
              cx={halfCircle}
              cy={halfCircle}
              r={radius}
              stroke={innerColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${circleCircumference}`}
              strokeDashoffset={`${circleCircumference * 0.75}`}
              strokeLinecap="round"
            />
          </Svg>
        </Animated.View>
      </Svg>
    </View>
  );
};

export default SpinningLoader;
