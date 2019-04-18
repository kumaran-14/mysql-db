const emailValidityConfig = {
  searchEmail: {
    MAX_LENGTH: 25,
    PATTERN: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ERROR: "Email ID Invalid"
  }
};

const emailValidityState = {
  searchEmail: false,
};

const SEARCH_URL = "http://localhost:3000/user?email=";

const users = document.querySelector('.users')
const searchForm = document.querySelector("#form_search");
searchForm.addEventListener("submit", handleSearchSubmit);
const resultDiv = document.querySelector('.search_result')
resultDiv.addEventListener('click', handleDelete)


async function handleSearchSubmit(e) {
  e.preventDefault();
  const formData = getEmailData();
  if (customEmailCheckvalidity(formData) && searchForm.checkValidity() ) {
    showValidationSearchMessage();
    clearCurrentUsers()
    try {
      const response = await fetch(`${SEARCH_URL}${formData.searchEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const jsonResponse = await response.json()
      if (Object.keys(jsonResponse.body.data).length) {
        users.innerHTML = `
        <h2 style="text-align:left;margin: 5px 30px;">Users</h2>
        <p style="padding: 10px; background-color: #eae4e4;margin:0px 30px " >
        <span>1.${jsonResponse.body.data.userName}</span>
        <span><i class="fas fa-trash-alt"></i></span>
        </p>`
      } else {
        users.innerHTML = 'User not found'
      }

    } catch (e) {
      console.log(e)
      users.innerHTML = 'User not found'
    }
  } else {
    showValidationSearchMessage();
  }
}

function handleDelete(e) {
  console.log(e.target)
}

function getEmailData() {
  const data = {};
  data.searchEmail = searchForm.querySelector('input[name="search_email"]').value || "";
  return data;
}

function customEmailCheckvalidity(formData) {
  emailValidityState['searchEmail'] = validateSearchByEmail(formData['searchEmail']);

  if (emailValidityState.searchEmail)
    return true;
  return false;
}

function showValidationSearchMessage() {
  for (let input in emailValidityState) {
    const paraElement = document.querySelector(`.${input}`)
    if (!emailValidityState[input]) paraElement.classList.add('show')
    else paraElement.classList.remove('show')
  }
}

function clearCurrentUsers() {
  users.innerHTML = ''
}

// Email Input Validation
function validateSearchByEmail(email) {
  const constraint = emailValidityConfig.searchEmail;
  const regexEmail = new RegExp(constraint.PATTERN);
  if (email.length <= constraint.MAX_LENGTH && regexEmail.test(email)) {
    return true;
  }
  return false;
}
