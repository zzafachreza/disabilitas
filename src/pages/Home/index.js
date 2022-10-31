import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { MyButton, MyGap } from '../../components';

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [relawan, setRelawan] = useState([]);
  const [bantuan, setBantuan] = useState([]);
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {

    // const unsubscribe = messaging().onMessage(async remoteMessage => {

    //   const json = JSON.stringify(remoteMessage);
    //   const obj = JSON.parse(json);

    //   // console.log(obj);

    //   // alert(obj.notification.title)



    //   PushNotification.localNotification({
    //     /* Android Only Properties */
    //     channelId: 'ekonseling', // (required) channelId, if the channel doesn't exist, notification will not trigger.
    //     title: obj.notification.title, // (optional)
    //     message: obj.notification.body, // (required)
    //   });
    // });



    if (isFocused) {
      __getrelawan();
      __getDataUserInfo();
      __getBantuan();
    }
    // return unsubscribe;
  }, [isFocused]);


  const __getrelawan = () => {
    axios.post(urlAPI + '/1data_relawan.php', {
      fid_user: user.id
    }).then(res => {
      setRelawan(res.data)
    })
  }


  const __getBantuan = () => {
    axios.post(urlAPI + '/1data_bantuan.php', {
      fid_relawan: user.id
    }).then(res => {
      console.warn('data bantuan', res.data);
      setBantuan(res.data)
    })
  }


  const __getDataUserInfo = () => {
    getData('user').then(users => {
      setUser(users);
      getData('token').then(res => {
        setToken(res.token);
        axios
          .post(urlAPI + '/update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            // console.error('update token', res.data);
          });
      });
    });
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;


  const Bintang = ({ nilai }) => {
    var myBintang = [];

    for (let i = 0; i < 5; i++) {
      myBintang.push(
        <View key={i}>
          <Icon
            type="font-awesome"
            name="star"
            color={i < nilai ? '#F8B459' : '#C7C7C7'}
            style={{ marginHorizontal: 2 }}
            size={12}
          />
        </View>,
      );
    }

    return <>{myBintang}</>;
  };

  const __renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Pinjam', item);
      }}
      style={{
        borderRadius: 10,
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: colors.zavalabs2,

      }}>
      <View style={{
        flex: 0.3,
      }}>
        <Image source={{
          uri: item.image
        }} style={{
          alignSelf: 'center',
          // resizeMode: 'contain',
          width: '100%',
          height: 100,
          borderRadius: 10,

        }} />
      </View>

      <View style={{
        flex: 1,
        paddingLeft: 10,
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Text
            style={{
              flex: 1,
              fontSize: windowWidth / 30,
              color: colors.primary,
              fontFamily: fonts.secondary[600],
            }}>
            {item.nama_lengkap}
          </Text>
          {item.status > 0 && <Text
            style={{
              fontSize: windowWidth / 30,
              color: colors.white,
              backgroundColor: colors.success,
              paddingHorizontal: 10,
              fontFamily: fonts.secondary[600],
            }}>
            Terima Bantuan
          </Text>}
        </View>

        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.secondary,
            fontFamily: fonts.secondary[400],
          }}>
          {item.telepon}
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.black,
            fontFamily: fonts.secondary[400],
          }}>
          {item.prodi}
        </Text>




      </View>








    </TouchableOpacity >
  );



  const __renderItemBantuan = ({ item }) =>

  (



    <View

      style={{
        borderRadius: 10,
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: colors.zavalabs2,

      }}>
      <View style={{
        flex: 0.3,
      }}>
        <Image source={{
          uri: item.image
        }} style={{
          alignSelf: 'center',
          // resizeMode: 'contain',
          width: '100%',
          height: 100,
          borderRadius: 10,

        }} />
      </View>

      <View style={{
        flex: 1,
        paddingLeft: 10,
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Text
            style={{
              flex: 1,
              fontSize: windowWidth / 30,
              color: colors.primary,
              fontFamily: fonts.secondary[600],
            }}>
            {item.nama_lengkap}
          </Text>

        </View>

        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.border,
            fontFamily: fonts.secondary[400],
          }}>
          {item.tanggal}  {item.jam}
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.black,
            fontFamily: fonts.secondary[400],
          }}>
          {item.keterangan}
        </Text>
        {item.status == 0 &&
          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
              paddingRight: 5

            }}>
              <MyButton onPress={() => {
                const dd = {
                  fid_user: item.fid_user,
                  id_bantuan: item.id,
                  fid_relawan: user.id,
                  status: 'Tolak'
                }
                console.log(dd)
                axios.post(urlAPI + '/1update_bantuan.php', dd).then(res => {
                  console.log(res.data)
                  __getBantuan();
                })
              }} warna={colors.danger} Icons="close" title="Tolak" />
            </View>
            <View style={{
              flex: 1,
              paddingLeft: 5
            }}>
              <MyButton onPress={() => {
                const dd = {
                  fid_user: item.fid_user,
                  id_bantuan: item.id,
                  fid_relawan: user.id,
                  status: 'Terima'
                }
                console.log(dd)



                axios.post(urlAPI + '/1update_bantuan.php', dd).then(res => {
                  console.log(res.data);
                  __getBantuan();

                  Alert.alert('Pendampingan Disabilitas FAI-UIKA', 'Terima kasih sudah menerima bantuan')
                })
              }} warna={colors.primary} Icons="shield-checkmark-outline" title="Terima" />
            </View>
          </View>

        }


      </View>








    </View >
  );


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      {/* header */}
      <View
        style={{
          height: windowHeight / 10,
          padding: 10,
          backgroundColor: colors.primary,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>


        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              color: colors.white,
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
            }}>Selamat datang, <Text style={{
              color: colors.white,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30,
            }}>{user.nama_lengkap}</Text></Text>
            <Text style={{
              color: colors.white,
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 25,
            }}>Pendampingan Disabilitas FAI-UIKA</Text>
          </View>


          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/logo.png')} style={{
              width: 50, height: 50
            }} />
          </View>

        </View>


      </View>

      <ScrollView>
        <MyGap jarak={10} />
        <MyCarouser />

        {user.level == 'Disabilitas' && <View style={{ paddingHorizontal: 10, }}><MyButton onPress={() => navigation.navigate('Akses')} colorText={colors.primary} iconColor={colors.primary} Icons="cloud-upload-outline" title="Bantuan Relawan" warna={colors.secondary} /></View>}

        <View style={{
          marginVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>

          <TouchableOpacity onPress={() => navigation.navigate('ListData', {
            tipe: 'BARU'
          })} style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 15,
              padding: 15
            }}>
              <Image style={{
                width: 50,
                height: 50,
                resizeMode: 'contain'
              }} source={require('../../assets/add.png')} />
            </View>

            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
              color: colors.primary,
              marginTop: 10,
            }}>Kegiatan Relawan</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ListData2', {
            tipe: 'LANJUTAN'
          })} style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 15,
              padding: 15
            }}>
              <Image style={{
                width: 50,
                height: 50,
                resizeMode: 'contain'
              }} source={require('../../assets/add2.png')} />
            </View>

            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
              color: colors.primary,
              textAlign: 'center',
              maxWidth: windowWidth / 3,
              marginTop: 10,
            }}>Kebutuhan Akademik Disabilitas</Text>
          </TouchableOpacity>

        </View>



        {user.level === "Disabilitas" &&
          <>
            <View style={{
              padding: 10,
              marginTop: 0,
              flexDirection: 'row'
            }}>
              <Text style={{
                color: colors.black,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
              }}>Relawan</Text>
              <View style={{
                flex: 1,
                paddingTop: 11,
              }}>
                <View style={{
                  borderTopColor: colors.black,
                  marginHorizontal: 10,
                  borderTopWidth: 1,
                }} />
              </View>
            </View>
            <View style={{
              flex: 1
            }}>


              <FlatList data={relawan} renderItem={__renderItem} />
            </View>
          </>}


        {user.level === "Relawan" &&
          <>
            <View style={{
              padding: 10,
              marginTop: 0,
              flexDirection: 'row'
            }}>
              <Text style={{
                color: colors.black,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
              }}>Perlu bantuan relawan</Text>
              <View style={{
                flex: 1,
                paddingTop: 11,
              }}>
                <View style={{
                  borderTopColor: colors.black,
                  marginHorizontal: 10,
                  borderTopWidth: 1,
                }} />
              </View>
            </View>
            <View style={{
              flex: 1
            }}>


              <FlatList data={bantuan} renderItem={__renderItemBantuan} />
            </View>
          </>}


      </ScrollView>

    </SafeAreaView>
  );
}
