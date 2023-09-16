import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../../../utils';

const InformasiDetail = ({navigation, route}) => {
  const getDataInformasi = route.data;

  console.log(getDataInformasi);

  return (
    <View style={styles.backgroundBelakang}>
      <View style={styles.informasi}>
        <Text style={styles.textInformasiAlamat}>Alamat</Text>
        <Text style={styles.detailInformasiAlamat}>
          {getDataInformasi.data.alamat_rs}
        </Text>
      </View>
      <View style={styles.informasi}>
        <Text style={styles.textInformasiAlamat}>Profil</Text>
        <Text style={styles.detailInformasiAlamat}>
          {getDataInformasi.data.deskripsi_rs}
        </Text>
      </View>
      <View style={styles.informasi}>
        <Text style={styles.textInformasiAlamat}>Fasilitas Tersedia</Text>
        <Text style={styles.detailInformasiAlamat}>
          Rumah Sakit Indramayu adalah salah satu fitur yang berada di daerah
          Indramayu.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
  informasi: {
    paddingVertical: 10,
  },
  textInformasiAlamat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  detailInformasiAlamat: {
    fontSize: 14,
    color: 'black',
    textAlign: 'justify',
  },
});

export default InformasiDetail;
