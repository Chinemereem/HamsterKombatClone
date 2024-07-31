import React, {SetStateAction, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
  SafeAreaView,
  Pressable,
  Image,
  View,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  ActiveChevronImg,
  CalendarImg,
  CalendarWithBg,
  Check,
  CloseImg,
  CoinImgTwo,
  EarnCoin,
  EarnCoin2,
  EarnHamsImg,
  GlowCoinImgTwo,
  InviteImg,
  LeftChevronImg,
  More,
  TelegramImg,
  XImg,
  YoutubeImg,
  back,
  downChevron,
  speechBubble,
} from '../../assets/images';
import BackgroundButton from './common/Button';
import Modal from './common/Modal';

import {format, isToday} from 'date-fns';
import ConfettiCannon from 'react-native-confetti-cannon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getConsecutiveDates,
  getLastClaimTime,
  getNextClaimTime,
  storeConsecutiveDates,
  storeLastClaimTime,
} from './functions';
import {Shadow} from 'react-native-shadow-2';

interface Props {
  style?: ViewStyle;
  closeScreen: any;
  closeBottomTab: SetStateAction<any>;
  noBottomModal?: boolean;
  // Define your props here
}
const EarnScreen: React.FC<Props> = props => {
  // const screenHeight = Dimensions.get('window').height / 1.3;

  const [showToast, setShowToast] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [task, setTask] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rewardToClaim, setRewardToClaim] = useState(0);
  const [claimedReward, setClaimedReward] = useState(false);
  const [nextClaimTime, setNextClaimTime] = useState(null);
  const [consecutiveDates, setConsecutiveDates] = useState([]);

  const getData = (data: any) => {
    return data;
  };
  const handleReward = () => {
    setShowModal(true);
    props.closeBottomTab(true);
  };
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const savedCoinCoutn = await AsyncStorage.getItem('ceo-coins');
        const number = JSON.parse(savedCoinCoutn);
        setCount(number.count);
        setTask(number.task);
        setClaimed(number.claimed);
        getData(number);
      } catch (err) {}
    };
    const fetchConsecutiveDates = async () => {
      const dates = await getConsecutiveDates();
      setConsecutiveDates(dates);
    };
    // Call the fetchCoins function when the component mounts
    fetchCoins();
    fetchConsecutiveDates();
  }, []);

  useEffect(() => {
    const fetchNextClaimTime = async () => {
      const nextTime = await getNextClaimTime();
      console.log(nextTime, 'nextTime===');
      setNextClaimTime(nextTime);
    };

    fetchNextClaimTime();
  }, []);

  const getNextTenDays = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 10; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      const formattedDate = format(futureDate, 'MMMM, dd, yyy');
      // numDays.push(i);

      dates.push({date: formattedDate, futureDate: futureDate, numDays: i});
    }

    return dates;
  };
  const num = [];
  for (let i = 1; i <= 11; i += 1) {
    num.push(i);
  }
  const numbers = [];
  for (let i = 500; i <= 5000; i += 500) {
    numbers.push(i);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showConfetti]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showToast]);
  const tenDaysDate = getNextTenDays();

  const mappedDates = tenDaysDate.map(({date, futureDate, numDays}, index) => {
    const todaysClaim = isToday(futureDate);
    return {todaysClaim, index};
  });

  const todatsIndex = mappedDates.findIndex(item => item.todaysClaim);
  const tc = tenDaysDate.find(({futureDate}) => isToday(futureDate));

  const renderItems = () => {
    const rows = [];
    for (let i = 0; i < tenDaysDate.length; i += 4) {
      const rowItems = tenDaysDate.slice(i, i + 4);
      rows.push(
        <View key={i} style={styles.row}>
          {rowItems.map(({date, futureDate, numDays}, index) => {
            const rewardIndex = numbers[i + index];
            return (
              <Pressable
                style={[
                  styles.backgroundViewStyle,
                  isToday(futureDate) && {
                    borderColor: '#5B9362',
                    borderWidth: 1,
                    backgroundColor: nextClaimTime ? '#4CAB56' : '#272A2F',
                    opacity: 1,
                  },
                ]}
                key={index}
                onPress={() =>
                  handleDayPress(numDays, index, rewardIndex, futureDate)
                }>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 700,
                  }}>
                  Day {num[i + index]}
                </Text>
                {selected.includes(numDays) && (
                  <View style={styles.position}>
                    <ImageBackground
                      source={speechBubble}
                      resizeMode="cover"
                      style={styles.image}>
                      <Text style={styles.bubbleText}>{date}</Text>
                    </ImageBackground>
                  </View>
                )}
                <Image
                  source={
                    nextClaimTime && isToday(futureDate) ? EarnCoin2 : EarnCoin
                  }
                  style={{width: 35, height: 35, alignSelf: 'center'}}
                />
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 700,
                  }}>
                  {rewardIndex}
                </Text>
              </Pressable>
            );
          })}
        </View>,
      );
    }
    return rows;
  };

  const handleDayPress = (numDays, index: number, rewardIndex, futureDate) => {
    if (selected.includes(numDays)) {
      setSelected(selected.filter(item => item !== numDays));
    } else {
      setSelected([...selected, numDays]);
    }
  };

  const saveToLocalStorage = async (items: any) => {
    AsyncStorage.setItem('ceo-coins', JSON.stringify(items));
  };

  const handleClaimed = async () => {
    setLoading(true);
    const lastClaimTime = await getLastClaimTime();
    const currentTime = new Date().getTime();
    let daysSinceLastClaim = 0;
    if (lastClaimTime) {
      daysSinceLastClaim = Math.floor(
        (currentTime - lastClaimTime) / (24 * 60 * 60 * 1000),
      );
    }
    let claimedDates = await getConsecutiveDates();
    const nextTenDays = getNextTenDays();
    if (daysSinceLastClaim > 1 || claimedDates.length === 0) {
      // Reset if more than one day has passed since last claim or no dates stored
      claimedDates = [nextTenDays[0]];
      await storeConsecutiveDates(claimedDates);
      setConsecutiveDates(claimedDates);
      await storeLastClaimTime();
    } else {
      // Increment claimed days
      const nextClaimDate = nextTenDays[claimedDates.length];
      claimedDates.push(nextClaimDate.futureDate.toISOString());
      if (claimedDates.length > 10) {
        claimedDates.shift(); // Keep only the last 10 days
      }
      await storeConsecutiveDates(claimedDates);
      setConsecutiveDates(claimedDates);
      await storeLastClaimTime();
    }
    const nextTime = await getNextClaimTime();
    setNextClaimTime(nextTime);
    await saveToLocalStorage({
      count: count + numbers[todatsIndex],
      task: task + 1,
      claimed: true,
    });
    if (showModal) {
      setShowModal(false);
      props.closeBottomTab(false);
    } else {
      props.closeScreen(false);
    }
    setShowConfetti(true);
    setShowToast(true);
    setLoading(false);
    // setLoading(true);
    // try {
    //   if (tc) {
    //     await storeLastClaimTime();
    //     const nextTime = await getNextClaimTime();
    //     setNextClaimTime(nextTime);

    //     await saveToLocalStorage({
    //       count: count + numbers[todatsIndex],
    //       task: task + 1,
    //       claimed: true,
    //     });
    //     setRewardToClaim(count + numbers[todatsIndex]);
    //     setClaimedReward(true);
    //     if (showModal) {
    //       setShowModal(false);
    //       props.closeBottomTab(false);
    //     } else {
    //       props.closeScreen(false);
    //     }
    //     setShowConfetti(true);
    //     setShowToast(true);
    //   }
    // } catch {
    // } finally {
    //   setLoading(false);
    // }
  };
  const isDissabled = !nextClaimTime ? false : true;
  return (
    <SafeAreaView style={[styles.container, props.style]}>
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
            top: '15%',

            bottom: 0,
            zIndex: 20,
          }}>
          <Image source={Check} style={{alignSelf: 'center'}} />
          <Text
            style={{
              fontSize: 10,
              color: 'white',
              marginLeft: 5,
              alignSelf: 'center',
            }}>
            Success
          </Text>
        </View>
      )}
      <View style={{paddingHorizontal: 12}}>
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
        {/* Image block */}
        <View style={{paddingBottom: 40}}>
          <ScrollView
            style={{paddingBottom: 40}}
            showsVerticalScrollIndicator={false}>
            <View style={{height: 900}}>
              <View
                style={[{marginTop: 5, height: 150, justifyContent: 'center'}]}>
                <Image
                  source={GlowCoinImgTwo}
                  style={[{alignSelf: 'center', width: '60%', height: '100%'}]}
                />
              </View>
              <View style={{alignSelf: 'center', bottom: 10}}>
                <Text style={styles.Earnheader}>Earn More Coins</Text>
              </View>
              <View style={{marginBottom: 15, marginTop: 20}}>
                <Text style={styles.text}>Hamster Youtube </Text>
              </View>
              {/* Taxk Block */}
              <BackgroundButton
                source={YoutubeImg}
                taskImgSource={{width: 50, height: 35, alignSelf: 'center'}}
                alignedView={{alignSelf: 'center', width: '76%'}}
                taskTitle="Who is Satoshi Nakamoto? The creator of Bitcoin?"
                viewDirection={{flexDirection: 'row', marginTop: 2}}
                coinImgTwo={CoinImgTwo}
                coinImgTwoStyle={{width: 25, height: 25}}
                rewardAmount="+100,000"
                chevronViewStyle={styles.chevStyle}
                activeChevronImgSource={ActiveChevronImg}
                activeChevronImgSourceStyle={{width: 16, height: 16}}
                leftChevronImg={LeftChevronImg}
                leftChevronImgStyle={{width: 30, height: 30}}
              />
              <View style={{marginBottom: 15, marginTop: 15}}>
                <Text style={styles.text}>Daily Task</Text>
              </View>
              <BackgroundButton
                aligned={{height: 80}}
                onPress={handleReward}
                source={CalendarImg}
                taskImgSource={{width: 50, height: 50, alignSelf: 'center'}}
                alignedView={{alignSelf: 'center', width: '76%'}}
                taskTitle="Daily Reward"
                viewDirection={{flexDirection: 'row', marginTop: 2}}
                coinImgTwo={CoinImgTwo}
                coinImgTwoStyle={{width: 25, height: 25}}
                rewardAmount="+6,649,000"
                chevronViewStyle={styles.chevStyle2}
                activeChevronImgSource={ActiveChevronImg}
                activeChevronImgSourceStyle={{width: 16, height: 16}}
                leftChevronImg={LeftChevronImg}
                leftChevronImgStyle={{width: 30, height: 30}}
                passed={nextClaimTime}
              />
              {/* Task List */}
              <View style={{marginTop: 20}}>
                <Text style={styles.text}>Task List</Text>
              </View>
              <BackgroundButton
                aligned={{height: 80, marginTop: 10}}
                onPress={handleReward}
                source={TelegramImg}
                taskImgSource={{width: 50, height: 50, alignSelf: 'center'}}
                alignedView={{alignSelf: 'center', width: '76%'}}
                taskTitle="Join our TG channel"
                viewDirection={{flexDirection: 'row', marginTop: 2}}
                coinImgTwo={CoinImgTwo}
                coinImgTwoStyle={{width: 25, height: 25}}
                rewardAmount="+5,000"
                chevronViewStyle={styles.chevStyle3}
                activeChevronImgSource={ActiveChevronImg}
                activeChevronImgSourceStyle={{width: 16, height: 16}}
                leftChevronImg={LeftChevronImg}
                leftChevronImgStyle={{width: 30, height: 30}}
              />
              <BackgroundButton
                aligned={{height: 80, marginTop: 10}}
                // onPress={handleReward}
                source={XImg}
                taskImgSource={{width: 50, height: 50, alignSelf: 'center'}}
                alignedView={{alignSelf: 'center', width: '76%'}}
                taskTitle="Join our TG channel"
                viewDirection={{flexDirection: 'row', marginTop: 2}}
                coinImgTwo={CoinImgTwo}
                coinImgTwoStyle={{width: 25, height: 25}}
                rewardAmount="+5,000"
                chevronViewStyle={styles.chevStyle2}
                activeChevronImgSource={ActiveChevronImg}
                activeChevronImgSourceStyle={{width: 16, height: 16}}
                leftChevronImg={LeftChevronImg}
                leftChevronImgStyle={{width: 30, height: 30}}
              />

              <BackgroundButton
                aligned={{height: 80, marginTop: 10}}
                // onPress={handleReward}
                source={EarnHamsImg}
                taskImgSource={{width: 50, height: 50, alignSelf: 'center'}}
                alignedView={{alignSelf: 'center', width: '76%'}}
                taskTitle="Choose your exchange"
                viewDirection={{flexDirection: 'row', marginTop: 2}}
                coinImgTwo={CoinImgTwo}
                coinImgTwoStyle={{width: 25, height: 25}}
                rewardAmount="+5,000"
                chevronViewStyle={styles.chevStyle2}
                activeChevronImgSource={ActiveChevronImg}
                activeChevronImgSourceStyle={{width: 16, height: 16}}
                leftChevronImg={LeftChevronImg}
                leftChevronImgStyle={{width: 30, height: 30}}
              />
              <BackgroundButton
                aligned={{height: 80, marginTop: 10}}
                // onPress={handleReward}
                source={InviteImg}
                taskImgSource={{width: 50, height: 50, alignSelf: 'center'}}
                alignedView={{alignSelf: 'center', width: '76%'}}
                taskTitle="Invite 3 Friends"
                viewDirection={{flexDirection: 'row', marginTop: 2}}
                coinImgTwo={CoinImgTwo}
                coinImgTwoStyle={{width: 25, height: 25}}
                rewardAmount="+5,000"
                chevronViewStyle={styles.chevStyle2}
                activeChevronImgSource={ActiveChevronImg}
                activeChevronImgSourceStyle={{width: 16, height: 16}}
                leftChevronImg={LeftChevronImg}
                leftChevronImgStyle={{width: 30, height: 30}}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      {showModal && (
        <Modal
          children={
            <View style={{alignItems: 'center'}}>
              <ScrollView
                style={{height: '80%', paddingBottom: 80, width: '100%'}}
                showsVerticalScrollIndicator={false}>
                {/* <Text>Helllo</Text> */}
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: 10,
                    flexDirection: 'row',
                  }}>
                  <Shadow distance={15} startColor={'#3A2459'} offset={[0, 4]}>
                    <View
                      style={{
                        borderTopStartRadius: 24,
                        borderBottomEndRadius: 0,
                        borderRadius: 10,
                      }}>
                      <Image
                        source={CalendarWithBg}
                        style={{width: 100, height: 100}}
                      />
                    </View>
                  </Shadow>
                  <Pressable
                    style={{left: 120}}
                    onPress={() => {
                      if (showModal) {
                        setShowModal(false);
                        props.closeBottomTab(false);
                      } else {
                        props.closeScreen(false);
                      }
                    }}>
                    <Image source={CloseImg} style={{width: 25, height: 24}} />
                  </Pressable>
                </View>

                <View style={{marginTop: '10%'}} />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 23,
                    textAlign: 'center',
                  }}>
                  Daily reward
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    textAlign: 'center',
                    top: 10,
                  }}>
                  Accrue coins for logging into the game daily {'\n'} without
                  skipping
                </Text>

                {renderItems()}
              </ScrollView>
              <Pressable
                style={[
                  styles.pressable,
                  {
                    width: '90%',
                    backgroundColor: nextClaimTime ? '#444547' : '#5a5fff',
                  },
                ]}
                disabled={isDissabled}
                onPress={handleClaimed}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.text}>
                    {nextClaimTime ? 'Come back Tomorrow' : 'Claim'}
                  </Text>
                )}
              </Pressable>
            </View>
          }
        />
      )}
      {showConfetti && <ConfettiCannon count={200} origin={{x: -10, y: 0}} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 86,
    backgroundColor: '#000000',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '700',
  },
  header: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '800',
    marginTop: 25,
  },
  Earnheader: {
    color: 'white',
    fontSize: 27,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '800',
    lineHeight: 27,
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    justifyContent: 'space-between',
  },
  firstRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    width: '50%',
    alignItems: 'center',
  },
  noAlign: {
    backgroundColor: '#272A2F',
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    backgroundColor: '#F5C822',
    height: 7,
    width: 7,
    borderRadius: 10,
    alignSelf: 'center',
    marginRight: 4,
  },
  purple: {
    color: '#5B5FF4',
    fontSize: 18,
    fontWeight: '700',
  },
  text: {
    color: 'white',

    fontWeight: '700',
  },
  pressable: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    bottom: 30,
  },
  copyBtn: {
    backgroundColor: '#5a5fff',
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    padding: 16,
    backgroundColor: '#ddd',
  },
  shadow: {
    backgroundColor: '#040300',
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#E9BA48',
    shadowOffset: {width: 0, height: 26},
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  chevStyle: {
    width: '5%',
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevStyle2: {
    width: '5%',
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
  },
  chevStyle3: {
    width: '5%',
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
  },
  imageView: {
    height: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F2A7D',
    shadowOffset: {width: 5, height: 1},
    shadowOpacity: 3,
    shadowRadius: 10,
    marginTop: 60,
  },
  backgroundViewStyle: {
    marginTop: 35,
    marginLeft: 6,
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: '#272A2F',
    opacity: 0.4,
  },
  position: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: -25,
  },
  image: {
    width: 72,
    height: 40,
    alignSelf: 'center',
    paddingVertical: 3,
  },
  bubbleText: {
    color: 'white',
    fontSize: 9,
    alignSelf: 'center',
    textAlign: 'center',
    top: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: '#4F4220',
    borderRadius: 8,

    width: 400,
    height: 30,
  },
  elevation: {
    shadowColor: '#E9BA48',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    top: 30,
    elevation: 24,
  },
});

export default EarnScreen;
