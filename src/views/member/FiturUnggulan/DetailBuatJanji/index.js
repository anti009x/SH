import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../../utils';
import StatusBarComponent from '../../../../components/StatusBar/StatusBarComponent';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import InformasiBuatJanji from '../../../member/FiturUnggulan/InformasiBuatJanji';
import InformasiDetail from '../../../member/FiturUnggulan/InformasiDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigasi from '../../../../partials/navigasi';
import {getData} from '../../../../utils';

const DetailBuatJanji = ({navigation, route, props}) => {
  const getRS = route.params;

  const layouts = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {key: 'first', title: 'Buat Janji', data: getRS},
    {key: 'second', title: 'Informasi', data: getRS},
  ]);

  const renderScene = SceneMap({
    first: InformasiBuatJanji,
    second: InformasiDetail,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      tabStyle={{elevation: 0, fontSize: 12}}
      labelStyle={{
        fontSize: 12,
        textTransform: 'capitalize',
        fontWeight: 'bold',
      }}
      indicatorContainerStyle={{backgroundColor: 'white'}}
      indicatorStyle={{backgroundColor: 'red'}}
      activeColor={'red'}
      inactiveColor={'black'}
      style={{marginTop: 10}}
    />
  );

  return (
    <View style={styles.backgroundBelakang}>
      <StatusBarComponent />
      <View
        style={{
          backgroundColor: 'white',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ImageBackground
            source={require('../../../../assets/images/gambar-rs.jpg')}
            resizeMode="cover"
            style={{width: '100%', height: 200}}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            margin: 10,
            borderRadius: 100,
            borderColor: 'black',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigasi.BUAT_JANJI);
            }}>
            <Icon
              name="ios-arrow-back"
              style={{color: 'black', fontSize: 20, padding: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 5}}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold', fontFamily: 'Poppins-Medium'}}>
          {getRS.data.nama_rs}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{flex: 1, color: 'grey', fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins-Medium'}}>
            {getRS.data.kategori_rs == 1
              ? 'Rumah Sakit Spesialis'
              : 'Rumah Sakit Umum'}
          </Text>
          <View style={{borderRadius: 10}}>
            <Text
              style={{
                color: 'black',
                backgroundColor: colors.primary,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                fontSize: 10,
                marginHorizontal: 5,
              }}>
              4.0
            </Text>
          </View>
          <View style={{borderRadius: 10}}>
            <Text
              style={{
                color: 'black',
                backgroundColor: colors.primary,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                fontSize: 10,
                marginHorizontal: 5,
                fontWeight: 'bold'
              }}>
              <Icon
                name="ios-location"
                style={{fontSize: 10, color: 'black'}}
              />{' '}
              {getRS.data.jarak} KM
            </Text>
          </View>
        </View>
        <TabView
          navigationState={{index: index, routes: routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layouts.width}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBelakang: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default DetailBuatJanji;
