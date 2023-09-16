import Pusher from "@pusher/pusher-websocket-react-native";

const pusherconfig = new Pusher({
    appId: 1608726,
    key: '479649479fb239e1fd25',
    secret: '568cff8a2236ccd99f37',
    cluster: 'ap1',
    encrypted: true
})

export default pusherconfig;