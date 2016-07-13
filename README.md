node-red-contrib-adeunis
========================

A <a href="http://nodered.org" target="_new">Node-RED</a> node to decode adeunis-rf LoRaWAN demostration payload (ARF8084BA) in JSON object.


Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

    npm install node-red-contrib-adeunis

Usage
-----

A function that converts the `msg.payload` that containt LORA binary data to a JSON object like this:
```
{ "temp": 34,
  "btn1": 0,
  "gps": true,
  "lat": 41.80000,
  "lon": 12.32888,
  "uplink": 247,
  "down": 0,
  "vbat": 3.332
}
```


LICENSE
-------

This work is released under MIT License.
