btnToggleDetails = document.querySelector("#btn-toggle-details");
btnToggleMuteall = document.querySelector("#btn-toggle-muteall");
btnMuteThese = document.querySelector("#mutethese");

var connection = new RTCMultiConnection();

// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

// if you want audio+video conferencing
connection.session = {
    audio: true,
    video: true
};

btnToggleDetails.onclick = function() {
    var numberOfUsers = connection.getAllParticipants().length;
    var UIDs=[]
    connection.getAllParticipants().forEach(function(participantId) {
        var user = connection.peers[participantId];
        hisUID = user.userid;
        UIDs.push(hisUID)
        // alert(hisUID + ' connected with you.');
    });

    // var streamByUserId = connection.streamEvents.selectFirst({ userid: hisUID }).stream;
    // streamByUserId.mute();

    console.log(numberOfUsers + ' users connected with you.\n' + 'Their Ids are: ' + UIDs);
};

var muteVar = true;
btnToggleMuteall.onclick = function() {
    if(muteVar){
        connection.attachStreams[0].mute('both');
        muteVar = false;
    }
    else{
        connection.attachStreams[0].unmute('both');
        muteVar = true;
    }
};

btnMuteThese.onclick = function() {
    var tobemuted = document.getElementById("mutesome").value.split(",");
    
    tobemuted.forEach(mutethem);

    function mutethem(id) {
        var streamByUserId = connection.streamEvents.selectFirst({ userid: id }).stream;
        streamByUserId.mute();
    }
};

connection.openOrJoin('Test-Room');