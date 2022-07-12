const xmppConfig = {
    transports: {
        websocket: "wss://xmpp.mektou.be:5281/xmpp-websocket",
        bosh :true
    },
    iceServers:[],
    host:"xmpp.mektou.be",
    resource:"rna-stanza"
}

const apiHost = "https://apiv2-staging.mektoube.fr"
const avatarHost = "http://stg.myxxjs.com:9002/api"


export  {
    xmppConfig,apiHost,avatarHost
}
