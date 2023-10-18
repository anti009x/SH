import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../utils/colors';
import StatusBarComponent from '../../../components/StatusBar/StatusBarComponent';
import { getData } from '../../../utils';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Navigasi from '../../../partials/navigasi';
import { baseUrl } from '../../../utils';
import ButtonAllData from '../../../components/ButtonAllData';
import ListFitur from '../../../components/ListFitur';
import LinearGradient from 'react-native-linear-gradient';

const DashboardMember = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [alamat, setAlamat] = useState(null);
  const [dataPribadi, setDataPribadi] = useState({});
  const [artikel, setArtikel] = useState(null);
  const [kategori, setKategori] = useState(null);
  const [kategoriArtikel, setKategoriArtikel] = useState(null);
  const [option, setoption] = useState("KT-A-2003061");
  const currenttime = new Date().getHours();
  let greeting;

  if (currenttime < 10) {
    greeting = "Selamat Pagi";
  } else if (currenttime < 15) {
    greeting = "Selamat Siang";
  } else if (currenttime < 18) {
    greeting = "Selamat Sore";
  } else {
    greeting = "Selamat Malam";
  }

  useEffect(() => {
    const getDataUserLocal = () => {
      getData('user').then(res => {
        setUser(res);
      });
      getData('dataUser').then(res => {
        setDataPribadi(res);
      });
    };

    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      dataLokasi();
      dataartikel();
      dataKategori();
    });

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.nama, dataPribadi.token]);

  const dataartikel = async () => {
    try {
      const response = await axios({
        url: `${baseUrl.url}/master/artikel`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      })

      const promises = response.data.data.map(async (item) => {
        const responsedata = await axios({
          url: `${baseUrl.url}/master/grouping_artikel/${item.id_artikel}/get`,
          headers: {
            Authorization: 'Bearer ' + dataPribadi.token
          },
          method: "GET"
        });

        return responsedata.data.data;
      });

      const result = await Promise.all(promises);

      setArtikel(response.data.data);
      setKategoriArtikel(result.flat());
    } catch (error) {
      console.log(error);
    }
  };

  const dataKategori = async () => {
    setoption("KT-A-2003061");
    try {
      const response = await axios({
        url: `${baseUrl.url}/master/kategori_artikel`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token
        },
        method: "GET"
      });
      setKategori(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dataLokasi = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izinkan Mengambil Data Lokasi',
          message: 'Izinkan Mengambil Data Lokasi Untuk Pengiriman',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          axios
            .get(url)
            .then((response) => {
              setAlamat(response.data.address.village)
            }).catch((error) => {
              console.log(error);
            })
        });
      } else {
        console.log('Tidak Ditemukan ');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const klikKategori = async (id_kategori_artikel) => {
    setoption(id_kategori_artikel);

    const response = await axios({
      url: `${baseUrl.url}/master/grouping_artikel/${id_kategori_artikel}/kategori`,
      headers: {
        Authorization: 'Bearer ' + dataPribadi.token
      },
      method: "GET"
    });

    setArtikel(response.data.data)
  }

  return (
    <View style={styles.background}>
      <StatusBarComponent />
      <View style={{ height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#051f84' }}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            flexDirection: 'row',
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 2 }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
              {greeting} , {dataPribadi.nama}
            </Text>
          </View>
          <View
            style={{ justifyContent: 'center', alignItems: 'flex-end', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name="md-location-outline"
                style={{ fontSize: 20, color: 'white' }}
              />
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-Medium',
                  marginLeft: 5,
                }}>
                {alamat}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 20, marginHorizontal: 10, borderRadius: 10, elevation: 5, marginBottom: 10, backgroundColor: '#051f84' }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <Image source={require("../../../assets/images/people.png")} style={{ width: 50, height: 50, borderRadius: 100, borderColor: 'white', borderWidth: 1 }} />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 2, marginLeft: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-Medium' }}>
              {dataPribadi.email}
            </Text>
            <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Poppins-Medium', fontSize: 12 }}>
              {dataPribadi.nomor_hp}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{ paddingTop: 0, paddingHorizontal: 10 }}>
          <View>
            <Text style={styles.judulTextMenu}>Fitur Unggulan Kami</Text>
          </View>
        </View>
        <View style={styles.cardFitur}>
          <ListFitur
            onPress={() => {
              navigation.replace(Navigasi.CHAT_DOKTER)
            }}
            nameIcon={"chatbubble-ellipses-sharp"}
            textfitur={"Chat Ahli"}
          />
          <ListFitur
            onPress={() => {
              navigation.replace(Navigasi.BUAT_JANJI)
            }}
            nameIcon={"git-network"}
            textfitur={"Buat Janji"}
          />
          <ListFitur
            onPress={() => {
              navigation.replace(Navigasi.RESERVASI)
            }}
            nameIcon={"book"}
            textfitur={"Antrian Saya"}
          />
          <ListFitur
            onPress={() => {
              navigation.replace(Navigasi.TOKO_KESEHATAN_PRODUK)
            }}
            nameIcon={"medkit"}
            textfitur={"Toko Sekitar"}
          />
           <ListFitur
            onPress={() => {
              navigation.replace(Navigasi.CHATBOT)
            }}
            nameIcon={""}
            textfitur={"ChatBot"}
          />
            <ListFitur
            onPress={() => {
              navigation.replace(Navigasi.DIAGNOSA)
            }}
            nameIcon={""}
            textfitur={"Diagnosa"}
          />
        </View>
        

        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={styles.judulTextMenu}>Beberapa Artikel</Text>
          </View>
          <ButtonAllData onPress={() => {
            navigation.navigate(Navigasi.ALL_ARTIKEL)
          }} textButton={"Lihat Semua"} />
        </View>

        {kategori == null ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <View style={{ marginHorizontal: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {kategori.map((item) => {
                return (
                  <TouchableOpacity key={item.id_kategori_artikel} onPress={() => {
                    klikKategori(item.id_kategori_artikel)
                  }}>
                    <View
                      style={[styles.viewkategori, item.id_kategori_artikel == option ? styles.active : styles.non_active]}
                    >
                      <Text
                        style={[styles.textkategori, item.id_kategori_artikel == option ? styles.text_active : styles.non_active]}>
                        {item.nama_kategori.toUpperCase()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
        )}

        {artikel == null ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {artikel.map((item) => {
              return (
                <TouchableOpacity key={item.id_artikel} onPress={() => {
                  navigation.replace(Navigasi.DETAIL_ARTIKEL, {
                    data: item
                  })
                }}>
                  <View style={styles.viewartikel}>
                    <View style={styles.viewimage}>
                      <Image
                        source={item.foto == null ? (require("../../../assets/images/gambar-rs.jpg")) : { uri: item.foto }}
                        resizeMode='cover'
                        style={styles.image}
                      />
                    </View>
                    <Text style={styles.judulartikel} numberOfLines={1} ellipsizeMode={'tail'}>
                      {item.judul_artikel}
                    </Text>
                    <Text style={styles.deskripsi} numberOfLines={1} ellipsizeMode={'tail'}>
                      {item.deskripsi}
                    </Text>
                    {kategoriArtikel == null ? (
                      <ActivityIndicator size={'large'} />
                    ) : (
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        {kategoriArtikel.map((datakategori) => {
                          return (
                            item.id_artikel == datakategori.id_artikel ? (
                              <View key={datakategori.id_grouping_artikel} style={{ marginTop: 15, marginHorizontal: 10 }}>
                                <View style={styles.kategori}>
                                  <Text style={styles.textkategori}>
                                    {datakategori.nama_kategori.toUpperCase()}
                                  </Text>
                                </View>
                              </View>
                            ) : (
                              <View key={datakategori.id_grouping_artikel} />
                            )
                          )
                        })}
                      </ScrollView>
                    )}
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white'
  },
  heading: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    padding: 15,
    height: 50,
  },
  textHeading: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: colors.textHeading,
  },
  locationHeading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  judulTextMenu: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  cardFitur: {
    paddingVertical: 10,
    backgroundColor: colors.background,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  produk: {
    width: 200,
    height: 100,
    paddingTop: 10,
    marginBottom: 40,
    borderRadius: 10,
    marginLeft: 15,
  },
  cardProduk: {
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    borderColor: '#D8D8D8',
    borderWidth: 2,
  },
  deskripsi: {
    color: 'gray',
    paddingHorizontal: 10,
    textAlign: 'justify',
  },
  cardContent: {
    backgroundColor: 'white',
    elevation: 2,
    width: 120,
    height: 150,
    borderRadius: 5,
    marginRight: 15,
  },
  cardContentKosong: {
    backgroundColor: 'white',
    elevation: 5,
    width: 60,
    height: 150,
    borderRadius: 5,
    marginRight: 15,
  },
  cardImage: {
    width: 120,
    height: 100,
    backgroundColor: colors.backgroundEmpty,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignSelf: 'center',
  },
  textContent: {
    color: 'black',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  viewCard: {
    marginTop: 15,
    backgroundColor: 'white',
    elevation: 5,
    height: 300,
    width: 200,
    borderRadius: 10,
  },
  viewartikel: {
    backgroundColor: 'white',
    height: 320,
    width: 300,
    elevation: 5,
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 90,
    borderRadius: 10,
  },
  viewimage: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  judulartikel: {
    color: 'black',
    paddingHorizontal: 10,
    paddingTop: 10,
    fontWeight: 'bold',
    textAlign: 'justify',
    fontSize: 16,
    fontFamily: 'Poppins-Medium'
  },
  deskripsi: {
    color: 'gray',
    paddingHorizontal: 10,
    textAlign: 'justify',
  },
  kategori: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center'
  },
  textkategori: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: 'blue',
    paddingHorizontal: 10
  },
  viewkategori: {
    marginTop: 10,
    marginLeft: 5,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'blue',
  },
  non_active: {
    backgroundColor: 'white',
  },
  text_active: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  text_non_active: {
    fontWeight: "bold",
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Medium'
  }
});

export default DashboardMember;
