async function onClick() {
  const emailField = document.getElementById('floatingInput');
  const passwordField = document.getElementById('floatingPassword');

  console.log('Fazendo requisição.....');
  const baseUrl = window.location.origin;

  try {
    const response = await fetch(baseUrl + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailField.value,
        password: passwordField.value,
      })
    })

    if (!response.ok) {
      window.alert('Credenciais incorretas. Tente novamente!');
    } else {
      window.location.href = baseUrl + '/home';
    }
  } catch(err) {
    console.log(err);
  }
}

const baseUrl = window.location.origin;
console.log(baseUrl);

const accessBtn = document.getElementById('access-btn');
accessBtn.onclick = onClick; 

const formElement = document.getElementById('form');
formElement.addEventListener('submit', (event) => {
  event.preventDefault();
})