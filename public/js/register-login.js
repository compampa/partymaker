if (document.getElementById('login')) {
  const loginBtn = document.getElementById('login');
  loginBtn.addEventListener('click', (e) => {
    window.location.assign('/login');
  });
}

if (document.getElementById('register')) {
  const registerBtn = document.getElementById('register');
  registerBtn.addEventListener('click', (e) => {
    window.location.assign('/registration');
  });
}

if (document.forms.SANYATEMPNAME) {
  const regForm = document.forms[0];
  regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginInput = regForm.login.value;
    const passwordInput = regForm.password.value;
    const emailInput = regForm.email.value;
    const user = { login: loginInput, password: passwordInput, email: emailInput };
    const res = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();
    console.log(result);
    window.location.assign('/registration/about');
  });
}

if (document.forms[0]) {
  const aboutForm = document.forms[0];
  console.log(aboutForm);
  aboutForm.addEventListener('click', (e) => {

  });
}
