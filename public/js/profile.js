const mainInfo = document.forms.interests;

mainInfo.addEventListener('submit', async (e) => {
  e.preventDedault();
  const { id } = e.target.closest('form');
  const updId = id.slice(3);
  const {
    name, login, email, age, social,
  } = document.interests;
  const temp = Object.fromEntries(new FormData(mainInfo));
  const response = await fetch(`/profile/${updId}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ temp }),
  });
  const fetchResponse = await response.json();
  console.log('fetchResponse ------------>>>', fetchResponse);
});
