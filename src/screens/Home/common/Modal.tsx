import React, {ReactNode} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ViewStyle,
  StyleProp,
  Dimensions,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  // Define your props here
}

const Modal: React.FC<Props> = props => {
  return (
    <View style={[styles.container, props.style]}>
      <Shadow
        distance={35}
        startColor={'rgb(101, 89, 0.1)'}
        offset={[0, 20]}
        style={{borderRadius: 10}}>
        <View style={styles.shadow} />
        <View style={styles.view}>{props.children}</View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    top: '25%',
    bottom: 0,
    right: 0,
    left: 0,
  },
  shadow: {
    height: '20%',
    backgroundColor: '#E9BA48',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    top: '2.7%',
    width: '99.5%',
    alignSelf: 'center',
    position: 'absolute',
    // shadowColor: '#E9BA48',
    // shadowOffset: {width: 0, height: -16},
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // top: '22.4%',
  },
  view: {
    height: '98%',
    width: Dimensions.get('window').width,
    backgroundColor: '#1D1F24',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: '3%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  box: {
    width: 300,
    height: 100,
    backgroundColor: '#2b2b2b',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Modal;
