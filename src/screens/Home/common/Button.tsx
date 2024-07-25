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
import { Checked } from '../../../assets/images';

interface Props {
  source?: ImageSourcePropType;
  coinImgTwo?: ImageSourcePropType;
  activeChevronImgSource?: ImageSourcePropType;
  leftChevronImg?: ImageSourcePropType;
  activeChevronImgSourceStyle?: StyleProp<ImageStyle>;
  leftChevronImgStyle?: StyleProp<ImageStyle>;
  rewardAmount?: string;
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
      onPress={props.onPress}>
      <Image source={props.source} style={props.taskImgSource} />

      <View style={props.alignedView}>
        <Text
          style={{
            color: '#E8E9EC',

            fontWeight: '700',
          }}>
          {props.taskTitle}
        </Text>
        <View style={props.viewDirection}>
          <Image source={props.coinImgTwo} style={props.coinImgTwoStyle} />
          <Text style={[styles.title, props.titleStle]}>
            {props.rewardAmount}
          </Text>
        </View>
      </View>
      <View style={props.chevronViewStyle}>
        {props.passed ? (
          <View>
          <Image source={Checked} />
          </View>
        ) : (
          <>
            {pressed ? (
              <Image
                source={props.activeChevronImgSource}
                style={props.activeChevronImgSourceStyle}
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
