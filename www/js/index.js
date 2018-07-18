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
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        alam();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
var setWakeup = function(m,h) {
    window.wakeuptimer.wakeup(successCallback,
        errorCallback,
        // a list of alarms to set
        {
            alarms: [{
                type: 'onetime',
                time: {hour: m, minute: h},
                extra: {message: 'json containing app-specific information to be posted when alarm triggers'},
                message: 'Alarm has expired!'
            }]
        }
    );
}

// snooze...
var setsnooze = function() {
    window.wakeuptimer.snooze(successCallback,
        errorCallback,
        {
            alarms: [{
                type: 'snooze',
                time: {seconds: 60}, // snooze for 60 seconds
                extra: {}, // json containing app-specific information to be posted when alarm triggers
                message: this.get('message'),
                sound: this.get('sound'),
                action: this.get('action')
            }]
        }
    );
}

// example of a callback method
var successCallback = function(result) {
    if (result.type==='wakeup') {
        console.log('wakeup alarm detected--' + result.extra);
    } else if(result.type==='set'){
        console.log('wakeup alarm set--' + result);
    } else {
        console.log('wakeup unhandled type (' + result.type + ')');
    }
};

// example of a callback method
var errorCallback = function(result) {
    if (result.type==='wakeup') {
        console.log('wakeup alarm detected--' + result.extra);
    } else if(result.type==='set'){
        console.log('wakeup alarm set--' + result);
    } else {
        console.log('wakeup unhandled type (' + result.type + ')');
    }
};

function alam() {
    setInterval(function(){
        cordova.plugins.notification.local.schedule({
            title: 'Do you want to go see a movie tonight?',
            actions: [{ id: 'yes', title: 'Yes' }]
        });
    },10000);
    cordova.plugins.notification.local.on('yes', function (notification, eopts) {
        console.log(notification);
        console.log(eopts);
    });

    cordova.plugins.notification.local.on('add', function(){
        console.log('add');
    }, this);
    cordova.plugins.notification.local.on('trigger', function(){
        console.log('trigger');
    }, this);
    cordova.plugins.notification.local.on('click', function(){
        console.log('click');
    }, this);
    cordova.plugins.notification.local.on('clear', function(){
        console.log('clear');
    }, this);
    cordova.plugins.notification.local.on('cancel', function(){
        console.log('cancel');
    }, this);
    cordova.plugins.notification.local.on('update', function(){
        console.log('update');
    }, this);
    cordova.plugins.notification.local.on('clearall', function(){
        console.log('clearall');
    }, this);
    cordova.plugins.notification.local.on('cancelall', function(){
        console.log('cancelall');
    }, this);
}