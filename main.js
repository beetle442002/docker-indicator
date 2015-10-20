var menubar = require('menubar');
var Docker  = require('dockerode');
var fs      = require('fs');
var docker  = new Docker();

var mb = menubar({
  dir: __dirname + "/src",
  preloadWindow: true,
  icon: __dirname + "/IconTemplate@2x.png"
});

var lastConnectionStatus = null;

function setIcon() {
  docker.ping((err, data) => {

    if (lastConnectionStatus === null && data == 'OK') {
      var NativeImage = require('native-image');
      var image = NativeImage.createFromPath(__dirname + "/IconTemplate@2x.png");
      mb.tray.setImage(image);
      lastConnectionStatus = 'OK';

      // console.log('connected');
      // mb.window.webContents.send('ping', 'connected!');
    }

    if (lastConnectionStatus === 'OK' && data == null) {
      var NativeImage = require('native-image');
      var image = NativeImage.createFromPath(__dirname + "/IconOffTemplate@2x.png");
      mb.tray.setImage(image);
      lastConnectionStatus = null;
    }
  });
}


mb.once('show', function () {
  // mb.window.openDevTools();
});

mb.on('ready', function ready () {
  // receive events from the page
  // var ipc = require('ipc');
  // ipc.on('asynchronous-message', function(event, arg) {
  //   console.log(arg);  // prints "ping"
  //   event.sender.send('asynchronous-reply', 'pong');
  // });

  // ipc.on('synchronous-message', function(event, arg) {
  //   console.log(arg);  // prints "ping"
  //   event.returnValue = 'pong';
  // });

  setInterval(setIcon, 1000);

});


mb.on('show', function () {
  //send events to the page
  // mb.window.webContents.send('ping', 'whoooooooh!');

});

//sdg