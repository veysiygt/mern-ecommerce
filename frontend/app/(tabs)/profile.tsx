import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <View style={styles.test}>
      <Text>adsadsaa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 340,
  }
});
