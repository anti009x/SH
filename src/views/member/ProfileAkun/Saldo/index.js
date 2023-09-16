import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {colors, getData, baseUrl} from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../partials/navigasi';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

const Saldo = ({navigation}) => {
  const [bank, setBank] = useState('');
  const [dataPribadi, setDataPribadi] = useState({});
  const [saldo, getSaldo] = useState({
    saldo_akhir: 0,
    value_saldo: 0,
  });
  const [defaultValue, setDefaultValue] = useState('');
  const dispatch = useDispatch();

  const banks = [
    {key: '1', value: 'Bank Rakyat Indonesia'},
    {key: '2', value: 'Bank Negara Indonesia'},
  ];

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      getDataUserLocal();
      ambilSaldo();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [dataPribadi.token]);

  const getDataUserLocal = () => {
    getData('dataUser').then(res => {
      console.log(res);
      setDataPribadi(res);
    });
  };

  const ambilSaldo = async () => {
    try {
      await axios({
        url: `${baseUrl.url}/akun/profil/konsumen/update_saldo`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'GET',
      })
        .then(response => {
          getSaldo(response.data.data);
          setDefaultValue(response.data.data.bank_code);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaldo = saldoBaru => {
    getSaldo({
      saldo_akhir: saldo.saldo_akhir,
      value_saldo: saldoBaru,
    });
  };

  const simpanSaldo = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    try {
      await axios({
        url: `${baseUrl.url}/akun/profil/konsumen/update_saldo`,
        headers: {
          Authorization: 'Bearer ' + dataPribadi.token,
        },
        method: 'PUT',
        data: {
          saldo: saldo.value_saldo.toString(),
        },
      })
        .then(response => {
          dispatch({type: 'SET_LOADING', value: false});
          showMessage({
            message: 'Berhasil',
            description: response.data.pesan,
            type: 'success',
          });
          navigation.navigate(Navigasi.PROFILE_MEMBER);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View style={styles.heading}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Navigasi.PROFILE_MEMBER);
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="arrow-back" style={{color: 'black', fontSize: 20}} />
            <Text style={{color: 'black', marginLeft: 10}}>
              Saldo Anda Sekarang
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.alert}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[styles.judul, {flex: 1}]}>Catatan :</Text>
            <View style={styles.manualMode}>
              <Text style={styles.textManualMode}>Manual Mode</Text>
            </View>
          </View>
          <Text style={styles.subJudul}>
            " Sistem pembayaran yang kami terapkan adalah Dompet Digital. "{' '}
          </Text>
        </View>
        <View style={styles.saldo}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.judulSaldo}>Total Saldo Akhir</Text>
            <Text style={styles.totalSaldo}>Rp. {saldo.saldo_akhir}</Text>
          </View>
        </View>
        <View style={styles.isiSaldo}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitleContent}>Saldo</Text>
            <TextInput
              placeholder="Masukkan Jumlah Saldo Anda"
              placeholderTextColor="gray"
              style={styles.textInput}
              // value={saldo.value_saldo.toString() == null ? '0' : '1'}
              onChangeText={handleSaldo}
            />
          </View>
          {/* <View style={styles.cardContent}>
            <Text style={styles.cardTitleContent}>Rekening Bank</Text>
            <SelectList
              setSelected={val => setBank(val)}
              data={banks}
              search={false}
              defaultValue={defaultValue}
              inputStyles={{color: 'black'}}
              dropdownTextStyles={{color: 'black'}}
              save="value"
            />
          </View> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              simpanSaldo();
            }}>
            <Text style={styles.textButton}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    backgroundColor: colors.background,
    elevation: 5,
    padding: 15,
    height: 50,
  },
  content: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  alert: {
    backgroundColor: colors.alertSuccess,
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 15,
  },
  judul: {
    fontWeight: 'bold',
    paddingLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  subJudul: {
    color: 'white',
    fontSize: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'justify',
  },
  saldo: {
    marginVertical: 10,
  },
  judulSaldo: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    alignItems: 'center',
  },
  totalSaldo: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    flex: 1,
    alignItems: 'center',
    textAlign: 'right',
  },
  isiSaldo: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 40,
  },
  cardContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 12,
    color: 'black',
  },
  cardTitleContent: {
    color: 'gray',
    fontSize: 16,
    paddingBottom: 5,
  },
  button: {
    backgroundColor: 'green',
    marginHorizontal: 10,
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textButton: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  manualMode: {
    backgroundColor: '#CDE829',
    marginRight: 10,
    padding: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textManualMode: {
    color: 'black',
    fontSize: 10,
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default Saldo;
