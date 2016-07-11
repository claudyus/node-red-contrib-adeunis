module.exports = function (RED) {
    function AdeunisRF(config) {

        RED.nodes.createNode(this, config);
        var node = this;

        this.on('input', function(msg) {

            var ret = {};

            status = msg.payload[0];
            temp_is_present = status & 0x80;
            acc_is_present = status & 0x40;
            btn1_is_present = status & 0x20;
            gps_is_present = status & 0x10;

            up_is_present = status & 0x08;
            down_is_present = status & 0x04;
            batt_is_present = status & 0x02;
            rssi_is_present = status & 0x01;

            ret.temp = msg.payload[1]
            ret.btn1 = btn1_is_present

            // work on gps data
            if (gps_is_present) {
                shift = 8
                ret.gps=true
                ret.lat = ((msg.payload[2] & 0xF0 ) >> 4)*10 + (msg.payload[2] & 0x0F)
                ret.lat += ((((msg.payload[3] & 0xF0 ) >> 4)*10 + (msg.payload[3] & 0x0F) +
                             (((msg.payload[4] & 0xF0) >> 4) / 10) +
                             ((msg.payload[4] & 0x0F) / 100 ) +
                             ((msg.payload[5] & 0xF0) >> 4) /1000)) /60

                ret.lon = ((msg.payload[6] & 0xF0 ) >> 4)*100 + (msg.payload[6] & 0x0F )*10 + ((msg.payload[7] & 0xF0) >> 4) // degree
                ret.lon += (((msg.payload[7] & 0x0F )* 10 + ((msg.payload[8] & 0xF0) >> 4) +
                             ((msg.payload[8] & 0x0F) / 10) + ((msg.payload[9] & 0xF0) >> 4) / 100)) /60

            } else {
                shift = 0
                ret.gps=false
            }

            ret.uplink = msg.payload[2+shift];
            ret.down = msg.payload[3+shift];
            ret.batt = msg.payload[4+shift] << 8 + msg.payload[5+shift];
            // TODO add RSSI / SNR

            msg.raw = msg.payload;
            msg.payload = ret;

            node.send(msg);
        });
    }
    RED.nodes.registerType("adeunis-rf",AdeunisRF);
}
