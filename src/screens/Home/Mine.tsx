import React from 'react';
import {SafeAreaView, ViewStyle} from 'react-native';
import {Text, StyleSheet, Dimensions, Pressable} from 'react-native';

interface Props {
  style?: ViewStyle;
  closeScreen: any;
  // Define your props here
}

const Mine: React.FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => props.closeScreen(false)}>
        <Text>Mine</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 86,
    backgroundColor: 'gray',
  },
});

export default Mine;
