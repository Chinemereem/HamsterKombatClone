import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  children: ReactNode;
  // Define your props here
}

const Modal: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.shadow} />
      <View style={styles.view}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '25%',
    bottom: 0,
    right: 0,
    left: 0,
  },
  view: {
    height: '92%',
    width: '100%',
    backgroundColor: '#1D1F24',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: '3%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  shadow: {
    height: '86.6%',
    backgroundColor: '#E9BA48',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // top: '22.4%',
    width: '98%',
    shadowColor: '#E9BA48',
    shadowOffset: {width: 0, height: -16},
    shadowOpacity: 0.5,
    shadowRadius: 10,

    position: 'absolute',
  },
});

export default Modal;
