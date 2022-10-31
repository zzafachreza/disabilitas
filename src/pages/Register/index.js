import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import { urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';

export default function Register({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [open, setOpen] = useState(false);
  const [kota, setKota] = useState([]);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log('Email is Not Correct');
      setData({ ...data, email: text });
      setValid(false);
      return false;
    } else {
      setData({ ...data, email: text });
      setValid(true);
      // console.log('Email is Correct');
    }
  };

  const [level, setlevel] = useState({
    1: true,
    2: false
  })

  const [data, setData] = useState({
    level: 'Disabilitas',
    nama_lengkap: '',
    email: '',
    npm: '',
    prodi: '',
    semester: '',
    jenis_kelamin: 'Laki-laki',
    alamat: '',
    telepon: '',
    jenis_disabilitas: '',
    username: '',
    password: '',
    motivasi: '',
    bahasa_inggris: '',
    bahasa_arab: '',
    potensi: '',

  });

  const simpan = () => {
    if (
      data.nama_lengkap.length === 0 &&
      data.email.length === 0 &&
      data.password.length === 0 &&
      data.telepon.length === 0 &&
      data.prodi.length === 0 &&
      data.semester.length === 0 &&
      data.npm.length === 0 &&
      data.kota.length === 0
    ) {
      showMessage({
        message: 'Maaf Semua Field Harus Di isi !',
      });
    } else if (data.nama_lengkap.length === 0) {
      showMessage({
        message: 'Maaf Nama Lengkap masih kosong !',
      });
    } else if (data.npm.length === 0) {
      showMessage({
        message: 'Maaf NPM masih kosong !',
      });
    } else if (data.prodi.length === 0) {
      showMessage({
        message: 'Maaf Prodi masih kosong !',
      });
    } else if (data.semester.length === 0) {
      showMessage({
        message: 'Maaf Semester masih kosong !',
      });
    } else if (data.email.length === 0) {
      showMessage({
        message: 'Maaf email masih kosong !',
      });
    } else if (data.telepon.length === 0) {
      showMessage({
        message: 'Maaf Telepon masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf Password masih kosong !',
      });
    } else {
      setLoading(true);
      console.log(data);
      axios
        .post(urlAPI + '/register.php', data)
        .then(res => {
          console.warn(res.data);
          let err = res.data.split('#');

          console.log(err[0]);
          if (err[0] == 50) {
            setTimeout(() => {
              setLoading(false);
              showMessage({
                message: err[1],
                type: 'danger',
              });
            }, 1200);
          } else {
            setTimeout(() => {
              navigation.replace('Success', {
                messege: res.data,
              });
            }, 1200);
          }
        });
    }
  };

  useEffect(() => {

  }, [])




  return (
    <SafeAreaView

      style={{
        flex: 1,
        backgroundColor: colors.white
      }}>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>


        {/* Level */}
        <View style={{
          paddingVertical: 5,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 30,
            color: colors.primary,
          }}>Pilihan Tipe Pengguna : </Text>
          <View style={{
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
            <TouchableOpacity onPress={() => {
              setlevel({
                1: true,
                2: false,
              });
              setData({
                ...data,
                level: 'Disabilitas'
              });


            }
            } style={{
              flex: 1,
              borderWidth: 1,
              borderColor: level[1] ? colors.primary : colors.border,
              flexDirection: 'row',
              margin: 5,
              padding: 0,

            }}>
              <View style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: level[1] ? colors.primary : colors.border,
              }}>
                {level[1] && <Icon type='ionicon' name='checkbox' color={colors.white} size={windowWidth / 30} />}

              </View>

              <Text style={{
                margin: 10,
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 35,
              }}>Disabilitas</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
              setlevel({
                1: false,
                2: true,
              });
              setData({
                ...data,
                level: 'Relawan',
              })


            }

            } style={{
              flex: 1,
              borderWidth: 1,
              borderColor: level[2] ? colors.primary : colors.border,
              flexDirection: 'row',
              margin: 5,
              padding: 0,

            }}>
              <View style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: level[2] ? colors.primary : colors.border,
              }}>
                {level[2] && <Icon type='ionicon' name='checkbox' color={colors.white} size={windowWidth / 30} />}

              </View>

              <Text style={{
                margin: 10,
                textAlign: 'center',
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 35,
              }}>Relawan</Text>
            </TouchableOpacity>
          </View>
        </View>


        <MyGap jarak={10} />
        <MyInput
          label="Nama Lengkap"
          placeholder="Masukan nama lengkap"
          iconname="person-outline"
          value={data.nama_lengkap}
          onChangeText={x =>
            setData({
              ...data,
              nama_lengkap: x,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Email"
          iconname="mail-outline"
          placeholder="Masukan email"
          value={data.email}
          onChangeText={x =>
            setData({
              ...data,
              email: x,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="NPM"
          iconname="card-outline"
          placeholder="Masukan npm"
          value={data.npm}
          onChangeText={x =>
            setData({
              ...data,
              npm: x,
            })
          }
        />


        <MyGap jarak={10} />
        <MyInput
          label="Prodi"
          iconname="bookmarks-outline"
          placeholder="Masukan prodi"
          value={data.prodi}
          onChangeText={x =>
            setData({
              ...data,
              prodi: x,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Semester"
          iconname="calendar-outline"
          placeholder="Masukan semester"
          value={data.semester}
          onChangeText={x =>
            setData({
              ...data,
              semester: x,
            })
          }
        />
        <MyGap jarak={10} />
        <MyPicker label="Jenis Kelamin" onValueChange={x => setData({
          ...data,
          jenis_kelamin: x,
        })} iconname="male-female" data={[
          {
            label: 'Laki-laki',
            value: 'Laki-laki'
          },
          {
            label: 'Perempuan',
            value: 'Perempuan'
          }
        ]} />

        <MyGap jarak={10} />
        <MyInput
          label="Alamat"
          iconname="location-outline"
          placeholder="Masukan alamat"
          value={data.alamat}
          onChangeText={x =>
            setData({
              ...data,
              alamat: x,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Telepon / Whatsapp ( Contoh +62812345678 )"
          keyboardType="phone-pad"
          iconname="logo-whatsapp"
          placeholder="Masukan telepon"
          value={data.telepon}
          onChangeText={x =>
            setData({
              ...data,
              telepon: x,
            })
          }
        />

        {level[1] && (
          <>
            <MyGap jarak={10} />
            <MyInput
              label="Jenis Disabilitas"
              iconname="bandage-outline"
              placeholder="Masukan jenis disabilitas"
              value={data.jenis_disabilitas}
              onChangeText={x =>
                setData({
                  ...data,
                  jenis_disabilitas: x,
                })
              }
            />
          </>
        )}

        {/* relawan */}
        {level[2] && (

          <>
            <MyGap jarak={10} />
            <MyInput
              label="Motivasi ingin menjadi tim pendamping disabilitas?"
              iconname="people-outline"
              placeholder="Masukan jenis disabilitas"
              value={data.motivasi}
              onChangeText={x =>
                setData({
                  ...data,
                  motivasi: x,
                })
              }
            />
            <MyGap jarak={10} />
            <MyInput
              label="Bidang Keahlian Kemampuan Bahasa Inggris?"
              iconname="ribbon-outline"
              placeholder="Bidang Keahlian Kemampuan Bahasa Inggris?"
              value={data.bahasa_inggris}
              onChangeText={x =>
                setData({
                  ...data,
                  bahasa_inggris: x,
                })
              }
            />
            <MyGap jarak={10} />
            <MyInput
              label="Bidang Keahlian Kemampuan Bahasa Arab?"
              iconname="language-outline"
              placeholder="Bidang Keahlian Kemampuan Bahasa Arab?"
              value={data.bahasa_arab}
              onChangeText={x =>
                setData({
                  ...data,
                  bahasa_arab: x,
                })
              }
            />
            <MyGap jarak={10} />
            <MyInput
              label="Sebutkan kelebihan (potensi) yang anda miliki?"
              iconname="person-add-outline"
              placeholder="Sebutkan kelebihan (potensi) yang anda miliki?"
              value={data.potensi}
              onChangeText={x =>
                setData({
                  ...data,
                  potensi: x,
                })
              }
            />
          </>

        )}



        <MyGap jarak={10} />
        <MyInput
          label="Password"
          placeholder="Masukan password"
          iconname="lock-closed-outline"
          secureTextEntry={show}
          value={data.password}
          onChangeText={value =>
            setData({
              ...data,
              password: value,
            })
          }
        />


        <MyGap jarak={20} />

        <MyButton
          warna={colors.primary}
          title="REGISTER"
          Icons="log-in"
          onPress={simpan}
        />

        <MyGap jarak={20} />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
