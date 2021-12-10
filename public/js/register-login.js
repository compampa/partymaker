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

if (document.forms.register) {
  const regForm = document.register;
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
    console.log(res);
    const result = await res.json();
    if (res.status === 222) {
      console.log(321);
      window.location.assign('/registration/about');
    } else {
      console.log(123);
      window.location.assign('/login');
    }
  });
}
if (document.forms.about) {
  const aboutForm = document.forms.about;
  const nameInput = document.querySelector('#name');
  const ageInput = document.querySelector('#age');
  const interest = document.querySelector('#interest');
  const theme = document.querySelector('#theme');
  const smoke = document.querySelector('#smoke');
  const drink = document.querySelector('#drink');

  aboutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updateAbout = {
      name: nameInput.value,
      age: ageInput.value,
      interestTitle: interest.value,
      themeTitle: theme.value,
      smoke: 'false',
      drink: 'false',
    };
    if (smoke.checked) {
      updateAbout.smoke = 'true';
    }
    if (drink.checked) {
      updateAbout.drink = 'true';
    }
    const res = await fetch('/registration/about', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateAbout),
    });
    const result = await res.json();
    if (res.status === 222) {
      window.location.assign('/main');
    }
  });
}
