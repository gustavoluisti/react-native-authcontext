import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AuthContext from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const {signOut} = React.useContext(AuthContext);

  function handleSignOut() {
    console.log(signOut());
    signOut();
  }
  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Dashboard;
