const url = 'http://localhost:3000/';

const form = document.querySelector('#form')

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  const formData = getFormData()
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
}

function getFormData() {
  const data = {}
  data.username = form.querySelector('input[name="username"]').value || '';
  data.email = form.querySelector('input[name="email"]').value || '';
  data.phoneno = form.querySelector('input[name="phoneno"]').value || '';
  data.password = form.querySelector('input[name="password"]').value || '';
  data.confirm_password = form.querySelector('input[name="confirm_password"]').value || '';
  return data
}
