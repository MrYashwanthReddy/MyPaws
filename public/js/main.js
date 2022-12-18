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
checkString;

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

    let profileImage;

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

      email = checkEmail(email);
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

    let name = e.target.foundName.value;
    let email = e.target.foundEmail.value;

    let animal = e.target.animalInput.value;
    let breed = e.target.foundBreed.value;
    let color = e.target.foundColor.value;
    let height = e.target.foundHeight.value;
    let gender = e.target.foundGender.value;

    let hairType;
    let earType;

    if (animal == "dog") {
      hairType = e.target.dogHairTypeInput.value;
      earType = e.target.dogEarTypeInput.value;
    } else {
      hairType = e.target.catHairTypeInput.value;
      earType = e.target.catEarTypeInput.value;
    }

    let bodyType = e.target.bodyTypeInput.value;

    try {
      name = validValue(name, "NAME", true);
      email = validValue(email, "EMAIL");
      animal = validValue(animal, "ANIMAL", true);
      breed = validValue(breed, "BREED", true);
      color = validValue(color, "COLOR", true);
      height = validValue(height, "HEIGHT");
      gender = validValue(gender, "GENDER");
      hairType = validValue(hairType, "HAIR TYPE", true);
      earType = validValue(earType, "EAR TYPE", true);
      bodyType = validValue(bodyType, "BODY TYPE", true);

      email = checkEmail(email);

      //Have to be removed later
      return;
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

    let hairType;
    let earType;

    if (animal == "dog") {
      hairType = e.target.dogHairTypeInput.value;
      earType = e.target.dogEarTypeInput.value;
    } else {
      hairType = e.target.catHairTypeInput.value;
      earType = e.target.catEarTypeInput.value;
    }

    let bodyType = e.target.bodyTypeInput.value;

    try {
      animal = validValue(animal, "ANIMAL", true);
      breed = validValue(breed, "BREED", true);
      color = validValue(color, "COLOR", true);
      height = validValue(height, "HEIGHT");
      gender = validValue(gender, "GENDER");
      hairType = validValue(hairType, "HAIR TYPE", true);
      earType = validValue(earType, "EAR TYPE", true);
      bodyType = validValue(bodyType, "BODY TYPE", true);

      animal = checkString(animal, "ANIMAL");
      breed = checkString(breed, "BREED");
      color = checkString(color, "COLOR");
      height = checkString(height, "HEIGHT");
      gender = checkString(gender, "GENDER");
      hairType = checkString(hairType, "HAIR TYPE");
      earType = checkString(earType, "EAR TYPE");
      bodyType = checkString(bodyType, "BODY TYPE");
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
    msg: `Error: Invalid text in ${fieldName}, Please Enter only Alphabets.`,
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
