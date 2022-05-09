function add(){


   

   user_name = document.getElementById("user_input").value;
   if (user_name==""){

    Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'User Name Cant Be Blank',
        footer: 'Please put a user name in the input field first'
      })

   }
   else {

      Swal.fire({

        icon: 'success',
        title: 'Yay!',
        text: 'Successfully logged in   ' + user_name,
        confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Great!'

      }).then(function() {
        window.location = "let_chat_room.html";
    });
    localStorage.setItem("user_name" , user_name);
   }

}