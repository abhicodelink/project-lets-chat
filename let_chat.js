const firebaseConfig = {
    apiKey: "AIzaSyBOmOhIwyN5fZDuS5AYD5tyGx3DPKGQloY",
    authDomain: "lets-chat-2a1b6.firebaseapp.com",
    databaseURL: "https://lets-chat-2a1b6-default-rtdb.firebaseio.com",
    projectId: "lets-chat-2a1b6",
    storageBucket: "lets-chat-2a1b6.appspot.com",
    messagingSenderId: "559493643161",
    appId: "1:559493643161:web:83d8bbde975fae41963108",
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

window.onload = function() {
   
        var room = localStorage.getItem('room_name');
        var user = localStorage.getItem('user_name');
        if (room == null){
            Swal.fire({
                icon: 'error',
                title: 'Not Allowed!',
                text: 'Looks like you have not joined any room yet. So, you cannt view this page.',
                footer: 'Please first Go To The Rooms Page',
                confirmButtonText:
    'Continue <i class="fa fa-arrow-right"></i>',
    allowOutsideClick:false
            }).then(function(){
                window.location = "let_chat_room.html";
            })
        }
        else if (user == null){
            Swal.fire({
                icon: 'error',
                title: 'Not Allowed!',
                text: 'Looks like you have not logged in yet. Sorry, we cannot allow outsiders',
                footer: 'Please login first',
                confirmButtonText:
    'Continue <i class="fa fa-arrow-right"></i>',
    allowOutsideClick:false
            }).then(function(){
                window.location = "let_chat_room.html";
            })
        }
        else {
            startLetsChat(room);
        }
}

function leave(){
    localStorage.removeItem('room_name');
    window.location = "let_chat_room.html";
}


function startLetsChat(room){
 room = room;
 document.getElementById("room_name").innerHTML = room;
 reloadChat(room);

}

function send(){
    var msg = document.getElementById("chat-int");

    if (msg.value == ""){
        Swal.fire({
            icon:'warning',
            title:'Cannot Send Message',
            text:'Message Cannot Be Empty'
        })
    }
    else {

        var room = localStorage.getItem('room_name');
       var user = localStorage.getItem('user_name');
            firebase.database().ref('rooms').child(room).push({
              by: user,
              message: msg.value
            });
          
            msg.value = "";
          } 
        
      reloadChat(room);
    }

function reloadChat(room){
    var output = document.getElementById("chat_box");
    output.innerHTML = "";
    firebase.database().ref('rooms').child(room).on('child_added', function(snapshot) {
        if (snapshot.key !== 'purpose') {
          var data = snapshot.val();
          var by = data.by + ": "
          var msg = data.message;
          var html = '<div class="chat"><h3>'+by+'</h3><p>'+msg+'</p></div>';
          output.innerHTML += html;
        }
      });
}