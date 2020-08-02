import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AuthContext from '../../contexts/auth';

const SignIn: React.FC = () => {
  const {signed, signin} = React.useContext(AuthContext);

  console.log(signed);
  function handleSignIn() {
    signin();
  }
  return (
    <View style={styles.container}>
      <Button title="SignIn" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SignIn;
