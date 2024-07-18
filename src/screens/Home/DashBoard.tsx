import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  Pressable,
} from 'react-native';
import {
  AirdropImg,
  BoostImage,
  CoinImg,
  EarnImage,
  FriendsImg,
  HammerPressed,
  HammerUnPressed,
  Hams,
  HamsterCutoff,
  HamsterUserIcon,
  Powermage,
  PressedEarnImage,
  PressedHams,
  RoundImg,
  SelectedAirdropImg,
  SelectedFriendsImg,
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
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {
  // Define your props here
}

const DashBoard: React.FC<Props> = props => {
  const [count, setCount] = useState(0);
  const [pressed, setPressed] = useState('exchange');
  const [profit, setProfit] = useState(0);
  const [newDayReward, setNewDayReward] = useState(false);
  const [level, setLevel] = useState('Bronze');
  const [levelCount, setLevelCount] = useState(1);
  const [task, setTask] = useState(1);
  const scale = useSharedValue(1);
  const color = useSharedValue(0);
  const opacity = useSharedValue(1);
  const touched = useSharedValue<boolean>(false);
  const [numberIncrement, setNumberIncrement] = useState(1);
  const [removingText, setRemovingText] = useState(false);
  const [powerCount, setPowerCount] = useState(1000);
  const [taps, setTaps] = useState([]);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const myFunction = () => {
    setCount(count + numberIncrement);
    saveToLocalStorage(count);
    if (powerCount <= 1) {
      return;
    } else {
      setPowerCount(powerCount - 3);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setPowerCount(prevNumber => {
        console.log(prevNumber < 1000)
        if (prevNumber < 1000) {
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
  const getTaps = event => {
    const newTap = {x: event.x, y: event.y, id: Math.random()};
    setTaps(prevTaps => [...prevTaps, newTap]);
  };
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const savedCoinCoutn = await AsyncStorage.getItem('ceo-coins');
        const number = JSON.parse(savedCoinCoutn);
        setCount(number);
        console.log(savedCoinCoutn, '=========');
      } catch (err) {}
    };

    // Call the fetchCoins function when the component mounts
    fetchCoins();
  }, []);
  console.log(count, 'cccccc');
  useEffect(() => {
    if (taps.length > 0) {
      const timer = setTimeout(() => {
        setTaps(prevTaps => prevTaps.slice(1));
        setRemovingText(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [taps]);
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

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: x.value}, {translateY: y.value}],
    };
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
  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: touched.value ? '#FFE04B' : '#B58DF1',
    transform: [{scale: withTiming(touched.value ? 1.2 : 1)}],
  }));
  const saveToLocalStorage = async (items: any) => {
    AsyncStorage.setItem('ceo-coins', JSON.stringify(items));
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>DashBoard</Text> */}
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
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontWeight: '700', color: '#F1EEE5'}}>{level}</Text>
              <Text style={{fontWeight: '700', color: '#fff'}}>
                {levelCount}
                <Text style={{fontWeight: '700', color: '#67645D'}}>/ 11</Text>
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
          <View
            style={{
              backgroundColor: '#3A372B',
              width: '55%',
              height: 40,
              borderRadius: 20,
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginLeft: 20,
            }}>
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
                  style={{color: '#fff', fontSize: 10, alignSelf: 'center'}}>
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

      <View style={styles.shadow} />
      <View
        style={{
          height: '97%',
          backgroundColor: '#1D1F24',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          top: '3%',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 30,
              marginLeft: 15,
              marginRight: 10,
            }}>
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
              <Pressable
                style={styles.card}
                onPress={() => {
                  if (task === 11) {
                    return;
                  } else {
                    setTask(task + 1);
                  }
                }}>
                <View style={{top: 10}}>
                  <View style={{width: 100, bottom: 5}}>
                    <Animated.View style={[styles.box, animatedStyle]} />
                    <Image
                      source={rewardImage}
                      style={{width: 40, height: 40, alignSelf: 'center'}}
                    />
                  </View>
                  <Text
                    style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
                    Daily Reward
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
                    <Animated.View style={[styles.box, animatedStyle]} />
                    <Image
                      source={cypherImage}
                      style={{width: 40, height: 40, alignSelf: 'center'}}
                    />
                  </View>
                  <Text
                    style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
                    Daily Cipher
                  </Text>
                </View>
              </View>
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
                    <Animated.View style={[styles.box, animatedStyle]} />
                    <Image
                      source={comboImage}
                      style={{width: 40, height: 40, alignSelf: 'center'}}
                    />
                  </View>
                  <Text
                    style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
                    Daily Combo
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{alignSelf: 'center', flexDirection: 'row'}}>
            <Image source={CoinImg} style={{width: 50, height: 50}} />
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                {count}
              </Text>
            </View>
          </View>
          {/* Tap block */}
          {touched.value && (
            <View
              style={{
                alignSelf: 'center',
                bottom: 0,
                zIndex: 4,
                position: 'absolute',
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                {numberIncrement}
              </Text>
            </View>
          )}
          <View style={{backgroundColor: 'red'}}>
            <GestureDetector gesture={tap}>
              <Animated.View
                style={{alignSelf: 'center', backgroundColor: 'red'}}>
                {/* <Animated.Text
                style={[
                  {color: 'white', fontSize: 16, fontWeight: '600', zIndex: 4},
                  animatedTextStyle,
                ]}>
                Tap here
              </Animated.Text> */}
                {taps.map(tap => (
                  <Animated.Text
                    key={tap.id}
                    style={[
                      {
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '600',
                        zIndex: 1,
                        position: 'absolute',
                      },
                      {left: tap.x, top: tap.y},
                    ]}>
                    +1
                  </Animated.Text>
                ))}
                <Image
                  source={RoundImg}
                  style={{
                    width: 250,
                    height: 250,
                    alignSelf: 'center',
                    top: 20,
                  }}
                />
              </Animated.View>
            </GestureDetector>
          </View>
          {/* Booster block */}
          <View
            style={{
              // marginLeft: 25,

              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 40,
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Powermage} style={{width: 40, height: 40}} />
              <Text style={[styles.title, {marginLeft: 5, fontWeight: '600'}]}>
                {powerCount}/1000
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={BoostImage} style={{width: 30, height: 30}} />
              <Text style={[styles.title, {marginLeft: 10, fontWeight: '600'}]}>
                Boost
              </Text>
            </View>
          </View>
          {/* footer block */}
          <View
            style={{
              backgroundColor: '#272A2F',
              borderRadius: 20,
              width: '85%',
              height: 65,
              alignSelf: 'center',
              flexDirection: 'row',
              padding: 5,
              justifyContent: 'space-evenly',
            }}>
            <Pressable
              style={[
                styles.selectedView,
                {
                  backgroundColor:
                    pressed === 'exchange' ? '#1D1F24' : '#272A2F',
                },
              ]}
              onPress={() => setPressed('exchange')}>
              {pressed === 'exchange' ? (
                <Image source={HamsterCutoff} style={{width: 30, height: 30}} />
              ) : (
                <Image source={PressedHams} style={{width: 26, height: 26}} />
              )}
              <Text style={styles.footerText}>Exchange</Text>
            </Pressable>
            <Pressable
              style={[
                styles.selectedView,
                {backgroundColor: pressed === 'mine' ? '#1D1F24' : '#272A2F'},
              ]}
              onPress={() => setPressed('mine')}>
              {pressed === 'mine' ? (
                <Image source={HammerPressed} style={{width: 29, height: 29}} />
              ) : (
                <Image
                  source={HammerUnPressed}
                  style={{width: 30, height: 30}}
                />
              )}
              <Text style={styles.footerText}>Mine</Text>
            </Pressable>
            <Pressable
              style={[
                styles.selectedView,
                {
                  backgroundColor:
                    pressed === 'friends' ? '#1D1F24' : '#272A2F',
                },
              ]}
              onPress={() => setPressed('friends')}>
              {pressed === 'friends' ? (
                <Image
                  source={SelectedFriendsImg}
                  style={{width: 30, height: 30}}
                />
              ) : (
                <Image source={FriendsImg} style={{width: 29, height: 29}} />
              )}
              <Text style={styles.footerText}>Friends</Text>
            </Pressable>
            <Pressable
              style={[
                styles.selectedView,
                {backgroundColor: pressed === 'earn' ? '#1D1F24' : '#272A2F'},
              ]}
              onPress={() => setPressed('earn')}>
              {pressed === 'earn' ? (
                <Image
                  source={PressedEarnImage}
                  style={{width: 33, height: 29}}
                />
              ) : (
                <Image source={EarnImage} style={{width: 30, height: 30}} />
              )}
              <Text style={styles.footerText}>Earn</Text>
            </Pressable>
            <Pressable
              style={[
                styles.selectedView,
                {
                  backgroundColor:
                    pressed === 'airdrop' ? '#1D1F24' : '#272A2F',
                },
              ]}
              onPress={() => setPressed('airdrop')}>
              {pressed === 'airdrop' ? (
                <Image
                  source={SelectedAirdropImg}
                  style={{width: 29, height: 29}}
                />
              ) : (
                <Image source={AirdropImg} style={{width: 27, height: 27}} />
              )}
              <Text style={styles.footerText}>Exchange</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
    backgroundColor: 'transparent',
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
    height: '7%',
    backgroundColor: '#E9BA48',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: '21.1%',
    width: '98%',
    shadowColor: '#E9BA48',
    shadowOffset: {width: 0, height: -16},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    left: 2.2,
    position: 'absolute',
  },
  box: {
    width: 5,
    height: 5,
    backgroundColor: '#FEFFFF',
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  circle: {},
});

export default DashBoard;
