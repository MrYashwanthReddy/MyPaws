function like(id, element) {
  console.log(id);

  fetch(`/like/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId: id }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if(response.liked == true){
        let c = $('span', $(element).parent()).html();
        if(c == ""){c = "0"}
        c = parseInt(c);
        
        if( $(element).hasClass('active') ){
          $('span', $(element).parent()).html(c - 1)
        }else{
          $('span', $(element).parent()).html(c + 1)
        }
        $(element).toggleClass('active');

        
      }
    });
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

      email = checkEmail(email);

      password = checkPassword(password);
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
      firstName = validValue(firstName, "FIRST NAME", true);
      lastName = validValue(lastName, "LAST NAME", true);
      age = validValue(age, "AGE");
      city = validValue(city, "CITY", true);
      state = validValue(state, "STATE", true);
      email = validValue(email, "EMAIL");
      petName = validValue(petName, "PET NAME", true);
      petBreed = validValue(petBreed, "PET BREED", true);

      password = validValue(password, "PASSWORD");
      cpassword = validValue(cpassword, "RETYPE PASSWORD");

      email = checkEmail(email);
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
      name = validValue(name, "NAME", true);
      email = validValue(email, "EMAIL");
      animal = validValue(animal, "ANIMAL", true);
      breed = validValue(breed, "BREED", true);
      color = validValue(color, "COLOR", true);
      height = validValue(height, "HEIGHT");
      gender = validValue(gender, "GENDER");
      hairType = validValue(hairType, "HAIR TYPE", true);
      earType = validValue(password, "EAR TYPE", true);
      bodyType = validValue(bodyType, "BODY TYPE", true);

      email = checkEmail(email);

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
      animal = validValue(animal, "ANIMAL", true);
      breed = validValue(breed, "BREED", true);
      color = validValue(color, "COLOR", true);
      height = validValue(height, "HEIGHT");
      gender = validValue(gender, "GENDER");
      hairType = validValue(hairType, "HAIR TYPE", true);
      earType = validValue(earType, "EAR TYPE", true);
      bodyType = validValue(bodyType, "BODY TYPE", true);
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

function validValue(input, fieldName, isTextCheck) {
  if (!input) throw { status: 400, msg: `Error: ${fieldName} is empty` };

  if(isTextCheck){
    checkValidText(input,fieldName);
  }

  return input;
}

function checkValidText(input, fieldName) {
  if (/^[A-Za-z ]{1,}$/.test(input)) {
    return input;
  }
  throw { status: 400, msg: `Error: Invalid text in ${fieldName}, Please Enter only Alphabets.` };
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

function checkEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return email;
  }
  throw { msg: "Error: Invalid email format" };
}
