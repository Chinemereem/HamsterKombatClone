import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
  Animated,
} from 'react-native';
import BackgroundButton from './common/Button';
import {
  ActiveChevronImg,
  BatterImg,
  BoostImg,
  BoostImg2,
  Check,
  CloseImg,
  CoinBoost,
  CoinImgTwo,
  DimBoost,
  LeftChevronImg,
  LoadImage,
  ModalBatteryImg,
  ModalCoinImg,
  ModalPowerTapImg,
  More,
  PowerTap,
  back,
  dissabledCoinImg,
  downChevron,
} from '../../assets/images';
import Modal from './common/Modal';
import {useTimer} from './TimerContext';
import SpinningLoader from './Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  // Define your props here
  countBalance: number;
  setPowerCount: React.Dispatch<React.SetStateAction<number>>;
  closeBottomTab: SetStateAction<any>;
  closeScreen: any;
  setNumberIncrement: React.Dispatch<React.SetStateAction<number>>;
  numberIncrement: number;
  energy: number;
  setEnergy: React.Dispatch<React.SetStateAction<number>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  task: number;
  claimed: boolean;
}

const BoostScreen: React.FC<Props> = props => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setisloading] = useState(false);
  const {isTimerActive, setIsTimerActive, timeLeft, formatTime} = useTimer();
  const [changeToast, setChangeToast] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [check, setCheck] = useState(false);
  const [showMultiTapModal, setShowMultiTapModal] = useState(false);
  const [tapIncrement, setTapIncrement] = useState(2000);
  const [multitapIncrement, setMultiTapIncrement] = useState(2000);
  const [showRechargeTapModal, setShowRechargeTapModal] = useState(false);
  const [level, setLevel] = useState(2);
  const [isBoost, setIsBoots] = useState(false);
  const [isTap, setIsTap] = useState(false);
  const [tapLevel, setTapLevel] = useState(2);

  const saveBoostToLocalStorage = async (items: any) => {
    try {
      AsyncStorage.setItem('ceo-boost', JSON.stringify(items));
    } catch (e) {
      // saving error
    }
  };
  const saveToLocalStorage = async (items: any) => {
    try {
      await AsyncStorage.setItem('ceo-coins', JSON.stringify(items));
    } catch (e) {
      // saving error
    }
  };
  const handleBtn = () => {
    revealViews();
    setisloading(true);
    setShowToast(true);
    setCheck(false);
    setChangeToast('Recharging energy...');
    setTimeout(() => {
      props.setPowerCount(1000);
      setisloading(false);
      setIsTimerActive(true);
      props.closeBottomTab(false);
      setShowModal(false);
      setCheck(true);
      setChangeToast('success');
      // props.closeScreen(false);
    }, 4000);
    setTimeout(() => {
      setCheck(false);
      setChangeToast('Energy recharged!');
    }, 600);
  };
  const fetchBoost = async () => {
    try {
      const savedBoost = await AsyncStorage.getItem('ceo-boost');

      const number = JSON.parse(savedBoost);
      if (number) {
        setLevel(number.level);
        setTapLevel(number.tapLevel);
        setMultiTapIncrement(number.multitapIncrement);
        setTapIncrement(number.tapIncrement);
      }
    } catch (err) {}
  };
  useEffect(() => {
    fetchBoost();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [showToast]);
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;
  const number = Number(tapIncrement?.toString().replace(/0+$/, ''));
  const multitabnumber = Number(
    multitapIncrement?.toString().replace(/0+$/, ''),
  );
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
  const handleMultiTapBtn = async () => {
    revealViews();
    setisloading(true);
    try {
      props.setNumberIncrement(props.numberIncrement + 1);

      setTapLevel(tapLevel + 1);

      setMultiTapIncrement(multitapIncrement * 2);

      props.setCount(props.countBalance - multitapIncrement);
      await saveBoostToLocalStorage({
        energy: props.energy,
        tapLevel: tapLevel + 1,
        multitapIncrement: multitapIncrement * 2,
        numberIncrement: props.numberIncrement + 1,
        level: level,
        tapIncrement: tapIncrement,
      });
      setIsTap(true)
      setShowToast(true);
      setTimeout(() => {
        setisloading(false);
        setShowMultiTapModal(false);
        props.closeBottomTab(false);
      }, 1000);
    } catch {}
  };
  const handleSaveProps = async () => {
    try {
      await saveBoostToLocalStorage({
        energy: props.energy + 500,
        tapIncrement: tapIncrement * 2,
        level: level + 1,
        multitapIncrement: multitapIncrement,
        tapLevel: tapLevel,
        numberIncrement: props.numberIncrement,
      });
      await saveToLocalStorage({
        count: props.countBalance - tapIncrement,
        task: props.task,
        claimed: props.claimed,
      });
    } catch {}
  };
  const handleEnergyBtn = async () => {
    revealViews();
    setisloading(true);
    try {
      setLevel(level + 1);
      // if (level > 2) {
      setTapIncrement(tapIncrement * 2);
      // }
      props.setCount(props.countBalance - tapIncrement);
      setIsBoots(true);
      setShowToast(true);
      props.setEnergy(props.energy + 500);
      await handleSaveProps();
      setTimeout(() => {
        setisloading(false);
        setShowRechargeTapModal(false);
        props.closeBottomTab(false);
      }, 1000);
    } catch {}
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.firstRow}>
          <Pressable
            onPress={() => {
              if (showModal) {
                setShowModal(false);
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
          <Pressable onPress={() => props.closeScreen(false)}>
            <Image source={downChevron} style={{}} />
          </Pressable>
          <Image source={More} style={{width: 22, height: 22}} />
        </View>
      </View>
      {showToast && (
        <View
          style={{
            backgroundColor: '#242529',
            width: '90%',
            height: 35,
            borderRadius: 10,
            alignSelf: 'center',
            padding: 9,
            flexDirection: 'row',
            position: 'absolute',
            top: '6%',

            bottom: 0,
            zIndex: 20,
          }}>
          {check ? (
            <Image source={Check} style={{alignSelf: 'center'}} />
          ) : (
            <SpinningLoader
              outerColor={
                changeToast === 'Energy recharged!' ? '#395C44' : '#4D4E52'
              }
              innerColor={
                changeToast === 'Energy recharged!' ? '#83F58F' : 'white'
              }
            />
          )}
          {/* <Image source={Check} style={{alignSelf: 'center'}} /> */}
          {isBoost ? (
            <Text
              style={{
                fontSize: 10,
                color: 'white',
                marginLeft: 5,
                alignSelf: 'center',
              }}>
              {`Boost is yours! Energy Limit${level} lvl`}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 10,
                color: 'white',
                marginLeft: 5,
                alignSelf: 'center',
              }}>
              {changeToast}
            </Text>
          )}
          {isTap ? (
            <Text
              style={{
                fontSize: 10,
                color: 'white',
                marginLeft: 5,
                alignSelf: 'center',
              }}>
              {`Boost is yours! Energy Limit${level} lvl`}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 10,
                color: 'white',
                marginLeft: 5,
                alignSelf: 'center',
              }}>
              {changeToast}
            </Text>
          )}
        </View>
      )}

      <View
        style={{alignSelf: 'center', alignItems: 'center', paddingTop: '10%'}}>
        <Text style={{color: '#8D8E93'}}>Your Balance</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Image source={CoinBoost} style={{width: 40, height: 40}} />
          <Text style={{color: 'white', fontSize: 23, fontWeight: '700'}}>
            {props.countBalance.toLocaleString()}
          </Text>
        </View>
        <Text style={{color: '#F5CD46', marginTop: 10}}>How boost works</Text>
      </View>
      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text style={{color: 'white', fontWeight: '600'}}>
          Free daily boosters
        </Text>
        <BackgroundButton
          aligned={{height: 60, marginTop: 10}}
          onPress={() => {
            props.closeBottomTab(true);
            setShowRechargeTapModal(false);
            setShowMultiTapModal(false);
            setShowModal(true);
          }}
          source={BoostImg2}
          taskImgSource={{width: 30, height: 30, alignSelf: 'center'}}
          alignedView={{alignSelf: 'center', width: '76%'}}
          taskTitle="Full energy"
          viewDirection={{flexDirection: 'row', marginTop: 2}}
          rewardAmount="6/6 available"
          titleStle={{textAlign: 'center', fontWeight: '400'}}
          timeLeft={
            isTimerActive ? `${formatTime(timeLeft)}  minutes left` : ''
          }
          timeLeftViewStyle={styles.timeLeftViewStyle}
          disabled={isTimerActive}
        />
        <BackgroundButton
          aligned={{
            height: 60,
            marginTop: 10,
            opacity: 0.7,
            backgroundColor: '#141519',
          }}
          onPress={() => {}}
          source={DimBoost}
          taskImgSource={{width: 30, height: 30, alignSelf: 'center'}}
          alignedView={{alignSelf: 'center', width: '76%'}}
          taskTitle="Turbo"
          viewDirection={{flexDirection: 'row', marginTop: 2}}
          rewardAmount="coming soon"
          titleStle={{textAlign: 'center', fontWeight: '400'}}
        />
      </View>
      <View style={{marginTop: 20, marginLeft: 10}}>
        <Text style={{color: 'white', fontWeight: '600'}}>Boosters</Text>
        <BackgroundButton
          aligned={{height: 60, marginTop: 10}}
          onPress={() => {
            props.closeBottomTab(true);
            setShowRechargeTapModal(false);
            setShowModal(false);
            setShowMultiTapModal(true);
          }}
          source={PowerTap}
          taskImgSource={{width: 30, height: 30, alignSelf: 'center'}}
          alignedView={{alignSelf: 'center', width: '76%'}}
          taskTitle="Multitap"
          viewDirection={{flexDirection: 'row', marginTop: 2}}
          rewardAmount={`${multitabnumber}k`}
          text={`${tapLevel}lvl`}
          titleStle={{
            textAlign: 'center',
            fontWeight: '400',
            color: props.countBalance < multitapIncrement ? '#86898e' : 'white',
          }}
          coinImgTwo={
            props.countBalance < multitapIncrement
              ? dissabledCoinImg
              : CoinImgTwo
          }
          coinImgTwoStyle={{width: 25, height: 25}}
          viewStyle={styles.dot}
          chevronViewStyle={styles.chevStyle}
          activeChevronImgSource={ActiveChevronImg}
          activeChevronImgSourceStyle={{width: 16, height: 16, top: -10}}
          leftChevronImg={LeftChevronImg}
          leftChevronImgStyle={{width: 30, height: 30, top: -10}}
        />
        <BackgroundButton
          aligned={{
            height: 60,
            marginTop: 10,
          }}
          onPress={() => {
            props.closeBottomTab(true);
            setShowModal(false);
            setShowMultiTapModal(false);
            setShowRechargeTapModal(true);
          }}
          source={BatterImg}
          taskImgSource={{width: 30, height: 50, alignSelf: 'center'}}
          alignedView={{alignSelf: 'center', width: '76%'}}
          taskTitle="Energy Limit"
          viewDirection={{flexDirection: 'row', marginTop: 2}}
          rewardAmount={`${number}k`}
          text={`${level}lvl`}
          viewStyle={styles.dot}
          titleStle={{
            textAlign: 'center',
            fontWeight: '400',
            color: props.countBalance < tapIncrement ? '#86898e' : 'white',
          }}
          coinImgTwo={
            props.countBalance < tapIncrement ? dissabledCoinImg : CoinImgTwo
          }
          coinImgTwoStyle={{width: 25, height: 25}}
          chevronViewStyle={styles.chevStyle}
          activeChevronImgSource={ActiveChevronImg}
          activeChevronImgSourceStyle={{width: 16, height: 16, top: -10}}
          leftChevronImg={LeftChevronImg}
          leftChevronImgStyle={{width: 30, height: 30, top: -10}}
        />
      </View>
      {showModal && (
        <Modal
          style={{height: 600, top: '44%'}}
          children={
            <View style={{alignItems: 'center'}}>
              <ScrollView
                style={{
                  paddingBottom: '10%',

                  height: '47%',
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Image source={BoostImg} style={styles.img} />
                  <Pressable
                    style={{left: 120}}
                    onPress={() => {
                      setShowModal(false);

                      setShowMultiTapModal(false);
                      setShowRechargeTapModal(false);
                      props.closeBottomTab(false);
                    }}>
                    <Image source={CloseImg} style={{width: 25, height: 24}} />
                  </Pressable>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={[styles.text, {fontSize: 23, fontWeight: '600'}]}>
                    Full energy
                  </Text>
                  <Text style={styles.text}>
                    Recharge your energy to the maximum and do another round of
                    mining
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Image
                      source={ModalCoinImg}
                      style={{width: 25, height: 25, marginRight: 5}}
                    />
                    <Text style={styles.freeText}>Free</Text>
                  </View>
                </View>
              </ScrollView>
              <Pressable
                style={[
                  styles.pressable,
                  {
                    width: '90%',
                    backgroundColor: loading ? '#454547' : '#5a5fff',
                  },
                ]}
                onPress={handleBtn}>
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
                  <Text style={styles.textx}>Go ahead</Text>
                )}
              </Pressable>
            </View>
          }
        />
      )}

      {/* Multitap modal */}

      {showMultiTapModal && (
        <Modal
          style={{height: 600, top: '44%'}}
          children={
            <View style={{alignItems: 'center'}}>
              <ScrollView
                style={{
                  height: '48%',
                  width: '100%',
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Image source={ModalPowerTapImg} style={styles.img} />
                  <Pressable
                    style={{left: 120}}
                    onPress={() => {
                      if (showMultiTapModal) {
                        setShowMultiTapModal(false);
                        props.closeBottomTab(false);
                      }
                    }}>
                    <Image source={CloseImg} style={{width: 25, height: 24}} />
                  </Pressable>
                </View>
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={[styles.text, {fontSize: 23, fontWeight: '600'}]}>
                    Multitap
                  </Text>
                  <Text style={styles.text}>
                    Increase the amount of coins you can earn{'\n'} pertap
                  </Text>
                  <Text style={styles.text}>
                    +1 coin for tap for level {tapLevel}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Image
                      source={ModalCoinImg}
                      style={{width: 25, height: 25, marginRight: 5}}
                    />

                    <Text style={[styles.freeText, {marginLeft: 3}]}>
                      {multitapIncrement.toLocaleString()}
                    </Text>
                    <View style={styles.dot} />
                    <Text
                      style={{color: '#7E8186', fontSize: 15, marginLeft: 3}}>
                      {`${tapLevel}lvl`}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <Pressable
                style={[
                  styles.pressable,
                  {
                    width: '90%',
                    backgroundColor:
                      loading || props.countBalance < multitapIncrement
                        ? '#454547'
                        : '#5a5fff',
                  },
                ]}
                disabled={props.countBalance < multitapIncrement}
                onPress={handleMultiTapBtn}>
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
                    {props.countBalance < multitapIncrement
                      ? 'Insufficient Balance'
                      : 'Go ahead'}
                  </Text>
                )}
              </Pressable>
            </View>
          }
        />
      )}

      {showRechargeTapModal && (
        <Modal
          style={{height: 600, top: '44%'}}
          children={
            <View style={{alignItems: 'center'}}>
              <ScrollView
                style={{
                  height: '53%',
                  width: '100%',
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Image source={ModalBatteryImg} style={styles.img} />
                  <Pressable
                    style={{left: 120}}
                    onPress={() => {
                      if (showRechargeTapModal) {
                        setShowRechargeTapModal(false);
                        props.closeBottomTab(false);
                      }
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
                  <Text style={styles.text}>
                    +500 energy points for level {level}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Image
                      source={ModalCoinImg}
                      style={{width: 25, height: 25, marginRight: 5}}
                    />
                    <View>
                      <Text
                        style={[
                          styles.freeText,
                          {marginLeft: 3, marginBottom: 0},
                        ]}>
                        {tapIncrement.toLocaleString()}
                      </Text>
                    </View>
                    <View style={[styles.dot]} />
                    <Text
                      style={{
                        color: '#7E8186',
                        fontSize: 20,
                        marginLeft: 3,
                        textAlign: 'center',
                      }}>
                      {`${level} lvl`}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <Pressable
                style={[
                  styles.pressable,
                  {
                    width: '90%',
                    backgroundColor:
                      loading || props.countBalance < tapIncrement
                        ? '#454547'
                        : '#5a5fff',
                  },
                ]}
                disabled={props.countBalance < tapIncrement}
                onPress={handleEnergyBtn}>
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
                    {props.countBalance < tapIncrement
                      ? 'Insufficient Balance'
                      : 'Go ahead'}
                  </Text>
                )}
              </Pressable>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 86,
    backgroundColor: '#000000',
  },
  box: {
    width: 20,
    height: 20,
    marginLeft: 29,
    backgroundColor: 'blue',
  },
  firstRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: '50%',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  freeText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    fontWeight: '600',
    fontSize: 23,
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    justifyContent: 'space-between',
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
  dot: {
    backgroundColor: '#7E8186',
    height: 5,
    width: 5,
    borderRadius: 10,
    alignSelf: 'center',
    marginLeft: 3,
  },
  chevStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '700',
  },
  timeLeftViewStyle: {
    height: 46,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 6,
  },
});

export default BoostScreen;
