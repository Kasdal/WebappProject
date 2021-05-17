/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("Hello dear user, welcome to Movie - Hub!");

function likeIt() {
  alert("Thanks! Enjoy your stay");
}

function myConfirm() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(result => {
    if (result.value) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
}

function myFunction() {
  var x = document.getElementById("fname");
  x.value = x.value.toUpperCase();
}
function login() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Login succesful",
    showConfirmButton: false,
    timer: 3500
  });
}

function showHide() {
  var readMoreDiv = document.getElementById("readmore");
  readMoreDiv.style.color = "green";
  if (readMoreDiv.style.display === "block") {
    readMoreDiv.style.display = "none";
  } else {
    readMoreDiv.style.display = "block";
  }
}

function welcomeUser() {
  Swal.fire({
    title: "Feeling better? xD",
    width: 600,
    padding: "3em",
    background: "#fff url(/images/trees.png)",
    backdrop: `
  rgba(0,0,123,0.4)
  url("https://cdn.glitch.com/2169b470-a789-48f9-8965-97812a562718%2Ftenor.gif?v=1586477403768")

  `
  });
}

function hideWelcome() {
  let welcomeUserDiv = document.getElementById("welcomeuser");
  if (welcomeUserDiv.style.display === "block") {
    welcomeUserDiv.style.display = "none";
  }
}

function getRating() {
  let userRating = parseInt(prompt("Rate this collection (from 1 to 5 stars)"));
  if (userRating > 5 || userRating < 1 || isNaN(userRating)) {
    alert("Try again with a number between 1 and 5!");
  } else {
    $("#rating").html("You gave a rating of: ");
    for (let i = 0; i < userRating; i++) {
      $("#rating").append("<i class='yellow star icon'></i>");
    }
  }
}
