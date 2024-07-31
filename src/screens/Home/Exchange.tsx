import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
  SafeAreaView,
  Pressable,
  View,
  Image,
} from 'react-native';
import {More, back, downChevron} from '../../assets/images';

interface Props {
  style?: ViewStyle;
  closeScreen: any;
  // Define your props here
}

const ExchangeScreen: React.FC<Props> = props => {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <View style={{paddingHorizontal: 12}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.firstRow}>
            <Pressable
            // onPress={() => {
            //   if (showModal) {
            //     setShowModal(false);
            //     props.closeBottomTab(false);
            //   } else {
            //     props.closeScreen(false);
            //   }
            // }}
            >
              <Image source={back} style={{width: 25, height: 25}} />
            </Pressable>
            <Text style={styles.title}>Hamster Kombat </Text>
          </View>
          <View style={styles.secondRow}>
            <Pressable onPress={() => props.closeScreen(false)}>
              <Image source={downChevron} style={{}} />
            </Pressable>
            <Image source={More} style={{width: 22, height: 22}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 86,
    backgroundColor: 'gray',
  },
  firstRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: '50%',
    alignItems: 'center',
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '700',
  },
});

export default ExchangeScreen;
