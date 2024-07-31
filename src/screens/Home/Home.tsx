import React, {SetStateAction, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  Pressable,
  Dimensions,
  ViewStyle,
  ScrollView,
} from 'react-native';
import {
  BoostImage,
  CipherImg,
  CipherReward,
  CoinImg,
  Hams,
  HamsterUserIcon,
  Powermage,
  RoundImg,
  SettingImg,
  coin,
  comboImage,
  cypherImage,
  info,
  rewardImage,
} from '../../assets/images';
import ProgressView from './ProgressView';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TapText} from './common/Texts';
import {getNextClaimTime} from './functions';
import BoostScreen from './BoostScreen';
import {Shadow} from 'react-native-shadow-2';
interface Props {
  style?: ViewStyle;
  closeScreen: any;
  toggleScreen: () => void;
  setShowBoostView: React.Dispatch<React.SetStateAction<boolean>>;
  showBoostView: boolean;
  closeBottomTab: SetStateAction<any>;
  // Define your props here
}

const Home: React.FC<Props> = props => {
  const [count, setCount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [newDayReward, setNewDayReward] = useState(false);
  const [level, setLevel] = useState('Bronze');
  const [levelCount, setLevelCount] = useState(1);
  const [task, setTask] = useState(1);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const touched = useSharedValue<boolean>(false);
  const longPressed = useSharedValue<boolean>(false);
  const longerPressed = useSharedValue<boolean>(false);
  const [numberIncrement, setNumberIncrement] = useState(1);

  const [energy, setEnergy] = useState(1000);
  const [powerCount, setPowerCount] = useState(energy);
  const [taps, setTaps] = useState<never[]>([]);
  const [pressedGes, setPressedGess] = useState<never[]>([]);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const [claimed, setClaimed] = useState(false);
  const [cypherClaimed, setCypherClaimed] = useState(false);
  const [cipherView, setCipherView] = useState(false);
  const [comboClaimed, setComboClaimed] = useState(false);
  const translateY = useSharedValue(0);
  const longPressscale = useSharedValue(1);

  // const opacity = useSharedValue(0);
  const myFunction = () => {
    setCount(count + numberIncrement);
    saveToLocalStorage({
      count: count + numberIncrement,
      task: task,
      claimed: claimed,
    });
    if (powerCount <= 1) {
      return;
    } else {
      setPowerCount(powerCount - 3);
    }
  };
  const runFunction = () => {
    setCount(count + numberIncrement);
    saveToLocalStorage({
      count: count + numberIncrement,
      task: task,
      claimed: claimed,
    });
    if (powerCount <= 1) {
      return;
    } else {
      setPowerCount(powerCount - 3);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setPowerCount(prevNumber => {
        if (prevNumber < energy) {
          return prevNumber + 3;
        } else {
          clearInterval(interval);
          return prevNumber;
        }
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [powerCount]);
  useEffect(() => {
    const fetchNextClaimTime = async () => {
      const nextTime = await getNextClaimTime();
      setNextClaimTime(nextTime);
    };

    fetchNextClaimTime();
  }, []);
  const formatTime = date => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  const [nextClaimTime, setNextClaimTime] = useState(null);

  const timeUntilNextClaim = new Date(nextClaimTime - new Date());
  const formattedTime = formatTime(timeUntilNextClaim);
  const getTaps = event => {
    const newTap = {x: event.x, y: event.y, id: Date.now() + Math.random()};
    setTaps(prevTaps => [...prevTaps, newTap]);
    // Set a timer to remove the tap after 1 second
    setTimeout(() => {
      removeTap(newTap.id);
    }, 300);
  };
  const removeTap = id => {
    setTaps(prevTaps =>
      prevTaps.map(tap => (tap.id === id ? {...tap, removing: true} : tap)),
    );

    // Remove the tap from the state after the animation duration
    setTimeout(() => {
      setTaps(prevTaps => prevTaps.filter(tap => tap.id !== id));
    }, 500);
  };

  const getPressed = event => {
    const newTap = {x: event.x, y: event.y, id: Date.now() + Math.random()};
    setPressedGess(prevTaps => [...prevTaps, newTap]);
    // Set a timer to remove the tap after 1 second
    setTimeout(() => {
      removePressed(newTap.id);
    }, 300);
  };
  const removePressed = id => {
    setPressedGess(prevTaps =>
      prevTaps.map(tap => (tap.id === id ? {...tap, removing: true} : tap)),
    );

    // Remove the tap from the state after the animation duration
    setTimeout(() => {
      setPressedGess(prevTaps => prevTaps.filter(tap => tap.id !== id));
    }, 500);
  };

  const fetchBoost = async () => {
    try {
      const savedBoost = await AsyncStorage.getItem('ceo-boost');
      const number = JSON.parse(savedBoost);
      if (number) {
        setEnergy(number.energy);
        setPowerCount(number.energy);
        setNumberIncrement(number.numberIncrement);
      }
      // setTask(number.task);
      // setClaimed(number.claimed);
    } catch (err) {}
  };
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const savedCoinCoutn = await AsyncStorage.getItem('ceo-coins');
        const number = JSON.parse(savedCoinCoutn);
        if (number) {
          setCount(number.count);
          setTask(number.task);
          setClaimed(number.claimed);
        }
      } catch (err) {}
    };

    // Call the fetchCoins function when the component mounts
    fetchBoost();
    fetchCoins();
  }, []);
  const tap = Gesture.Tap()
    .onBegin(event => {
      touched.value = true;
      const tapX = event.x;
      const tapY = event.y;
      x.value = tapX;
      y.value = tapY;

      if (touched.value) {
        runOnJS(myFunction)();
      }
      runOnJS(getTaps)(event);
    })
    .onFinalize(() => {
      touched.value = false;
    });

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 500, // Faster blink effect
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    opacity.value = withRepeat(
      withTiming(0, {
        duration: 500, // Faster fade effect
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });
  useEffect(() => {
    if (taps.length > 0) {
      translateY.value = withTiming(-20, {duration: 500});
      // setTaps(prevTaps => prevTaps.slice(1));
    }
  }, [taps, translateY]);

  const saveToLocalStorage = async (items: any) => {
    AsyncStorage.setItem('ceo-coins', JSON.stringify(items));
  };
  const handleClaimReward = async () => {
    // Save the current claim time

    props.toggleScreen();
    setCipherView(false);

    // await storeLastClaimTime();
    // const nextTime = await getNextClaimTime();
    // setNextClaimTime(nextTime);
    // setCount(count + 500);
    // setClaimed(true);
    // if (task === 11) {
    //   return;
    // } else {
    //   setTask(task + 1);
    //   saveToLocalStorage({count: count, task: task, claimed: claimed});
    // }
  };

  // Long press
  const longPress = Gesture.LongPress()
    .onBegin(event => {
      longPressscale.value = withTiming(1.2, {
        duration: 6000,
        easing: Easing.bezier(0.31, 0.04, 0.03, 1.04),
      });
      if (longPressscale) {
        longerPressed.value = true;
        const tapX = event.x;
        const tapY = event.y;
        x.value = tapX;
        y.value = tapY;
      } else {
        longPressed.value = true;
        const tapX = event.x;
        const tapY = event.y;
        x.value = tapX;
        y.value = tapY;
      }

      if (longPressed.value || longerPressed.value) {
        runOnJS(runFunction)();
      }
      runOnJS(getPressed)(event);
    })
    .onStart(() => {
      // colorIndex.value = withTiming(
      //   (colorIndex.value + 1) % (COLORS.length + 1),
      //   {duration: 200},
      //   () => {
      //     if (colorIndex.value === COLORS.length) {
      //       colorIndex.value = 0;
      //     }
      //   },
      // );
    })
    .onFinalize(() => {
      longPressed.value = false;
      longPressscale.value = withTiming(1, {duration: 1000}, () => {
        longerPressed.value = false;
      });
    });

  const handleCipher = () => {
    setCipherView(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      {!props.showBoostView ? (
        <>
          <View style={{left: 20}}>
            <View style={{flexDirection: 'row', width: '30%'}}>
              <Image source={HamsterUserIcon} style={{width: 40, height: 40}} />
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.title}>Anie(CEO)</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',

                top: 12,
              }}>
              <View style={{width: '30%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: '700', color: '#F1EEE5'}}>
                    {level}
                  </Text>
                  <Text style={{fontWeight: '700', color: '#fff'}}>
                    {levelCount}
                    <Text style={{fontWeight: '700', color: '#67645D'}}>
                      / 11
                    </Text>
                  </Text>
                </View>
                <View style={{marginTop: 6}}>
                  <ProgressView
                    step={task}
                    steps={11}
                    height={8}
                    style={{width: '100%'}}
                  />
                </View>
              </View>
              <View style={styles.block}>
                <Image source={Hams} style={{width: 23, height: 23, top: 5}} />
                <View
                  style={{
                    backgroundColor: '#4E473A',
                    width: 1,
                    height: 20,
                    alignSelf: 'center',
                  }}
                />
                <View>
                  <Text style={{color: '#67645D', fontSize: 9}}>
                    Profit per Hour
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      top: 3,
                      justifyContent: 'space-evenly',
                    }}>
                    <Image source={coin} style={{width: 18, height: 18}} />
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 10,
                        alignSelf: 'center',
                      }}>
                      {profit}
                    </Text>
                    <Image source={info} style={{width: 18, height: 18}} />
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#4E473A',
                    width: 1,
                    height: 20,
                    alignSelf: 'center',
                  }}
                />
                <Image
                  source={SettingImg}
                  style={{width: 22, height: 22, left: 5, alignSelf: 'center'}}
                />
              </View>
            </View>
          </View>
          <View style={styles.shadowBlock}>
            <Shadow
              distance={35}
              startColor={'rgb(101, 89, 0.1)'}
              offset={[0, 20]}
              style={{borderRadius: 10}}>
              <View style={styles.shadow} />
              <View style={styles.view}>
                {/* <View> */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 30,
                      marginLeft: 20,

                      alignSelf: 'center',
                    }}>
                    <View
                      style={
                        nextClaimTime
                          ? styles.rewardStyle
                          : {
                              alignItems: 'center',
                              top: 20,
                              marginRight: 20,
                            }
                      }>
                      <Pressable
                        style={styles.card}
                        onPress={handleClaimReward}>
                        <View style={{top: 10}}>
                          <View style={{width: 100, bottom: 5}}>
                            <Animated.View
                              style={[
                                !nextClaimTime && styles.box,
                                animatedStyle,
                              ]}
                            />
                            <Image
                              source={rewardImage}
                              style={{
                                width: 40,
                                height: 40,
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 10,
                              textAlign: 'center',
                              bottom: 5,
                            }}>
                            Daily Reward
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 10,
                              textAlign: 'center',
                            }}>
                            {formattedTime}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                    <View
                      style={
                        newDayReward
                          ? styles.rewardStyle
                          : {
                              alignItems: 'center',
                              top: 20,
                              marginRight: 20,
                            }
                      }>
                      <Pressable style={styles.card} onPress={handleCipher}>
                        <View style={{top: 10}}>
                          <View style={{width: 100, bottom: 5}}>
                            <Animated.View
                              style={[
                                !cypherClaimed && styles.box,
                                animatedStyle,
                              ]}
                            />
                            <Image
                              source={cypherImage}
                              style={{
                                width: 40,
                                height: 40,
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 10,
                              textAlign: 'center',
                            }}>
                            Daily Cipher
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                    <View
                      style={
                        newDayReward
                          ? styles.rewardStyle
                          : {
                              alignItems: 'center',
                              top: 20,
                              marginRight: 20,
                            }
                      }>
                      <View style={styles.card}>
                        <View style={{top: 10}}>
                          <View style={{width: 100, bottom: 5}}>
                            <Animated.View
                              style={[
                                !comboClaimed && styles.box,
                                animatedStyle,
                              ]}
                            />
                            <Image
                              source={comboImage}
                              style={{
                                width: 40,
                                height: 40,
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 10,
                              textAlign: 'center',
                            }}>
                            Daily Combo
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                    <Image source={CoinImg} style={{width: 50, height: 50}} />
                    <View style={{alignSelf: 'center'}}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: '600',
                        }}>
                        {count.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  {cipherView && (
                    <View style={styles.cipherReward}>
                      <Text style={[styles.title, {fontWeight: '700'}]}>
                        Daily cipher
                      </Text>
                      <Image
                        source={CipherReward}
                        style={{width: 100, height: 30}}
                      />
                    </View>
                  )}
                  {/* Tap block */}

                  <View style={{}}>
                    {cipherView ? (
                      <GestureDetector gesture={longPress}>
                        <Animated.View style={{alignSelf: 'center'}}>
                          {pressedGes.map(tap => {
                            translateY.value = tap.y;
                            return (
                              <TapText
                                key={tap.id}
                                x={tap.x}
                                y={tap.y}
                                removing={tap.removing}
                                plusTap={numberIncrement}
                                cipherView={cipherView}
                                longPress={longerPressed.value}
                              />
                            );
                          })}
                          <Image source={CipherImg} style={styles.roundImg} />
                        </Animated.View>
                      </GestureDetector>
                    ) : (
                      <GestureDetector gesture={tap}>
                        <Animated.View style={{alignSelf: 'center'}}>
                          {taps.map(tap => {
                            translateY.value = tap.y;
                            return (
                              <TapText
                                key={tap.id}
                                x={tap.x}
                                y={tap.y}
                                removing={tap.removing}
                                plusTap={numberIncrement}
                                cipherView={false}
                              />
                            );
                          })}
                          <Image source={RoundImg} style={styles.roundImg} />
                        </Animated.View>
                      </GestureDetector>
                    )}
                  </View>
                  {/* Booster block */}
                  <View style={styles.boost}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={Powermage}
                        style={{width: 40, height: 40}}
                      />
                      <Text
                        style={[
                          styles.title,
                          {marginLeft: 5, fontWeight: '600'},
                        ]}>
                        {powerCount}/{energy}
                      </Text>
                    </View>

                    <Pressable
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      onPress={() => props.setShowBoostView(true)}>
                      <Image
                        source={BoostImage}
                        style={{width: 40, height: 40}}
                      />
                      <Text
                        style={[
                          styles.title,
                          {marginLeft: 10, fontWeight: '600'},
                        ]}>
                        Boost
                      </Text>
                    </Pressable>
                  </View>
                </ScrollView>
              </View>
            </Shadow>
          </View>
        </>
      ) : (
        <BoostScreen
          countBalance={count}
          setPowerCount={setPowerCount}
          closeBottomTab={props.closeBottomTab}
          closeScreen={() => {
            props.setShowBoostView(false);
          }}
          numberIncrement={numberIncrement}
          setNumberIncrement={setNumberIncrement}
          energy={energy}
          setEnergy={setEnergy}
          setCount={setCount}
          task={task}
          claimed={claimed}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 86,

    backgroundColor: '#000000',
  },
  title: {
    color: '#E9E9E7',
  },
  selectedView: {
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    width: 60,
    height: 55,
  },
  footerText: {color: '#E9E9E7', fontSize: 10},
  rewardStyle: {
    width: 110,
    height: 90,
    backgroundColor: '#5b9362',
    borderTopWidth: 1,

    borderWidth: 0.6,

    borderColor: '#5B9362',
    top: 20,
    borderRadius: 10,
    marginRight: 20,
    alignItems: 'center',
    shadowColor: '#5B9362',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  card: {
    width: 108.7,
    height: 90,
    backgroundColor: '#272A2F',
    top: 0.3,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#272A2f',
    shadowOffset: {width: 0, height: 0},
  },
  shadow: {
    // height: '7%',
    // backgroundColor: '#E9BA48',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // top: '22.4%',
    // width: '98%',
    // shadowColor: '#E9BA48',
    // shadowOffset: {width: 0, height: -16},
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // left: 2.2,
    height: '20%',
    backgroundColor: '#E9BA48',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    top: '2.7%',
    width: '99.5%',
    alignSelf: 'center',
    position: 'absolute',
    // height: '86.6%',
    // backgroundColor: '#E9BA48',
    // borderTopLeftRadius: 23,
    // borderTopRightRadius: 23,
    // // top: '22.4%',
    // elevation: 10,
    // width: '98.8%',
    // shadowColor: '#E9BA48',
    // shadowOffset: {width: 0, height: -16},
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    // top: -1.3,
    // position: 'absolute',
  },
  box: {
    width: 5,
    height: 5,
    backgroundColor: '#FEFFFF',
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  circle: {},
  viewContainer: {
    backgroundColor: '#272A2F',
    borderRadius: 20,
    width: '85%',
    height: 65,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-evenly',
  },
  boost: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: 40,
    // marginBottom: 10,
    // width: '90%',
    // backgroundColor:'red',

    width: '90%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',

    padding: 5,
    marginTop: 40,
  },
  animatedText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '800',
    zIndex: 1,
    position: 'absolute',
  },
  roundImg: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    top: 20,
  },
  shadowBlock: {
    // height: '94%',
    // width: '100%',
    // alignItems: 'center',
    position: 'absolute',
    height: '100%',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
    bottom: 0,
    right: 0,
    left: 0,
  },
  view: {
    // height: '97%',
    // backgroundColor: '#1D1F24',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // top: '3%',

    // height: '90%',
    // width: '100%',
    // backgroundColor: '#1D1F24',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // alignItems: 'center',
    height: '98%',
    width: Dimensions.get('window').width,
    backgroundColor: '#1D1F24',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: '3%',

    paddingVertical: 20,
  },

  block: {
    backgroundColor: '#3A372B',
    width: '55%',
    height: 40,
    borderRadius: 20,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 20,
    marginBottom: 30,
  },
  cipherReward: {
    width: '90%',
    height: 45,
    backgroundColor: '#272A2F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
  },
});

export default Home;
