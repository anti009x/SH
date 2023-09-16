import axios from "axios";
import base64 from "react-native-base64";

export const configure = (apiKey) => {
    const encodeAuth = base64.encode(apiKey);

    axios.defaults.headers.common['Content-Type'] = "application/json";
    axios.defaults.headers.common["Authorization"] = `Basic ${encodeAuth}`;
}

export const createPayment = async (data) => {

    try {
        const response = await axios.post('https://api.xendit.co/v2/invoices', data);
        
        return response.data;

    } catch (error) {
        throw(error);
    }
}