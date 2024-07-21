import React from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
  SafeAreaView,
  Pressable,
  Image,
  View,
} from 'react-native';
import {
  CoinImgTwo,
  Copy,
  GiftImgOne,
  More,
  Refresh,
  UserPlus,
  back,
  downChevron,
} from '../../assets/images';

interface Props {
  style?: ViewStyle;
  closeScreen: any;
  // Define your props here
}

const FriendsScreen: React.FC<Props> = props => {
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
        <Text style={styles.header}>Invite Friends! </Text>
        <Text style={[styles.title, {marginTop: 10}]}>
          You and your friend will recieve bonuses{' '}
        </Text>
        <View style={[styles.noAlign, {marginTop: 20}]}>
          <Image
            source={GiftImgOne}
            style={{width: 35, height: 35, alignSelf: 'center'}}
          />
          <View style={{padding: 12, alignSelf: 'center'}}>
            <Text
              style={{
                color: 'white',

                fontWeight: '700',
              }}>
              Invite a friend
            </Text>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={styles.circle} />
              <Image source={CoinImgTwo} style={{width: 25, height: 25}} />
              <Text style={styles.title}>
                <Text style={{color: '#F5C822'}}>+5000 </Text>for you and your
                friend
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.noAlign, {marginTop: 10}]}>
          <Image
            source={GiftImgOne}
            style={{width: 35, height: 35, alignSelf: 'center'}}
          />
          <View style={{padding: 12, alignSelf: 'center'}}>
            <Text
              style={{
                color: 'white',

                fontWeight: '700',
              }}>
              Invite a friend with Telegram {'\n'}premium
            </Text>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={styles.circle} />
              <Image source={CoinImgTwo} style={{width: 25, height: 25}} />
              <Text style={styles.title}>
                <Text style={{color: '#F5C822'}}>+5000 </Text>for you and your
                friend
              </Text>
            </View>
          </View>
        </View>
        {/* More block */}
        <View style={{alignSelf: 'center', marginVertical: 10}}>
          <Text style={styles.purple}>More bonuses</Text>
        </View>
        {/* Friend List */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.text}>List of your friend</Text>
          <Image source={Refresh} style={{width: 20, height: 20}} />
        </View>
        <View
          style={[
            styles.noAlign,
            {marginTop: 10, height: 80, justifyContent: 'center'},
          ]}>
          <View style={{alignSelf: 'center'}}>
            <Text
              style={{
                color: '#46494C',

                fontWeight: '700',
              }}>
              You haven't invited anyone yet
            </Text>
          </View>
        </View>
        <View
          style={{
            top: '30%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable style={styles.pressable}>
            <Text style={styles.text}>Invite your friend</Text>
            <Image
              source={UserPlus}
              style={{width: 20, height: 20, marginLeft: 10}}
            />
          </Pressable>

          <Pressable style={styles.copyBtn}>
            <Image source={Copy} style={{width: 20, height: 20}} />
          </Pressable>
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
    fontWeight: '500',
  },
  header: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '800',
    marginTop: 25,
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
});

export default FriendsScreen;
