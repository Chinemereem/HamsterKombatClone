import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  step: number;
  steps: number;
  height: number;
  style?: StyleProp<ViewStyle>;
  isDarkMode?: boolean;
  isGradient?: boolean;
}
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

const ProgressView: React.FC<Props> = props => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: props.step,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [props.step]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, props.steps],
    outputRange: ['0%', '100%'],
  });
  return (
    <View style={props.style}>
      <View
        style={[
          styles.progressBg,
          {
            height: props.height,
            borderRadius: props.height,
            width: '100%',
          },
        ]}>
        <AnimatedGradient
          colors={['#63D86D', '#D88BE3', '#8171DA']}
          style={[
            styles.gradientTop,
            {
              height: props.height || 6,
              borderRadius: props.height,
              width: widthInterpolated,
            },
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientTop: {},
  progressBg: {
    backgroundColor: '#3A372B',
    borderRadius: 7,
    overflow: 'hidden',
  },
});

export default ProgressView;
