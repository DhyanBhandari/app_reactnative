import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';

export const copyToClipboard = async (text: string, successMessage: string = 'Copied to clipboard!') => {
  try {
    await Clipboard.setStringAsync(text);
    Alert.alert('Success', successMessage);
    return true;
  } catch (error) {
    Alert.alert('Error', 'Failed to copy to clipboard');
    return false;
  }
};
