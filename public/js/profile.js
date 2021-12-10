const mainInfo = document.forms.interests;
// const { interests } = document.forms;

mainInfo.addEventListener('submit', async (e) => {
  e.preventDefault();

  const { id } = e.target.closest('form');
  const updId = id.slice(3);
  // const {
  //   name, login, email, age, social,
  // } = interests;
  const temp = Object.fromEntries(new FormData(mainInfo));
  console.log('->>>>temp', temp);
  try {
    const response = await fetch(`/profile/${updId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(temp),
    });
    const fetchResponse = await response.json();
    console.log('fetchResponse ------------>>>', fetchResponse);
  } catch (err) {
    console.log(err);
  }
});
