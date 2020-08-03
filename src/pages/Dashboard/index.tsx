import React from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import AuthContext from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const {signOut, user} = React.useContext(AuthContext);

  function handleSignOut() {
    console.log(signOut());
    signOut();
  }
  return (
    <View style={styles.container}>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
