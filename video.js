// 4. Create a user agent and connect.
var inviteButton = document.getElementById('invite');
var remoteMedia = document.getElementById('remote');
var remoteVideo = document.getElementById('remote-video');

var destination = document.getElementById('destination');

var ua = new SIP.Web.Simple({
  ua: {
    traceSip: true,
    uri: 'sip:shahdk@shahdkouraa.onsip.com',
    wsServers: 'wss://edge.sip.onsip.com',
    authorizationUser: 'shahdkouraa',
    password: 'u4aJQLoUGvdp5frj'
  },
  media: {
    remote: {
      audio: remoteMedia,
      video: remoteVideo  // <-- Add this line
    }
  }
});

const options = {
  audio: true,  
  video: true
};

remoteMedia.volume = 0.5;
var session;

inviteButton.addEventListener('click', function () {
  inviteButton.disabled = true;
  
  session = ua.call(destination.value, options);
  
  //session = ua.call('amira@amiraa.onsip.com');

  addListeners();
}, false);

function addListeners() {
  session.on('progress', function () {
    inviteButton.innerHTML = 'Ringing...';
  });

  session.on('accepted', function () {
    inviteButton.innerHTML = 'Connected!';
  });

  session.on('failed', function () {
    inviteButton.innerHTML = 'Call failed. Try again?';
    inviteButton.disabled = false;
  });

  session.on('bye', function () {
    inviteButton.innerHTML = 'Bye! Invite Another?';
    inviteButton.disabled = false;
  });
}

var endCall = document.getElementById('end-call');
endCall.addEventListener('click', function () {
    session.terminate();
});

// var mute = document.getElementById('mute');
// mute.addEventListener('click', function () {
//   if (mute.classList.contains('on')) {
//     ua.unmute();
//     mute.classList.remove('on');
//   } else {
//     ua.mute();
//     mute.classList.add('on');
//   }
// }, false);