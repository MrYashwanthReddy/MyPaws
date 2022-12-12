function like(id) {
  console.log(id);
  fetch('/add-like', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "postId": id })
  })
    .then(response => response.json())
    .then(response => console.log(response))
}

//Login FORM

let loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    try {
      email = validValue(email, "EMAIL");
      password = validValue(password, "PASSWORD");

      password = checkPassword(password);

      //Password Validations
      //Min len 8
      // 1 Uppercase
      // 1 Number
      // 1 Special charcter

      //password should be equal to cpassword
    } catch (e) {
      let errorDiv = document.getElementsByClassName("error");
      if (errorDiv.length == 0) {
        let error = document.createElement("p");
        error.className = "error";
        error.innerHTML = e.msg;
        loginForm.append(error);
      } else {
        errorDiv[0].innerHTML = e.msg;
      }
      return;
    }

    e.target.submit();
  });
}

//REGISTER FORM
let registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // let firstName = e.target.registerFN.value;
    // let lastName = e.target.registerLN.value;

    // let age = e.target.registerAge.value;
    // let city = e.target.registerCity.value;
    // let state = e.target.registerState.value;
    // let email = e.target.registerEmail.value;
    // let petName = e.target.registerPetName.value;
    // let petBreed = e.target.registerPetBreed.value;
    let password = e.target.registerPassword.value;
    let cpassword = e.target.registerCPassword.value;

    try {
      firstName = validValue(firstName, "FIRST NAME");
      lastName = validValue(lastName, "LAST NAME");
      age = validValue(age, "AGE");
      city = validValue(city, "CITY");
      state = validValue(state, "STATE");
      email = validValue(email, "EMAIL");
      petName = validValue(petName, "PET NAME");
      petBreed = validValue(petBreed, "PET BREED");

      password = validValue(password, "PASSWORD");
      cpassword = validValue(cpassword, "RETYPE PASSWORD");

      password = checkPassword(password);

      if (password !== cpassword) {
        throw { msg: "Error: PASSWORD Mismatch" };
      }
    } catch (e) {
      let errorDiv = document.getElementsByClassName("error");
      if (errorDiv.length == 0) {
        let error = document.createElement("p");
        error.className = "error";
        error.innerHTML = e.msg;
        registerForm.append(error);
      } else {
        errorDiv[0].innerHTML = e.msg;
      }
      return;
    }

    e.target.submit();
  });
}

//FOUNDPET FORM
let foundpetForm = document.getElementById("foundpet-form");

if (foundpetForm) {
  foundpetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Pending
    let firstName = e.target.registerFN.value;
    let lastName = e.target.registerLN.value;

    let age = e.target.registerAge.value;
    let city = e.target.registerCity.value;
    let state = e.target.registerState.value;
    let email = e.target.registerEmail.value;
    let petName = e.target.registerPetName.value;
    let petBreed = e.target.registerPetBreed.value;
    let password = e.target.registerPassword.value;
    let cpassword = e.target.registerCPassword.value;

    try {
      firstName = validValue(firstName, "FIRST NAME");
      lastName = validValue(lastName, "LAST NAME");
      age = validValue(age, "AGE");
      city = validValue(city, "CITY");
      state = validValue(state, "STATE");
      email = validValue(email, "EMAIL");
      petName = validValue(petName, "PET NAME");
      petBreed = validValue(petBreed, "PET BREED");
      password = validValue(password, "PASSWORD");
      cpassword = validValue(cpassword, "RETYPE PASSWORD");

      password = checkPassword(password);

      if (password !== cpassword) {
        throw { msg: "Error: PASSWORD Mismatch" };
      }
    } catch (e) {
      let errorDiv = document.getElementsByClassName("error");
      if (errorDiv.length == 0) {
        let error = document.createElement("p");
        error.className = "error";
        error.innerHTML = e.msg;
        registerForm.append(error);
      } else {
        errorDiv[0].innerHTML = e.msg;
      }
      return;
    }

    e.target.submit();
  });
}

//LOSTPET FORM
let lostpetForm = document.getElementById("lostpet-form");

if (lostpetForm) {
  lostpetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Pending
    let name = e.target.lostName.value;
    let email = e.target.lostEmail.value;
    let animal = e.target.lostAnimal.value;
    let city = e.target.registerCity.value;
    let state = e.target.registerState.value;
    let petName = e.target.registerPetName.value;
    let petBreed = e.target.registerPetBreed.value;
    let password = e.target.registerPassword.value;
    let cpassword = e.target.registerCPassword.value;

    try {
      firstName = validValue(firstName, "FIRST NAME");
      lastName = validValue(lastName, "LAST NAME");
      age = validValue(age, "AGE");
      city = validValue(city, "CITY");
      state = validValue(state, "STATE");
      email = validValue(email, "EMAIL");
      petName = validValue(petName, "PET NAME");
      petBreed = validValue(petBreed, "PET BREED");
      password = validValue(password, "PASSWORD");
      cpassword = validValue(cpassword, "RETYPE PASSWORD");

      password = checkPassword(password);

      if (password !== cpassword) {
        throw { msg: "Error: PASSWORD Mismatch" };
      }
    } catch (e) {
      let errorDiv = document.getElementsByClassName("error");
      if (errorDiv.length == 0) {
        let error = document.createElement("p");
        error.className = "error";
        error.innerHTML = e.msg;
        registerForm.append(error);
      } else {
        errorDiv[0].innerHTML = e.msg;
      }
      return;
    }

    e.target.submit();
  });
}

function validValue(input, fieldName) {
  if (!input) throw { status: 400, msg: `Error: ${fieldName} is empty` };

  return input;
}

function checkPassword(password) {
  let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (!password.match(regex))
    throw {
      status: 400,
      msg: "Password should contain atleast one uppercase character, one number, special character and minimum 8 characters in length",
    };

  return password;
}
