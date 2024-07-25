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
} from 'react-native';
import {
  ActiveChevronImg,
  CalendarImg,
  CalendarWithBg,
  Check,
  CoinImgTwo,
  EarnCoin,
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
import {FlatList} from 'react-native-gesture-handler';
import {format, isToday} from 'date-fns';
import ConfettiCannon from 'react-native-confetti-cannon';

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
  const handleReward = () => {
    setShowModal(true);
    props.closeBottomTab(true);
  };

  const getNextTenDays = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 10; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      console.log(new Date(futureDate), '=========');
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
  console.log(getNextTenDays(), 'nmmmmmmm');

  const handleDayPress = (numDays, index: number) => {
    // console.log(index, numDays);

    // if (index === 0) {
    //   return;
    // } else {
    //   setSelected(numDays);
    //   setShowText(!showText)
    // }
    if (selected.includes(numDays)) {
      setSelected(selected.filter(item => item !== numDays));
    } else {
      setSelected([...selected, numDays]);
    }
  };
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      {showToast && (
        <View
          style={{
            backgroundColor: '#242529',
            width: '90%',
            height: 30,
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
          <Text style={{fontSize: 10, color: 'white', marginLeft: 5}}>
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
        <View style={{height: '95%'}}>
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
                passed
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
            <View style={{alignItems: 'center', top: 50}}>
              {/* <Text>Helllo</Text> */}
              <View style={styles.imageView}>
                <Image
                  source={CalendarWithBg}
                  style={{width: 100, height: 100}}
                />
              </View>
              <View style={{marginTop: '20%'}} />
              <Text style={{color: 'white', fontWeight: '600', fontSize: 23}}>
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
              <FlatList
                data={tenDaysDate}
                // horizontal
                numColumns={4}
                style={{marginTop: 20, height: '50%'}}
                contentContainerStyle={{
                  paddingBottom: '20%',
                }}
                renderItem={({item: {date, futureDate, numDays}, index}) => {
                  return (
                    <Pressable
                      style={[
                        styles.backgroundViewStyle,
                        isToday(futureDate) && {
                          borderColor: '#5B9362',
                          borderWidth: 1,
                        },
                      ]}
                      onPress={() => handleDayPress(numDays, index)}>
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontWeight: 700,
                        }}>
                        Day {num[index]}
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
                        source={EarnCoin}
                        style={{width: 35, height: 35, alignSelf: 'center'}}
                      />
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontWeight: 700,
                        }}>
                        {numbers[index]}
                      </Text>
                    </Pressable>
                  );
                }}
                // style={{width:350,}}
              />
              <Pressable
                style={[styles.pressable, {width: '90%'}]}
                onPress={() => {
                  if (showModal) {
                    setShowModal(false);
                    props.closeBottomTab(false);
                  } else {
                    props.closeScreen(false);
                  }
                  setShowConfetti(true);
                  setShowToast(true);
                }}>
                <Text style={styles.text}>Claim</Text>
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
    backgroundColor: '#5a5fff',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
  },
  copyBtn: {
    backgroundColor: '#5a5fff',
    width: '17%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
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
  },
  backgroundViewStyle: {
    marginTop: 35,
    backgroundColor: '#272A2F',
    marginLeft: 6,
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
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
});

export default EarnScreen;
