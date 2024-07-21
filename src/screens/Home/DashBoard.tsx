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
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TapText} from './common/Texts';
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
  const opacity = useSharedValue(1);
  const touched = useSharedValue<boolean>(false);
  const [numberIncrement, setNumberIncrement] = useState(1);
  const [powerCount, setPowerCount] = useState(1000);
  const [taps, setTaps] = useState<never[]>([]);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const [claimed, setClaimed] = useState(false);
  const [cypherClaimed, setCypherClaimed] = useState(false);
  const [comboClaimed, setComboClaimed] = useState(false);
  const translateY = useSharedValue(0);
  // const opacity = useSharedValue(0);
  const myFunction = () => {
    setCount(count + numberIncrement);
    saveToLocalStorage({count: count, task: task, claimed: claimed});
    if (powerCount <= 1) {
      return;
    } else {
      setPowerCount(powerCount - 3);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setPowerCount(prevNumber => {
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
  const storeLastClaimTime = async () => {
    try {
      const currentTime = new Date().getTime();
      await AsyncStorage.setItem('lastClaimTime', currentTime.toString());
    } catch (error) {
      console.error('Error storing last claim time:', error);
    }
  };
  const getLastClaimTime = async () => {
    try {
      const lastClaimTime = await AsyncStorage.getItem('lastClaimTime');
      return lastClaimTime ? parseInt(lastClaimTime, 10) : null;
    } catch (error) {
      console.error('Error retrieving last claim time:', error);
      return null;
    }
  };
  const getNextClaimTime = async () => {
    const lastClaimTime = await getLastClaimTime();
    if (!lastClaimTime) {
      return null;
    }

    const nextClaimTime = new Date(lastClaimTime + 24 * 60 * 60 * 1000); // 24 hours later
    return nextClaimTime;
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
    }, 1000);
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

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const savedCoinCoutn = await AsyncStorage.getItem('ceo-coins');
        const number = JSON.parse(savedCoinCoutn);
        setCount(number.count);
        setTask(number.task);
        setClaimed(number.claimed);
      } catch (err) {}
    };

    // Call the fetchCoins function when the component mounts
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
    if (!nextClaimTime) {
      await storeLastClaimTime();
      const nextTime = await getNextClaimTime();
      setNextClaimTime(nextTime);
      setCount(count + 500);
      setClaimed(true);
      if (task === 11) {
        return;
      } else {
        console.log('000000');
        setTask(task + 1);
        saveToLocalStorage({count: count, task: task, claimed: claimed});
      }
    }
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
      <View style={styles.view}>
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
                claimed
                  ? styles.rewardStyle
                  : {
                      alignItems: 'center',
                      top: 20,
                      marginRight: 20,
                    }
              }>
              <Pressable style={styles.card} onPress={handleClaimReward}>
                <View style={{top: 10}}>
                  <View style={{width: 100, bottom: 5}}>
                    <Animated.View
                      style={[!claimed && styles.box, animatedStyle]}
                    />
                    <Image
                      source={rewardImage}
                      style={{width: 40, height: 40, alignSelf: 'center'}}
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
                    style={{color: 'white', fontSize: 10, textAlign: 'center'}}>
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
              <View style={styles.card}>
                <View style={{top: 10}}>
                  <View style={{width: 100, bottom: 5}}>
                    <Animated.View
                      style={[!cypherClaimed && styles.box, animatedStyle]}
                    />
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
                    <Animated.View
                      style={[!comboClaimed && styles.box, animatedStyle]}
                    />
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

          <View style={{backgroundColor: 'red'}}>
            <GestureDetector gesture={tap}>
              <Animated.View
                style={{alignSelf: 'center', backgroundColor: 'red'}}>
                {taps.map(tap => {
                  translateY.value = tap.y;
                  return (
                    <TapText
                      key={tap.id}
                      x={tap.x}
                      y={tap.y}
                      removing={tap.removing}
                      plusTap={numberIncrement}
                    />
                  );
                })}
                <Image source={RoundImg} style={styles.roundImg} />
              </Animated.View>
            </GestureDetector>
          </View>
          {/* Booster block */}
          <View style={styles.boost}>
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
    height: '7%',
    backgroundColor: '#E9BA48',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: '22.4%',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    marginBottom: 10,
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
  view: {
    height: '97%',
    backgroundColor: '#1D1F24',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: '3%',
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
  },
});

export default DashBoard;
