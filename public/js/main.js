function deleteComment(id, commentId) {
  fetch(`/deleteComment`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: id,
      commentId: commentId,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      //comment.val('');

      if (response.status == 200) {
        $('[data-cid="' + commentId + '"]').remove();
      }
    });
}

function comment(id) {
  console.log(id);

  let comment = $(`.comment-ip`, $(`[data-post="${id}"]`));

  fetch(`/comment`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: id,
      comment: comment.val(),
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      //comment.val('');

      if (response.comment == true) {
        $(`.comment-list`, $(`[data-post="${id}"]`)).append(`
        <div class="single-comment" data-cid="${response.cid}">
            <div><b>${
              response.username
            }:</b><br><span>${comment.val()}</span></div>
            <div><span class="material-icons" onclick="deleteComment('${id}','${
          response.cid
        }')">delete</span></div>
          </div>
        `);
        comment.val("");
      }
    });
}

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
      if (response.liked == true) {
        let c = $("span", $(element).parent()).html();
        if (c == "") {
          c = "0";
        }
        c = parseInt(c);

        if ($(element).hasClass("active")) {
          $("span", $(element).parent()).html(c - 1);
        } else {
          $("span", $(element).parent()).html(c + 1);
        }
        $(element).toggleClass("active");
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

      email = checkString(email, "EMAIL");
      password = checkPasswordString(password, "PASSWORD");

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

    let email = e.target.email.value;
    let petName = e.target.petName.value;
    let petBreed = e.target.petBreed.value;
    let password = e.target.password.value;
    let cpassword = e.target.cpassword.value;

    try {
      firstName = validValue(firstName, "FIRST NAME");
      lastName = validValue(lastName, "LAST NAME");
      age = validValue(age, "AGE");

      email = validValue(email, "EMAIL");
      petName = validValue(petName, "PET NAME");
      petBreed = validValue(petBreed, "PET BREED");

      firstName = checkString(firstName, "FIRST NAME");
      lastName = checkString(lastName, "LAST NAME");
      age = checkString(age, "AGE");
      email = checkString(email, "EMAIL");
      petName = checkString(petName, "PET NAME");
      petBreed = checkString(petBreed, "PET BREED");

      password = checkPasswordString(password, "PASSWORD");
      cpassword = checkPasswordString(cpassword, "RETYPE PASSWORD");

      firstName = checkAlphabets(firstName, "FIRST NAME");
      lastName = checkAlphabets(lastName, "LAST NAME");
      age = checkNumbers(age, "AGE");
      email = checkEmail(email);
      petName = checkAlphabets(petName, "PET NAME");
      petBreed = checkAlphabets(petBreed, "PET BREED");

      password = checkPassword(password);

      let files = e.target.profileImage.files;
      if (files.length == 0) {
        throw { status: 400, msg: "Error: Image Upload Required" };
      }

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

    let firstName = e.target.firstName.value;
    let lastName = e.target.lastName.value;
    let email = e.target.foundEmail.value;

    let animal = e.target.animalInput.value;
    let breed = e.target.foundBreed.value;
    let color = e.target.foundColor.value;
    let collar = e.target.collarInput.value;
    let height = e.target.foundHeight.value;
    let gender = e.target.foundGender.value;

    let hairType = e.target.hairTypeInput.value;
    let earType = e.target.earTypeInput.value;

    let bodyType = e.target.bodyTypeInput.value;

    try {
      firstName = validValue(firstName, "FIRST NAME");
      lastName = validValue(lastName, "LAST NAME");
      email = validValue(email, "EMAIL");
      animal = validValue(animal, "ANIMAL");
      breed = validValue(breed, "BREED");
      color = validValue(color, "COLOR");
      collar = validValue(collar, "COLLAR");
      height = validValue(height, "HEIGHT");
      gender = validValue(gender, "GENDER");
      hairType = validValue(hairType, "HAIR TYPE");
      earType = validValue(earType, "EAR TYPE");
      bodyType = validValue(bodyType, "BODY TYPE");

      firstName = checkString(firstName, "FIRST NAME");
      lastName = checkString(lastName, "LAST NAME");
      email = checkString(email, "EMAIL");
      animal = checkString(animal, "ANIMAL");
      breed = checkString(breed, "BREED");
      color = checkString(color, "COLOR");
      collar = checkString(collar, "COLLAR");
      height = checkString(height, "HEIGHT");
      gender = checkPasswordString(gender, "GENDER");
      hairType = checkString(hairType, "HAIR TYPE");
      earType = checkString(earType, "EAR TYPE");
      bodyType = checkString(bodyType, "BODY TYPE");

      firstName = checkAlphabets(firstName, "FIRST NAME");
      lastName = checkAlphabets(lastName, "LAST NAME");
      email = checkEmail(email);
      animal = checkAnimal(animal);
      breed = checkAlphabetsWithSpaces(breed, "BREED");
      color = checkAlphabets(color, "COLOR");
      collar = checkBoolean(collar, "COLLAR");
      height = checkNumbers(height, "HEIGHT");
      gender = checkGender(gender);
      hairType = checkAlphabets(hairType, "HAIR TYPE");
      earType = checkAlphabets(earType, "EAR TYPE");
      bodyType = checkAlphabets(bodyType, "BODY TYPE");
    } catch (e) {
      console.log(e);
      let errorDiv = document.getElementsByClassName("error");
      if (errorDiv.length == 0) {
        let error = document.createElement("p");
        error.className = "error";
        error.innerHTML = e.msg;
        foundpetForm.append(error);
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

    let animal = e.target.animalInput.value;
    let breed = e.target.breedInput.value;
    let color = e.target.colorInput.value;
    let collar = e.target.collarInput.value;
    let height = e.target.heightInput.value;
    let gender = e.target.genderInput.value;

    let hairType = e.target.hairTypeInput.value;
    let earType = e.target.earTypeInput.value;

    let bodyType = e.target.bodyTypeInput.value;

    try {
      animal = validValue(animal, "ANIMAL");
      breed = validValue(breed, "BREED");
      color = validValue(color, "COLOR");
      collar = validValue(collar, "COLLAR");
      height = validValue(height, "HEIGHT");
      gender = validValue(gender, "GENDER");
      hairType = validValue(hairType, "HAIR TYPE");
      earType = validValue(earType, "EAR TYPE");
      bodyType = validValue(bodyType, "BODY TYPE");

      animal = checkString(animal, "ANIMAL");
      breed = checkString(breed, "BREED");
      color = checkString(color, "COLOR");
      collar = checkString(collar, "COLLAR");
      height = checkString(height, "HEIGHT");
      gender = checkPasswordString(gender, "GENDER");
      hairType = checkString(hairType, "HAIR TYPE");
      earType = checkString(earType, "EAR TYPE");
      bodyType = checkString(bodyType, "BODY TYPE");

      animal = checkAnimal(animal);
      breed = checkAlphabetsWithSpaces(breed, "BREED");
      color = checkAlphabets(color, "COLOR");
      collar = checkBoolean(collar, "COLLAR");
      height = checkNumbers(height, "HEIGHT");
      gender = checkGender(gender);
      hairType = checkAlphabets(hairType, "HAIR TYPE");
      earType = checkAlphabets(earType, "EAR TYPE");
      bodyType = checkAlphabets(bodyType, "BODY TYPE");
    } catch (e) {
      console.log(e);
      let errorDiv = document.getElementsByClassName("error");
      if (errorDiv.length == 0) {
        let error = document.createElement("p");
        error.className = "error";
        error.innerHTML = e.msg;
        lostpetForm.append(error);
      } else {
        errorDiv[0].innerHTML = e.msg;
      }
      return;
    }

    e.target.submit();
  });
}

let postForm = document.getElementById("post-form");

if (postForm) {
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let content = e.target.content.value;

    try {
      title = validValue(title, "TITLE");
      content = validValue(content, "CONTENT");

      title = checkString(title, "TITLE");
      content = checkString(content, "CONTENT");

      title = checkValidText(title, "TITLE");
      content = checkValidText(content, "CONTENT");
    } catch (e) {
      let errorDiv = document.getElementsByClassName("error");
      if (errorDiv.length == 0) {
        let error = document.createElement("p");
        error.className = "error";
        error.innerHTML = e.msg;
        postForm.append(error);
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

  // const field = fieldName.toLowerCase();
  // if (field == "animal" && !["dog", "cat"].includes(input.toLowerCase()))
  //   throw { status: 400, msg: `Error: Invalid Pet type` };

  // if (field == "gender" && !["male", "female"].includes(input.toLowerCase()))
  //   throw { status: 400, msg: `Error: Invalid Pet gender` };

  // if (field == "height" && (typeof input != "number" || input < 0 || input > 6))
  //   throw { status: 400, msg: `Error: Invalid Pet height` };

  // if (field == "age" && (typeof input != "number" || input < 8))
  //   throw { status: 400, msg: `Error: Invalid age` };

  // if (isTextCheck) {
  //   checkValidText(input, fieldName);
  // }

  return input;
}

function checkValidText(input, fieldName) {
  if (/^[A-Za-z ]{1,}$/.test(input)) {
    return input;
  }
  throw {
    status: 400,
    msg: `Error: Invalid text in ${fieldName}, Please Enter only Alphabets or Numbers.`,
  };
}

function checkAlphabets(input, fieldName) {
  let regex = /^[A-Za-z]+$/;
  if (input.match(regex)) {
    return input;
  }
  throw {
    status: 400,
    msg: `Error: Invalid text in ${fieldName}, Please Enter only Alphabets.`,
  };
}

function checkNumbers(input, fieldName) {
  let regex = /^\d+$/;
  if (input.match(regex)) {
    return input;
  }
  throw {
    status: 400,
    msg: `Error: Invalid number in ${fieldName}, Please Enter only Numbers.`,
  };
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

function checkString(strVal, varName) {
  if (!strVal) throw { status: 400, msg: `Error: Missing ${varName} input` };
  if (typeof strVal !== "string")
    throw { status: 400, msg: `Error: ${varName} must be a string!` };
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw {
      status: 400,
      msg: `Error: ${varName} cannot be an empty string or string with just spaces`,
    };

  return strVal.toLowerCase();
}

function checkPasswordString(strVal, varName) {
  if (!strVal) throw { status: 400, msg: `Error: Missing ${varName} input` };
  if (typeof strVal !== "string")
    throw { status: 400, msg: `Error: ${varName} must be a string!` };
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw {
      status: 400,
      msg: `Error: ${varName} cannot be an empty string or string with just spaces`,
    };

  return strVal;
}

function checkAnimal(animal) {
  if (animal == "dog" || animal == "cat") return animal;
  throw { status: 400, msg: "Error: Dont play with dev tools, please!" };
}

function checkGender(gender) {
  if (gender == "M" || gender == "F") return gender;
  throw { status: 400, msg: "Error: Dont play with dev tools, please!" };
}
function checkAlphabetsWithSpaces(input, fieldName) {
  let regex = /^[a-zA-Z ]*$/;
  if (input.match(regex)) {
    return input;
  }
  throw {
    status: 400,
    msg: `Error: Invalid text in ${fieldName}, Please Enter only Alphabets.`,
  };
}

function checkBoolean(bool, fieldName) {
  if (bool == "true" || bool == "false") return bool;
  throw {
    status: 400,
    msg: `Error: Invalid input in ${fieldName}, Please Enter eithe true or false.`,
  };
}
