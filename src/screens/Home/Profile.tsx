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
import {BlueBack, More, downChevron} from '../../assets/images';
import {SkinImageData} from '../../assets/images/imageArray';

interface Props {
  // Define your props here
  goBack: React.Dispatch<React.SetStateAction<string>>;
  closeScreen: React.Dispatch<React.SetStateAction<boolean>>;
  source?: ImageSourcePropType | undefined;
}
const options = [
  {value: 'feat', label: 'featured'},
  {value: 'all-0', label: 'all'},
];

const {width, height} = Dimensions.get('screen');
const Profile: React.FC<Props> = props => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('all');
  const flatListRef = useRef();
  const [itemIndex, setIndex] = useState(0);

  const handleOptionSelected = () => {
    if (selectedOption === 'all') {
      return SkinImageData.flatMap(item => {
        return [...item.all, ...item.featured];
      });
    } else if (selectedOption === 'featured') {
      return SkinImageData.flatMap(item => item.featured);
    }
    return [];
  };
  const imageData = handleOptionSelected();
  const [image, setImage] = useState(imageData[0]?.imageUrl);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        <View style={styles.row}>
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
      {/* <ScrollView style={{}} contentContainerStyle={{ }}> */}
      <View style={styles.headerView}>
        <Image source={props.source} style={{width: 40, height: 40}} />
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.title}>Anie(CEO)</Text>
        </View>
      </View>
      <View style={styles.bg} />
      <View style={styles.row}>
        <Text style={styles.rowText}>Skin</Text>
        <View style={styles.justify}>
          {options.map(item => {
            return (
              <Pressable
                style={[
                  styles.optionPressable,
                  selectedOption === item.label && {
                    backgroundColor: '#1D1F24',
                  },
                ]}
                onPress={() => setSelectedOption(item.label)}>
                <Text style={styles.optionText}>{item.label}</Text>
              </Pressable>
            );
          })}

          {/* </Pressable> */}
        </View>
      </View>
      <View style={styles.block}>
        <View style={styles.align}>
          <View style={{left: 20, width: '50%'}}>
            <Image
              source={image}
              style={{width: 190, height: 300}}
              resizeMode="contain"
            />
            <View style={styles.labelBg}>
              <Text style={styles.justText}>Default</Text>
              <Text style={styles.league}>Your league's default skin</Text>
              <Text style={styles.blockText}>Purchased</Text>
              <View style={styles.flex}>
                <Pressable
                  style={[
                    styles.pressable,
                    {
                      width: '90%',
                      backgroundColor: '#363A70',
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

          {/* <View style={{alignSelf: 'flex-end', marginRight: 10}}> */}
          <FlatList
            data={imageData}
            numColumns={2}
            contentContainerStyle={{paddingBottom: '30%'}}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  style={[
                    styles.itemView,
                    itemIndex === index && styles.border,
                  ]}
                  onPress={() => {
                    setImage(item.imageUrl);
                    setIndex(index);
                  }}
                  key={index}>
                  <Image
                    source={item.imageUrl}
                    style={{width: 40, height: 90, alignSelf: 'center',}}
                    resizeMode="contain"
                  />
                  <Text style={{fontSize:10, textAlign:'center', color:'white'}}>{item.name}</Text>
                </Pressable>
              );
            }}
          />
          {/* </View> */}
        </View>
      </View>

      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 86,
    backgroundColor: '#000000',
  },
  left: {marginLeft: 10},
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
    paddingTop: 15,
  },
  itemView: {
    alignItems: 'center',
    height: 110,
    width: 80,
    marginLeft: 10,
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 10,

    backgroundColor: '#272A2F',
    //    width: width / 2,
  },
  border: {
    borderColor: '#5D62E9',
    borderWidth: 1,
  },
  labelBg: {
    backgroundColor: '#272A2F',
    borderRadius: 10,
    height: '10%',
    width: '40%',
    alignSelf: 'center',
  },
  headerView: {
    flexDirection: 'row',
    width: '30%',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  bg: {
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: '#1D1F24',
    borderWidth: 1,
    marginBottom: 10,
  },
  rowText: {
    color: 'white',
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
    marginLeft: 80,
  },
  justify: {
    flexDirection: 'row',
    backgroundColor: '#272A2F',
    height: 60,
    borderRadius: 10,
    padding: 8,
  },
  optionPressable: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  optionText: {
    color: 'white',
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  justText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
    marginTop: 20,
    textAlign: 'center',
  },
  league: {
    color: 'white',
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  blockText: {
    color: '#7FB185',
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  flex: {height: '50%', justifyContent: 'flex-end'},
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  imagePress: {
    height: height,
    width: width / 2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  img: {width: 30, height: 30},
});

export default Profile;
