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
    backgroundColor: colors.white,
  },
  tabIcon: {
    width: 20,
    height: 20,
  },
  materialButton: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  materialButtonText: {
    color: colors.primaryColor,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
