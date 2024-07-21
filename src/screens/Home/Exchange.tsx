import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
  SafeAreaView,
  Pressable,
} from 'react-native';

interface Props {
  style?: ViewStyle;
  closeScreen: any;
  // Define your props here
}

const ExchangeScreen: React.FC<Props> = props => {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <Pressable onPress={() => props.closeScreen(false)}>
        <Text>ExchangeScreen</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 86,
    backgroundColor: 'gray',
  },
});

export default ExchangeScreen;
