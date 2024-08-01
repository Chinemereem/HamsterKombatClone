import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
  ViewStyle,
  GestureResponderEvent,
  TextStyle,
} from 'react-native';
import {Checked} from '../../../assets/images';

interface Props {
  source?: ImageSourcePropType;
  coinImgTwo?: ImageSourcePropType;
  activeChevronImgSource?: ImageSourcePropType;
  leftChevronImg?: ImageSourcePropType;
  activeChevronImgSourceStyle?: StyleProp<ImageStyle>;
  leftChevronImgStyle?: StyleProp<ImageStyle>;
  rewardAmount?: string | number;
  coinImgTwoStyle?: StyleProp<ImageStyle>;
  chevronViewStyle?: StyleProp<ViewStyle>;
  taskImgSource?: StyleProp<ImageStyle>;
  taskTitle?: string;
  viewDirection?: StyleProp<ViewStyle>;
  alignedView?: StyleProp<ViewStyle>;
  aligned?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  titleStle?: StyleProp<TextStyle>;
  passed?: boolean;
  text?: string;
  viewStyle?: StyleProp<ViewStyle>;
  timeLeft?: string;
  timeLeftViewStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;

  // Define your props here
}

const BackgroundButton: React.FC<Props> = props => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      style={[styles.noAlign, props.aligned]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => {
        setPressed(false);
      }}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Image source={props.source} style={props.taskImgSource} />

      <View style={props.alignedView}>
        <Text
          style={[
            {
              color: '#E8E9EC',

              fontWeight: '700',
            },
            props.textStyle,
          ]}>
          {props.taskTitle}
        </Text>
        <View style={props.viewDirection}>
          <Image source={props.coinImgTwo} style={props.coinImgTwoStyle} />
          <View style={{alignSelf: 'center', flexDirection: 'row'}}>
            <Text style={[styles.title, props.titleStle]}>
              {props.rewardAmount}
            </Text>
            <View style={props.viewStyle} />
            <Text
              style={[
                styles.title,
                {color: '#7E8186', fontSize: 12, marginLeft: 3},
              ]}>
              {props.text}
            </Text>
          </View>
        </View>
      </View>
      <View style={props.chevronViewStyle}>
        <View style={props.timeLeftViewStyle}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            {props.timeLeft}
          </Text>
        </View>
        {props.passed ? (
          <View>
            <Image source={Checked} />
          </View>
        ) : (
          <>
            {pressed ? (
              <Image
                source={props.activeChevronImgSource}
                style={[props.activeChevronImgSourceStyle]}
              />
            ) : (
              <Image
                source={props.leftChevronImg}
                style={props.leftChevronImgStyle}
              />
            )}
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  noAlign: {
    backgroundColor: '#272A2F',
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '700',
  },
});

export default BackgroundButton;
