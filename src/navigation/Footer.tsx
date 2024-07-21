import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {
  AirdropImg,
  EarnImage,
  FriendsImg,
  HammerPressed,
  HammerUnPressed,
  HamsterCutoff,
  PressedEarnImage,
  PressedHams,
  SelectedAirdropImg,
  SelectedFriendsImg,
} from '../assets/images';
import EarnScreen from '../screens/Home/EarnScreen';
import ExchangeScreen from '../screens/Home/Exchange';
import FriendsScreen from '../screens/Home/Friends';

interface Props {
  // Define your props here
}

const Footer: React.FC<Props> = props => {
  const [pressed, setPressed] = useState('exchange');
  const [showEarnScreen, setShowEarnScreen] = useState(false);
  const [showExchangeScreen, setShowExchangeScreen] = useState(false);
  const [showAirDropScreen, setShowAirDropScreen] = useState(false);
  const [showFriendsScreen, setShowFriendsScreen] = useState(false);
  return (
    <>
      <View style={{height: '10%', backgroundColor: 'red'}}>
        <View style={{top: 6}}>
          <View style={styles.viewContainer}>
            <Pressable
              style={[
                styles.selectedView,
                {
                  backgroundColor:
                    pressed === 'exchange' ? '#1D1F24' : '#272A2F',
                },
              ]}
              onPress={() => {
                setPressed('exchange');
                setShowEarnScreen(false);
                setShowAirDropScreen(false);
                setShowFriendsScreen(false);
              }}>
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
                {
                  backgroundColor: pressed === 'mine' ? '#1D1F24' : '#272A2F',
                },
              ]}
              onPress={() => {
                setPressed('mine');
                setShowEarnScreen(false);
                setShowAirDropScreen(false);
                setShowFriendsScreen(false);
              }}>
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
              onPress={() => {
                setPressed('friends');
                setShowFriendsScreen(true);
                setShowEarnScreen(false);
                setShowAirDropScreen(false);
              }}>
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
                {
                  backgroundColor: pressed === 'earn' ? '#1D1F24' : '#272A2F',
                },
              ]}
              onPress={() => {
                setPressed('earn');
                setShowEarnScreen(true);
                setShowAirDropScreen(false);
                setShowFriendsScreen(false);
              }}>
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
              onPress={() => {
                setPressed('airdrop');
                setShowAirDropScreen(true);
                setShowEarnScreen(false);

                setShowFriendsScreen(false);
              }}>
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
      {showEarnScreen && <EarnScreen closeScreen={setShowEarnScreen} />}
      {showAirDropScreen && (
        <ExchangeScreen closeScreen={setShowAirDropScreen} />
      )}
      {showFriendsScreen && (
        <FriendsScreen closeScreen={setShowFriendsScreen} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default Footer;
