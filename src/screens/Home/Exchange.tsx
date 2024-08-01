import React, {SetStateAction, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
  SafeAreaView,
  Pressable,
  View,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import {
  CloseImg,
  ColoredArrowImg,
  LoadImage,
  LockImg,
  ModalLockImg,
  More,
  TonBgImg,
  back,
  downChevron,
  walletImg,
} from '../../assets/images';
import BackgroundButton from './common/Button';
import Modal from './common/Modal';

interface Props {
  style?: ViewStyle;
  closeScreen: any;
  closeBottomTab: SetStateAction<any>;
  // Define your props here
}

const ExchangeScreen: React.FC<Props> = props => {
  const [tonModal, setTonModal] = useState(false);
  const [loading, setIsloading] = useState(false);
  const [isDissabled, setIsDissabled] = useState(true);
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;
  const revealViews = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity1, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity3, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };
  const handleBtnPress = () => {
    revealViews();
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
      props.closeBottomTab(false);
      setTonModal(false);
    }, 2000);
  };
  const handleTonWalltBtn = () => {
    setIsDissabled(false);
  };
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <View style={{paddingHorizontal: 12}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.firstRow}>
            <Pressable
              onPress={() => {
                if (tonModal) {
                  setTonModal(false);
                  props.closeBottomTab(false);
                } else {
                  props.closeScreen(false);
                }
              }}>
              <Image source={back} style={{width: 25, height: 25}} />
            </Pressable>
            <Text style={styles.title}>Hamster Kombat </Text>
          </View>
          <View style={styles.secondRow}>
            <Pressable
              onPress={() => {
                setTonModal(false);
                props.closeScreen(true);
              }}>
              <Image source={downChevron} style={{}} />
            </Pressable>
            <Image source={More} style={{width: 22, height: 22}} />
          </View>
        </View>
        <View style={[{marginTop: 5, height: 150, justifyContent: 'center'}]}>
          <Image
            source={TonBgImg}
            style={[{alignSelf: 'center', width: '46%', height: '90%'}]}
          />
        </View>
        <View style={{alignSelf: 'center', bottom: 10}}>
          <Text style={styles.Earnheader}>Earn More Coins</Text>
          <Text style={styles.text}>
            Listing is on it's way. Task will appear below.{'\n'}
            Complete them to participate in the airdrop
          </Text>
        </View>
        <View style={{marginBottom: 15, marginTop: 20}}>
          <Text style={styles.text}>Task List </Text>
        </View>
        <BackgroundButton
          aligned={{
            height: 60,
            marginTop: 10,
            backgroundColor: '#329DDF',
          }}
          onPress={() => {
            props.closeBottomTab(true);
            setTonModal(true);
          }}
          source={LockImg}
          taskImgSource={{width: 40, height: 40, alignSelf: 'center'}}
          alignedView={{alignSelf: 'center', width: '76%'}}
          taskTitle="Connect your TON wallet"
          viewDirection={{flexDirection: 'row', marginTop: 2}}
          textStyle={{top: 10}}
          chevronViewStyle={styles.chevStyle}
          activeChevronImgSource={ColoredArrowImg}
          activeChevronImgSourceStyle={{width: 30, height: 30, top: -10}}
          leftChevronImg={ColoredArrowImg}
          leftChevronImgStyle={{width: 30, height: 30, top: -10}}
        />
      </View>
      {tonModal && (
        <Modal
          style={{height: 600, top: '44%'}}
          children={
            <View style={{alignItems: 'center'}}>
              <ScrollView
                style={{
                  height: '53%',
                  width: '100%',
                  marginBottom: '10%',
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Image source={ModalLockImg} style={styles.img} />
                  <Pressable
                    style={{left: 120}}
                    onPress={() => {
                      setTonModal(false);
                      props.closeBottomTab(false);
                    }}>
                    <Image source={CloseImg} style={{width: 25, height: 24}} />
                  </Pressable>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={[styles.text, {fontSize: 23, fontWeight: '600'}]}>
                    Energy Limit
                  </Text>
                  <Text style={styles.text}>Increase the amount of energy</Text>
                  <Text style={styles.text}>+500 energy points for level</Text>
                </View>
                <Pressable style={styles.justify} onPress={handleTonWalltBtn}>
                  <Image
                    source={walletImg}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 5,
                      alignSelf: 'center',
                    }}
                  />

                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'white',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Connect your TON wallet
                  </Text>
                </Pressable>
              </ScrollView>
              <Pressable
                style={[
                  styles.pressable,
                  {
                    width: '90%',
                    backgroundColor:
                      loading || isDissabled ? '#454547' : '#5a5fff',
                  },
                ]}
                onPress={handleBtnPress}
                disabled={isDissabled}>
                {loading ? (
                  //   <ActivityIndicator />
                  <>
                    <Animated.Image
                      source={LoadImage}
                      style={[{opacity: opacity1, width: 20, height: 20}]}
                    />
                    <Animated.Image
                      source={LoadImage}
                      style={[{opacity: opacity2, width: 20, height: 20}]}
                    />
                    <Animated.Image
                      source={LoadImage}
                      style={[{opacity: opacity3, width: 20, height: 20}]}
                    />
                  </>
                ) : (
                  <Text style={styles.textx}>
                    {isDissabled ? 'Check' : 'Na you sabi'}
                  </Text>
                )}
              </Pressable>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 86,
    backgroundColor: '#000',
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
  Earnheader: {
    color: 'white',
    fontSize: 27,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '800',
    lineHeight: 27,
  },
  text: {
    color: 'white',

    fontWeight: '700',
  },
  chevStyle: {
    alignSelf: 'center',
  },
  pressable: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
  },
  textx: {
    color: 'white',

    fontWeight: '700',
  },
  img: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 20,
  },
  freeText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    fontWeight: '600',
    fontSize: 23,
  },
  justify: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#34A5EA',
    width: '98%',
    height: 45,
    borderRadius: 10,
  },
});

export default ExchangeScreen;
