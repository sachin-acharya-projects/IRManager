import { StyleSheet, Text, View } from 'react-native';

import * as IRManager from 'ir-manager';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{IRManager.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
