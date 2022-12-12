function like(id) {
  console.log(id);
  fetch("/add-like", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId: id }),
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
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
    let firstName = e.target.firstName.value;
    let lastName = e.target.lastName.value;

    let age = e.target.age.value;
    let city = e.target.city.value;
    let state = e.target.state.value;
    let email = e.target.email.value;
    let petName = e.target.petName.value;
    let petBreed = e.target.petBreed.value;
    let password = e.target.password.value;
    let cpassword = e.target.cpassword.value;

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

    let name = e.target.foundName.value;
    let email = e.target.foundEmail.value;

    let animal = e.target.foundAnimal.value;
    let breed = e.target.foundBreed.value;
    let color = e.target.foundColor.value;
    let height = e.target.foundHeight.value;
    let gender = e.target.foundGender.value;
    let hairType = e.target.foundHairType.value;
    let earType = e.target.foundEarType.value;
    let bodyType = e.target.foundBodyType.value;

    try {
      name = validValue(name, "NAME");
      email = validValue(email, "EMAIL");
      animal = validValue(animal, "ANIMAL");
      breed = validValue(breed, "BREED");
      color = validValue(color, "COLOR");
      height = validValue(height, "HEIGHT");
      gender = validValue(gender, "GENDER");
      hairType = validValue(petBreed, "HAIR TYPE");
      earType = validValue(password, "EAR TYPE");
      bodyType = validValue(bodyType, "BODY TYPE");
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
    let animal = e.target.lostAnimal.value;
    let breed = e.target.lostBreed.value;
    let color = e.target.lostColor.value;
    let height = e.target.lostHeight.value;
    let gender = e.target.lostGender.value;
    let hairType = e.target.lostHairType.value;
    let earType = e.target.lostEarType.value;
    let bodyType = e.target.lostBodyType.value;

    try {
      animal = validValue(animal, "ANIMAL");
      breed = validValue(breed, "BREED");
      color = validValue(color, "COLOR");
      height = validValue(height, "HEIGHT");
      gender = validValue(gender, "GENDER");
      hairType = validValue(petBreed, "HAIR TYPE");
      earType = validValue(password, "EAR TYPE");
      bodyType = validValue(bodyType, "BODY TYPE");
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
