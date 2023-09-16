// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import {colors, getData, baseUrl} from '../../../../../utils';
// import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Navigasi from '../../../../../partials/navigasi';
// import axios from 'axios';

// const SpesialisDokter = ({navigation, route}) => {
//   const getSpesialis = route.params;

//   const [dataPribadi, setDataPribadi] = useState({});
//   const [dokter, setDokter] = useState([]);
//   const [showIndicator, setShowIndicator] = useState(false);
//   const [output, setOutput] = useState(false);

//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       getDataUserLocal();
//       dataDokter();
//     }, 300);

//     return () => clearTimeout(debounceTimeout);
//   }, [dataPribadi.token]);

//   const getDataUserLocal = () => {
//     getData('dataUser').then(res => {
//       setDataPribadi(res);
//     });
//   };

//   const dataDokter = async () => {
//     try {
//       setShowIndicator(true);
//       const response = await axios({
//         url: `${baseUrl.url}/master/spesialis/${getSpesialis.data.penyakit.id_penyakit}/${getSpesialis.data.id_rumah_sakit}`,
//         headers: {
//           Authorization: 'Bearer ' + dataPribadi.token,
//         },
//         method: 'GET',
//       });

//       if (response.data.data.length === 0) {
//         setTimeout(() => {
//           setOutput(true);
//           setShowIndicator(false);
//         }, 1000);
//       } else {
//         setTimeout(() => {
//           setShowIndicator(false);
//           setDokter(response.data.data);
//         }, 1000);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View style={styles.backgroundBelakang}>
//       <StatusBarComponent />
//       <View style={styles.heading}>
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate(Navigasi.BUAT_JANJI);
//             }}>
//             <Icon name="arrow-back" style={{fontSize: 20, color: 'black'}} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.viewHeading}>
//           <Text style={styles.textHeading}>
//             {getSpesialis.data.penyakit.nama_spesialis}
//           </Text>
//         </View>
//       </View>

//       {dokter.length ? (
//         <FlatList
//           data={dokter}
//           showsVerticalScrollIndicator={false}
//           renderItem={({item}) => (
//             <>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   paddingHorizontal: 15,
//                   paddingVertical: 10,
//                 }}>
//                 <View style={styles.cardImage}>
//                   <Image
//                     source={require('../../../../../assets/images/people.png')}
//                     resizeMode="cover"
//                     style={styles.image}
//                   />
//                 </View>
//                 <View style={styles.cardDetailDokter}>
//                   <Text
//                     style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>
//                     Mohammad
//                   </Text>
//                   <Text style={{color: 'gray', fontSize: 12}}>
//                     Dr. Bedah, Ahli Saraf
//                   </Text>
//                   <View style={{flexDirection: 'row', paddingVertical: 10}}>
//                     <View style={styles.backgroundCardChild}>
//                       <Text style={styles.textCardChild}>17 Tahun</Text>
//                     </View>
//                     <View
//                       style={[styles.backgroundCardChild, {marginLeft: 10}]}>
//                       <Text style={styles.textCardChild}>100 %</Text>
//                     </View>
//                   </View>
//                   <View style={{flexDirection: 'row', paddingVertical: 5}}>
//                     <View style={{flex: 1, paddingTop: 5}}>
//                       <Text style={{color: 'black', fontSize: 12}}>
//                         Rumah Sakit Pertamina
//                       </Text>
//                     </View>
//                     <View
//                       style={[styles.backgroundCardChild, {marginLeft: 10}]}>
//                       <Text style={styles.textCardChild}>
//                         <Icon name="ios-location" style={{color: 'black'}} />{' '}
//                         3.2 KM
//                       </Text>
//                     </View>
//                   </View>
//                   <View style={{flexDirection: 'row', paddingVertical: 5}}>
//                     <View style={{flex: 1}}>
//                       <Text style={{color: 'red', fontSize: 12}}>
//                         Bayar di Rumah Sakit
//                       </Text>
//                       <Text style={{color: 'black'}}>Rp. 150.000</Text>
//                     </View>
//                     <TouchableOpacity
//                       style={{
//                         backgroundColor: 'blue',
//                         paddingHorizontal: 20,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         borderRadius: 5,
//                       }}>
//                       <Text
//                         style={{
//                           color: 'white',
//                           fontSize: 12,
//                           fontWeight: 'bold',
//                         }}>
//                         Pilih
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//               <View style={styles.garis} />
//             </>
//           )}
//         />
//       ) : showIndicator ? (
//         <View style={{marginVertical: 10}}>
//           <ActivityIndicator size={'large'} color={colors.primary} />
//         </View>
//       ) : output ? (
//         <View
//           style={{
//             marginVertical: 10,
//             justifyContent: 'center',
//             alignItems: 'center',
//             flex: 1,
//           }}>
//           <Icon name="search" style={{fontSize: 50, color: colors.primary}} />
//           <Text
//             style={{
//               color: colors.primary,
//               textAlign: 'center',
//               fontWeight: 'bold',
//               fontSize: 18,
//             }}>
//             Maaf, Dokter Tidak Tersedia
//           </Text>
//           <Text style={{color: 'black', fontSize: 14}}>
//             Silahkan Cari Dokter Di Rumah Sakit Lain.
//           </Text>
//         </View>
//       ) : (
//         <View />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundBelakang: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   heading: {
//     backgroundColor: colors.backgroundPutih,
//     flexDirection: 'row',
//     padding: 15,
//     height: 50,
//     elevation: 5,
//   },
//   viewHeading: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingLeft: 10,
//   },
//   textHeading: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   cardImage: {
//     width: 100,
//     height: 150,
//     borderColor: 'black',
//     borderWidth: 1,
//     overflow: 'hidden',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   cardDetailDokter: {
//     marginHorizontal: 10,
//     flex: 1,
//   },
//   backgroundCardChild: {
//     backgroundColor: colors.backgroundCardChildren,
//     padding: 5,
//     borderRadius: 5,
//   },
//   textCardChild: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   garis: {
//     borderWidth: 1,
//     borderColor: colors.garis,
//     marginHorizontal: 10,
//   },
// });

// export default SpesialisDokter;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SpesialisDokter = () => {
  return (
    <View>
      <Text style={{color: 'black'}}>
        Hamdan
      </Text>
    </View>
  )
}

export default SpesialisDokter;