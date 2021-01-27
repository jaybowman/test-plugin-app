/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    document.getElementById('testBtn').addEventListener('click', buttonclick);
}

function buttonclick () {
    console.log("hello apple Plugin button clicked");
    var mapParms = {
      address: "Cane Garden Country club",
      gisLong: -81.99463648,
      gisLat: 28.89330536,
      travelType: 0 
    };

    if (window.cordova.platformId == "android"){
        // call map library.
        window.plugins.launcher.launch({
          packageName: "com.thevillages.testplugin",
          activityName: "com.thevillages.maplibrary.MapNavActivity",
          extras: [
              {"name": "ADDRESS", "value": mapParms.address, "dataType": "String"},
              {"name": "GISLAT", "value": mapParms.gisLat, "dataType": "Double"},
              {"name": "GISLONG", "value": mapParms.gisLong, "dataType": "Double"},
              {"name": "TRAVEL_TYPE", "value": mapParms.travelType, "dataType": "Int"}
          ]
        }, 
        function(data){
          return false;
        }, function(errorMsg) {
          //errorCallback 
          alert("Error! " + errorMsg);
        });
    } else {

    window.plugins.launcher.launch(
        mapParms,
        function(msg) {
          console.log("On success launch" + msg);
          document
            .getElementById('deviceready')
            .querySelector('.received')
            .innerHTML = msg;
        },
        function(err) {
          console.log("On error launch" + err);
          
          document
            .getElementById('deviceready')
            .innerHTML = '<p class="event received">' + err + '</p>';
        }
      );
      }
}
