// custom validation attributes for inputs
const validityConfig = {
  username: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 25,
    PATTERN: "^[a-z0-9_-]{3,25}$",
  },
  email: {
    MAX_LENGTH: 25,
    PATTERN: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  phoneno: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 10,
    PATTERN: "^[0-9]{10,10}$",
  },
  password: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 50,
    PATTERN:
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,50}",
  },
  confirm_password: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 50,
    PATTERN:
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,50}",
  }
};

// Monitor validation for inputs
const inputValidityState = {
  username: false,
  email: false,
  phoneno: false,
  password: false,
  confirm_password: false
};

const URL = "http://localhost:3000/";

const form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const formData = getFormData();
  if (customCheckvalidity(formData) && form.checkValidity()) {
    // Remove all existing messages before submitting again
    showValidationMessage();
    try {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const jsonResponse = await response.json()
      const resultDiv = document.querySelector('.form-footer')
      resultDiv.innerHTML = jsonResponse.body.message || jsonResponse.error
    } catch (e) {
      console.log(e)
    }
  } else {
    // Show invalid messages
    showValidationMessage();
  }
}

function getFormData() {
  const data = {};
  data.username = form.querySelector('input[name="username"]').value || "";
  data.email = form.querySelector('input[name="email"]').value || "";
  data.phoneno = form.querySelector('input[name="phoneno"]').value || "";
  data.password = form.querySelector('input[name="password"]').value || "";
  data.confirm_password =
    form.querySelector('input[name="confirm_password"]').value || "";
  return data;
}

function customCheckvalidity(formData) {
  //dynamic function calls for each input. Could have avoided this and wrote all manuallly
  for (input in formData) {
    let validityCheckFunc;
    switch (input) {
      case "username":
        validityCheckFunc = validateUsername;
        break;
      case "email":
        validityCheckFunc = validateEmail;
        break;
      case "phoneno":
        validityCheckFunc = validatePhoneno;
        break;
      case "password":
        validityCheckFunc = validatePassword;
        break;
      case "confirm_password":
        validityCheckFunc = validateConfirmPassword;
        break;
    }
    if (input === 'confirm_password') {
    inputValidityState[input] = validityCheckFunc(formData['password'],formData[input]);
    } else {
      inputValidityState[input] = validityCheckFunc(formData[input]);
    }
  }
  // Check if every input state is valid
  if (Object.values(inputValidityState).every(item => item === true))
    return true;
  return false;
}

function showValidationMessage() {
  // red-colored validation messages beneath input fields
  for (let input in inputValidityState) {
    const paraElement = document.querySelector(`.${input}`)
    if (!inputValidityState[input]) paraElement.classList.add('show')
    else paraElement.classList.remove('show')
  }
}

// Individual Input Validation
function validateUsername(username) {
  const constraint = validityConfig.username;
  const regexUsername = new RegExp(constraint.PATTERN);
  if (
    username.length >= constraint.MIN_LENGTH &&
    username.length <= constraint.MAX_LENGTH &&
    regexUsername.test(username)
  ) {
    return true;
  }
  return false;
}

function validateEmail(email) {
  const constraint = validityConfig.email;
  const regexEmail = new RegExp(constraint.PATTERN);
  if (email.length <= constraint.MAX_LENGTH && regexEmail.test(email)) {
    return true;
  }
  return false;
}

function validatePhoneno(phoneno) {
  const constraint = validityConfig.phoneno;
  const regexPhoneno = new RegExp(constraint.PATTERN);
  if (
    phoneno.length >= constraint.MIN_LENGTH &&
    phoneno.length <= constraint.MAX_LENGTH &&
    regexPhoneno.test(phoneno)
  ) {
    return true;
  }
  return false;
}

function validatePassword(password) {
  const constraint = validityConfig.password;
  const regexPassword = new RegExp(constraint.PATTERN);
  if (
    password.length >= constraint.MIN_LENGTH &&
    password.length <= constraint.MAX_LENGTH &&
    regexPassword.test(password)
  ) {
    return true;
  }
  return false;
}

function validateConfirmPassword(password, confirm_password) {
  const constraint = validityConfig.confirm_password;
  const regexConfirmPassword = new RegExp(constraint.PATTERN);
  if (
    confirm_password.length >= constraint.MIN_LENGTH &&
    confirm_password.length <= constraint.MAX_LENGTH &&
    regexConfirmPassword.test(confirm_password) &&
    password === confirm_password
  ) {
    return true;
  }
  return false;
}
