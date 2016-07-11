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



            msg.payload.length


            msg.payload = ret;

            node.send(msg);
        });
    }
    RED.nodes.registerType("adeunis-rf",LowerCaseNode);
}
