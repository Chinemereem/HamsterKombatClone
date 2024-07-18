import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface Props {
  // Define your props here
  circular?: boolean;
  isDarkMode?: boolean;
  small?: boolean;
  data?: any[];
  paginationIndex: number;
  index: number;
  mode1?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const EllipticalPagination: React.FC<Props> = ({
  paginationIndex,
  circular,
  small,
  index,
  onPress,
}: Props) => {
  return (
    <View style={[styles.container]}>
      <>
        {circular ? (
          <TouchableOpacity
            style={
              paginationIndex === index
                ? {
                    backgroundColor: 'white',
                    height: small ? 4 : 6,
                    width: small ? 4 : 6,
                    marginHorizontal: 2,
                    borderRadius: 20,
                  }
                : {
                    backgroundColor: 'blue',

                    height: small ? 2 : 4,
                    width: small ? 2 : 4,
                    marginHorizontal: 2,
                    borderRadius: 20,
                  }
            }
            onPress={onPress}
          />
        ) : (
          <TouchableOpacity
            style={
              paginationIndex === index
                ? {
                    backgroundColor: 'white',
                    height: small ? 4 : 6,
                    width: small ? 18 : 28,
                    marginHorizontal: 2,
                    borderRadius: 20,
                  }
                : {
                    backgroundColor: '#4E4D52',

                    height: small ? 4 : 8,
                    width: small ? 10 : 8,
                    marginHorizontal: 2,
                    borderRadius: 20,
                  }
            }
            onPress={onPress}
          />
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // top: -300,
  },
  dot: {
    backgroundColor: 'white',
    height: 6,
    width: 28,
    marginHorizontal: 2,
    borderRadius: 20,
  },
  dotOpacity: {
    height: 6,
    width: 16,
    marginHorizontal: 2,
    borderRadius: 20,
  },
  circularDot: {
    backgroundColor: 'white',
    height: 4,
    width: 4,
    marginHorizontal: 2,
    borderRadius: 20,
  },
  circularDotOpacity: {
    height: 6,
    width: 6,
    marginHorizontal: 2,
    borderRadius: 20,
  },
});

export default EllipticalPagination;
