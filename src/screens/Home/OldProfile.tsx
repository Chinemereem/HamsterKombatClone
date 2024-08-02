import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ImageSourcePropType,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  BlueBack,
  More,
  ProfileArrowLeft,
  ProfileArrowRight,
  downChevron,
} from '../../assets/images';
import {SkinImageData} from '../../assets/images/imageArray';

interface Props {
  // Define your props here
  goBack: React.Dispatch<React.SetStateAction<string>>;
  closeScreen: React.Dispatch<React.SetStateAction<boolean>>;
  source?: ImageSourcePropType | undefined;
}
const {width} = Dimensions.get('screen');
const Profile: React.FC<Props> = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();
  const handleNext = () => {
    console.log('000000');
    if (currentIndex < SkinImageData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginLeft: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.firstRow}>
            <Pressable
              onPress={() => {
                props.closeScreen(false);
                props.goBack('exchange');
              }}>
              <Image source={BlueBack} style={{width: 25, height: 25}} />
            </Pressable>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.secondRow}>
            <Pressable onPress={() => {}}>
              <Image source={downChevron} style={{}} />
            </Pressable>
            <Image source={More} style={{width: 22, height: 22}} />
          </View>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: '30%',
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 10,
          }}>
          <Image source={props.source} style={{width: 40, height: 40}} />
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.title}>Anie(CEO)</Text>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            borderBottomColor: '#1D1F24',
            borderWidth: 1,
          }}
        />

        <View style={styles.block}>
          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              marginTop: 20,
              textAlign: 'center',
            }}>
            Skin
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={handlePrev}
              style={{
                height: 70,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Image
                source={ProfileArrowLeft}
                style={{width: 30, height: 30}}
              />
            </Pressable>

            <FlatList
              ref={flatListRef}
              data={SkinImageData}
              horizontal
              pagingEnabled
              scrollEnabled={false}
              extraData={currentIndex}
              initialScrollIndex={currentIndex}
              getItemLayout={
                (data, index) => ({
                  length: width,
                  offset: width * index,
                  index,
                }) // Adjust length and offset according to your image dimensions
              }
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      width,
                      backgroundColor: 'red',
                    }}
                    key={index}>
                    <Image
                      source={item.imageUrl}
                      style={{width: 170, height: 350, alignSelf: 'center'}}
                    />
                  </View>
                );
              }}
            />
            <Pressable
              style={{
                height: 70,
                justifyContent: 'center',
                // /   alignSelf: 'flex-end',
                alignSelf: 'center',
              }}
              onPress={handleNext}>
              <Image
                source={ProfileArrowRight}
                style={{width: 30, height: 30}}
              />
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: '#272A2F',
              borderRadius: 10,
              height: '30%',
              width: '90%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: 17,
                marginTop: 20,
                textAlign: 'center',
              }}>
              Default
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                marginTop: 20,
                textAlign: 'center',
              }}>
              Your league's default skin
            </Text>
            <Text
              style={{
                color: '#7FB185',
                fontWeight: '600',
                marginTop: 20,
                textAlign: 'center',
              }}>
              Purchased
            </Text>
            <View style={{height: '50%', justifyContent: 'flex-end'}}>
              <Pressable
                style={[
                  styles.pressable,
                  {
                    width: '90%',
                    backgroundColor:
                      //   loading || props.countBalance < tapIncrement
                      //     ? '#454547'
                      '#363A70',
                  },
                ]}
                // disabled={props.countBalance < tapIncrement}
                // onPress={handleEnergyBtn}
              >
                {/* {loading ? (
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
                   )} */}
                <Text style={styles.textx}>Choose</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 86,
    backgroundColor: '#000000',
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
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '700',
  },
  textx: {
    color: 'white',

    fontWeight: '700',
  },
  block: {
    marginTop: 20,
    backgroundColor: '#1D1F24',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    paddingBottom: 50,
  },
});

export default Profile;
