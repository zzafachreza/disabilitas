import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton } from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements';


export default function Login({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [show, setShow] = useState(true);
  const [token, setToken] = useState('');
  const [data, setData] = useState({
    npm: '',
    password: '',
  });

  useEffect(() => {
    getData('token').then(res => {
      console.log('data token,', res);
      setToken(res.token);
    });
  }, []);

  // login ok
  const masuk = () => {
    if (data.npm.length === 0 && data.password.length === 0) {
      showMessage({
        message: 'Maaf npm dan Password masih kosong !',
      });
    } else if (data.npm.length === 0) {
      showMessage({
        message: 'Maaf npm masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf Password masih kosong !',
      });
    } else {
      setLoading(true);
      console.log(data);
      setTimeout(() => {
        axios
          .post(urlAPI + '/login.php', data)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {
              showMessage({
                type: 'danger',
                message: res.data.msg,
              });
            } else {
              storeData('user', res.data);
              axios
                .post(urlAPI + '/update_token.php', {
                  id_member: res.data.id,
                  token: token,
                })
                .then(res => {
                  console.log('update token', res);
                });

              navigation.replace('MainApp');
            }
          });
      }, 1200);
    }
  };
  return (
    <ImageBackground style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          marginTop: 20,
        }}>
        <View
          style={{
            height: 220,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            padding: 10,
            borderRadius: 10,
          }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              resizeMode: 'contain',
              width: 200,
              // aspectRatio: 1,
            }}
          />
        </View>
        <View style={styles.page}>


          <MyGap jarak={20} />
          <MyInput
            label="npm"
            iconname="card-outline"
            placeholder="Masukan npm"
            value={data.npm}
            onChangeText={value =>
              setData({
                ...data,
                npm: value,
              })
            }
          />

          <MyGap jarak={20} />

          <MyInput
            placeholder="Masukan password"
            label="Password"
            iconname="lock-closed-outline"
            secureTextEntry={show}
            onChangeText={value =>
              setData({
                ...data,
                password: value,
              })
            }
          />


          <MyGap jarak={40} />
          {valid && (
            <MyButton
              warna={colors.primary}
              title="LOGIN"
              Icons="log-in"
              onPress={masuk}
            />
          )}

          {/* <TouchableOpacity onPress={() => {
            navigation.navigate('Add');
          }} style={{
            paddingHorizontal: 5,
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
              color: colors.primary,
            }}>Lupa Password ?</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      {
        loading && (
          <LottieView
            source={require('../../assets/animation.json')}
            autoPlay
            loop
            style={{ backgroundColor: colors.primary }}
          />
        )
      }
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
