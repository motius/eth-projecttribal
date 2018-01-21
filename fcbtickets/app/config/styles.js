import {colors} from "./colors";
import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  simpleContainer: {
    flex: 1,
  },
  simpleScreenContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabIcon: {
    width: 20,
    height: 20,
  },
});
