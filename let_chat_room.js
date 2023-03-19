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
var username = localStorage.getItem("user_name");
document.getElementById("name").innerHTML = username;

function create() {
  var room_name = document.getElementById("room_int").value;
  localStorage.setItem("room_name", room_name);
};

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
};

function create(){
  var name = document.getElementById("room_int");
  
  if (name.value == ""){
    
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Room Name Cant Be Blank',
      footer: 'Please put a room name in the input field first'
    });
  }
  else {
    
    var room_name = name.value;
    name.value = "";
    firebase.database().ref('rooms').child(room_name).set({
      purpose:"added les-chat room"
    });

    localStorage.setItem('room_name', room_name);
    window.location = "let_chat.html";
  };
};


window.onload = function(){
var user = localStorage.getItem('user_name');
  if (user == null){
    Swal.fire({
      icon: 'error',
      title: 'Not Allowed!',
      text: 'Looks like you have not logged in yet. Sorry, we cannot allow outsiders',
      footer: 'Please login first',
      confirmButtonText:
'Continue <i class="fa fa-arrow-right"></i>',
allowOutsideClick:false
  }).then(function(){
      window.location = "index.html";
  })
  }
  
  else {
    firebase.database().ref('rooms').once('value').then(function(snapshot){
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(child => {
        var childKey = child.key;
        Room_Name = childKey;
        var html = "<div class='room-name' id=" + "#" +Room_Name+" onclick='redirectRoom("+'"'+Room_Name+'"'+")'>"+Room_Name+"</div>";
        document.getElementById("output").innerHTML += html;
      });
    });
  }
};

function redirectRoom(room){
  console.log(room)
  localStorage.setItem('room_name', room);
  window.location = "let_chat.html";
};