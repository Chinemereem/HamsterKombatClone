import React, {useState} from 'react';
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
} from 'react-native';
import {
  ActiveChevronImg,
  CalendarImg,
  CoinImgTwo,
  Copy,
  EarnHamsImg,
  GiftImgOne,
  GlowCoinImgTwo,
  InviteImg,
  LeftChevronImg,
  More,
  Refresh,
  TelegramImg,
  UserPlus,
  XImg,
  YoutubeImg,
  back,
  downChevron,
} from '../../assets/images';

interface Props {
  style?: ViewStyle;
  closeScreen: any;
  // Define your props here
}

const EarnScreen: React.FC<Props> = props => {
  const screenHeight = Dimensions.get('window').height / 1.3;
  const handleReward = () => {};
  const [pressed, setPressed] = useState(false);
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <View style={{paddingHorizontal: 12}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.firstRow}>
            <Pressable onPress={() => props.closeScreen(false)}>
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
        <View style={{height: screenHeight}}>
          <ScrollView
            style={{paddingBottom: 40}}
            showsVerticalScrollIndicator={false}>
            <View style={{height: 1000}}>
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
              <Pressable
                style={[styles.noAlign]}
                onPressIn={() => setPressed(true)}
                onPressOut={() => {
                  setPressed(false);
                }}>
                <Image
                  source={YoutubeImg}
                  style={{width: 50, height: 35, alignSelf: 'center'}}
                />

                <View style={{alignSelf: 'center', width: '76%'}}>
                  <Text
                    style={{
                      color: '#E8E9EC',

                      fontWeight: '700',
                    }}>
                    Who is Satoshi Nakamoto? The creator of Bitcoin?
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 2}}>
                    <Image
                      source={CoinImgTwo}
                      style={{width: 25, height: 25}}
                    />
                    <Text style={styles.title}>+100,000</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '5%',
                    height: 95,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {pressed ? (
                    <Image
                      source={ActiveChevronImg}
                      style={{width: 16, height: 16}}
                    />
                  ) : (
                    <Image
                      source={LeftChevronImg}
                      style={{width: 30, height: 30}}
                    />
                  )}
                </View>
              </Pressable>
              <View style={{marginBottom: 15, marginTop: 15}}>
                <Text style={styles.text}>Daily Task</Text>
              </View>
              <Pressable
                style={[styles.noAlign, {height: 80}]}
                onPress={handleReward}
                onPressIn={() => setPressed(true)}
                onPressOut={() => {
                  setPressed(false);
                }}>
                <Image
                  source={CalendarImg}
                  style={{width: 50, height: 50, alignSelf: 'center'}}
                />

                <View style={{alignSelf: 'center', width: '76%'}}>
                  <Text
                    style={{
                      color: '#E8E9EC',

                      fontWeight: '700',
                    }}>
                    Daily Reward
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 2}}>
                    <Image
                      source={CoinImgTwo}
                      style={{width: 25, height: 25}}
                    />
                    <Text style={styles.title}>+6,649,000</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '5%',
                    height: 95,
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: 10,
                  }}>
                  {pressed ? (
                    <Image
                      source={ActiveChevronImg}
                      style={{width: 16, height: 16}}
                    />
                  ) : (
                    <Image
                      source={LeftChevronImg}
                      style={{width: 30, height: 30}}
                    />
                  )}
                </View>
              </Pressable>
              {/* Task List */}
              <View style={{marginTop: 20}}>
                <Text style={styles.text}>Task List</Text>
              </View>
              <Pressable
                style={[styles.noAlign, {height: 80, marginTop: 10}]}
                onPressIn={() => setPressed(true)}
                onPressOut={() => {
                  setPressed(false);
                }}>
                <Image
                  source={TelegramImg}
                  style={{width: 50, height: 50, alignSelf: 'center'}}
                />

                <View style={{alignSelf: 'center', width: '76%'}}>
                  <Text
                    style={{
                      color: '#E8E9EC',

                      fontWeight: '700',
                    }}>
                    Join our TG channel
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 2}}>
                    <Image
                      source={CoinImgTwo}
                      style={{width: 25, height: 25}}
                    />
                    <Text style={styles.title}>+5,000</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '5%',
                    height: 95,
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: 10,
                  }}>
                  {pressed ? (
                    <Image
                      source={ActiveChevronImg}
                      style={{width: 16, height: 16}}
                    />
                  ) : (
                    <Image
                      source={LeftChevronImg}
                      style={{width: 30, height: 30}}
                    />
                  )}
                </View>
              </Pressable>
              <Pressable
                style={[styles.noAlign, {height: 80, marginTop: 10}]}
                onPressIn={() => setPressed(true)}
                onPressOut={() => {
                  setPressed(false);
                }}>
                <Image
                  source={XImg}
                  style={{width: 50, height: 50, alignSelf: 'center'}}
                />

                <View style={{alignSelf: 'center', width: '76%'}}>
                  <Text
                    style={{
                      color: '#E8E9EC',

                      fontWeight: '700',
                    }}>
                    Follow our X account
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 2}}>
                    <Image
                      source={CoinImgTwo}
                      style={{width: 25, height: 25}}
                    />
                    <Text style={styles.title}>+5,000</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '5%',
                    height: 95,
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: 10,
                  }}>
                  {pressed ? (
                    <Image
                      source={ActiveChevronImg}
                      style={{width: 16, height: 16}}
                    />
                  ) : (
                    <Image
                      source={LeftChevronImg}
                      style={{width: 30, height: 30}}
                    />
                  )}
                </View>
              </Pressable>
              <Pressable style={[styles.noAlign, {height: 80, marginTop: 10}]}   onPressIn={() => setPressed(true)}
                onPressOut={() => {
                  setPressed(false);
                }}>
                <Image
                  source={EarnHamsImg}
                  style={{width: 50, height: 50, alignSelf: 'center'}}
                />

                <View style={{alignSelf: 'center', width: '76%'}}>
                  <Text
                    style={{
                      color: '#E8E9EC',

                      fontWeight: '700',
                    }}>
                    Choose your exchange
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 2}}>
                    <Image
                      source={CoinImgTwo}
                      style={{width: 25, height: 25}}
                    />
                    <Text style={styles.title}>+5,000</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '5%',
                    height: 95,
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: 10,
                  }}>
                  {pressed ? (
                    <Image
                      source={ActiveChevronImg}
                      style={{width: 16, height: 16}}
                    />
                  ) : (
                    <Image
                      source={LeftChevronImg}
                      style={{width: 30, height: 30}}
                    />
                  )}
                </View>
              </Pressable>
              <Pressable  style={[styles.noAlign, {height: 80, marginTop: 10}]}   onPressIn={() => setPressed(true)}
                onPressOut={() => {
                  setPressed(false);
                }}>
                <Image
                  source={InviteImg}
                  style={{width: 50, height: 50, alignSelf: 'center'}}
                />

                <View style={{alignSelf: 'center', width: '76%'}}>
                  <Text
                    style={{
                      color: '#E8E9EC',

                      fontWeight: '700',
                    }}>
                    Invite 3 Friends
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 2}}>
                    <Image
                      source={CoinImgTwo}
                      style={{width: 25, height: 25}}
                    />
                    <Text style={styles.title}>+5,000</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '5%',
                    height: 95,
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: 10,
                  }}>
                  {pressed ? (
                    <Image
                      source={ActiveChevronImg}
                      style={{width: 16, height: 16}}
                    />
                  ) : (
                    <Image
                      source={LeftChevronImg}
                      style={{width: 30, height: 30}}
                    />
                  )}
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
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

    shadowColor: '#E9BA48',
    shadowOffset: {width: 0, height: 26},
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});

export default EarnScreen;
