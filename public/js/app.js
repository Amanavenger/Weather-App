console.log("Client side Javascript is Loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");

const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "From JavaScript";

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault(); //! It will prevent to Page to reload. Its a deafult beahviour of FORM

  const location = search.value;

  messageOne.textContent = "Loading ....";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    //! Fetch is JAVAScript Function not is node. It is used for Client Side
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          console.log(data.error);
        } else {
          messageOne.innerHTML = data.location;
          messageTwo.innerHTML = data.forecast;
          console.log(data.location);
          console.log(data.forecast);
        }
      });
    }
  );
});
