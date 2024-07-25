import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  SliderImg,
  SliderImg4,
  hamsterBook,
  img1,
  SliderImg2,
  SliderImg5,
  SliderImg3,
  hamster2,
  hamster3,
} from '../../assets/images';
import BottomOverlay from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import EllipticalPagination from '../common/pagination';
import {useNavigation} from '@react-navigation/native';
interface Props {
  // Define your props here
  close: () => void;
}

const Onboard: React.FC<Props> = props => {
  const refRBSheet = useRef(null);
  // const navigation = useNavigation();
  useEffect(() => {
    if (refRBSheet.current) {
      refRBSheet.current?.open();
    }
  }, []);
  const [page, setPage] = useState(1);
  const handleIndex = () => {
    if (page === 1) {
      setPage(2);
    } else if (page === 2) {
      setPage(3);
    } else if (page === 3) {
      setPage(4);
    } else if (page === 4) {
      setPage(5);
    } else if (page === 5) {
      setPage(6);
    } else if (page === 6) {
      refRBSheet.current?.close();
      props.close();
    }
    // else {
    //   setPage(1);
    // }
  };
  const handleImage = () => {
    if (page === 1) {
      return img1;
    } else if (page === 2) {
      return SliderImg;
    } else if (page === 3) {
      return SliderImg4;
    } else if (page === 4) {
      return SliderImg5;
    } else if (page === 5) {
      return SliderImg2;
    } else if (page === 6) {
      return SliderImg3;
    }
  };
  const handleHamsterImage = () => {
    if (page === 5) {
      return hamster2;
    } else if (page === 6) {
      return hamster3;
    } else {
      return hamsterBook;
    }
  };
  const handleText = () => {
    if (page === 1) {
      return 'Tap and earn coins';
    } else if (page === 2) {
      return 'Pump up the hamster';
    } else if (page === 3) {
      return 'Upgrade your exchange';
    } else if (page === 4) {
      return 'Invite friends and get bonuses together';
    } else if (page === 5) {
      return 'Subscribe to our community and socialize!';
    } else if (page === 6) {
      return 'Use coins to get an airdrop at token listing';
    }
  };
  const handleSubText = () => {
    if (page === 1) {
      return 'You can use boosters and tricky strateges';
    } else if (page === 2) {
      return 'Go all the way and become the best CEO';
    } else if (page === 3) {
      return 'Level up your cards, increse your income';
    } else if (page === 4) {
      return 'You and yor friend will both recieve coins';
    } else if (page === 5) {
      return '';
    } else if (page === 6) {
      return "Don't forget to invite your friends ";
    }
  };
  let numbers = [];
  for (let i = 1; i <= 6; i += 1) {
    numbers.push(i);
  }
  return (
    <View style={styles.container}>
      <Image source={handleImage()} resizeMode="center" style={{bottom: 80}} />

      <BottomOverlay
        ref={refRBSheet}
        closeOnPressBack={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            backgroundColor: '#1A1927',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 20,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        height={300}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={{}}>
          <LinearGradient
            colors={['rgb(36, 34, 55)', 'rgba(0, 0,0,0.9)']}
            style={{
              position: 'absolute',
              width: '100%',
              height: 400,
              backgroundColor: 'rgba(0, 0,0,0.2)',
            }}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
          <View style={{top: 15}}>
            <View
              style={{
                flexDirection: 'row',
                top: 20,
                justifyContent: 'space-evenly',
              }}>
              <Image
                source={handleHamsterImage()}
                style={{width: 130, height: 160}}
              />
              <View style={{paddingTop: 30, width: '50%'}}>
                <Text style={styles.title}>{handleText()}</Text>
                <Text style={{color: 'white', fontSize: 16}}>
                  {handleSubText()}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 50,
                justifyContent: 'space-around',
              }}>
              {page === 6 ? null : (
                <View style={{flexDirection: 'row'}}>
                  {numbers.map((item, index) => {
                    return (
                      <EllipticalPagination
                        paginationIndex={page}
                        index={item}
                        onPress={handleIndex}
                      />
                    );
                  })}
                </View>
              )}
              <TouchableOpacity
                style={[styles.btnStyles, {width: page === 6 ? '70%' : 140}]}
                onPress={handleIndex}>
                <Text
                  style={[{fontWeight: '600', color: 'white', fontSize: 16}]}>
                  {page === 6 ? 'Play' : 'Next'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomOverlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020208',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 7,
  },
  btnStyles: {
    backgroundColor: '#5A60FF',
    width: 140,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
});

export default Onboard;
