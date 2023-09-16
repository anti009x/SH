import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import StatusBarComponent from '../../../../../components/StatusBar/StatusBarComponent'
import Heading from '../../../../../components/Heading'
import { baseUrl, colors, getData } from '../../../../../utils'
import axios from 'axios'
import { ActivityIndicator } from 'react-native'

const DetailListResepObat = ({ navigation, route}) => {

    const [dataPribadi, setDataPribadi] = useState({});
    const [detailData, setDetailData] = useState(null); 
    const detail = route.params;

    useEffect(() => {
        getDataUserLocal(); 
        getCetakData();
    }, [dataPribadi.token]);

    const getDataUserLocal = () => {
        getData('dataUser').then(res => {
            setDataPribadi(res);
        });
    };

    const getCetakData = async () => {
        try {
            const response = await axios({
                url: `${baseUrl.url}/resep/obat/${detail.data.id_resep_obat}`,
                headers: {
                    Authorization: 'Bearer ' + dataPribadi.token
                },
                method: "GET"
            })

            setDetailData(response.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.background}>
            <StatusBarComponent/>
            <Heading textHeading={`Detail Transaksi ${detail.data.id_resep_obat}`} navigasi={() => {
                navigation.goBack();
            }} />
            {detailData == null ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                detailData.length > 0 ? (
                    <Text style={{color: 'black'}}>
                        Hamdan
                    </Text>
                ) : (
                    <Text style={{color: 'black'}}>
                        Mohammad
                    </Text>
                )
            ) }
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default DetailListResepObat;