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

    // testing with maplaunch.js
    // window.plugins.launcher.coolMethod("pass message to android",  
    //   function(data){
    //     alert (data);
    //     return false;
    //   }, 
    //   function(errorMsg) {
    //     //errorCallback 
    //     alert("Error! " + errorMsg);
    //     return;
    //   });
      
    
    var mapParms = {
      stops: [ {name: "start at mvp brownwood ", gisLong: -82.02373937, gisLat: 28.84617393},
                {name:"2886 Petoskey PL.", gisLong: -82.027396242, gisLat: 28.848607530 },
                {name:"5748 BARRAW TERRACE", gisLong: -81.969576550, gisLat: 28.793533750} ],
      
      travelType: 0 // car 0, golf cart 1
    };    

    if (window.cordova.platformId == "android"){
        // call map library.
        window.plugins.launcher.launch({
          packageName: "com.thevillages.maplib",
          activityName: "com.thevillages.maplib.MapNavActivity",
          extras: [
            {name: "start at mvp brownwood ", gisLong: -82.02373937, gisLat: 28.84617393, dataType: "VillageLocation"},
            {name:"2886 Petoskey PL.", gisLong: -82.027396242, gisLat: 28.848607530,dataType: "VillageLocation" },
            {name:"5748 BARRAW TERRACE", gisLong: -81.969576550, gisLat: 28.793533750, dataType: "VillageLocation"}, 
            {name: "travelType", value: 0, dateType: "integer"}           
          ]
        }, 
        function(data){
          alert ("success " + data);
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
