const mainInfo = document.forms.interests;
const additionalInfo = document.querySelector('.pref');

if (mainInfo) {
  mainInfo.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { id } = e.target.closest('form');
    const updId = id.slice(3);
    const temp = Object.fromEntries(new FormData(mainInfo));
    try {
      const response = await fetch(`/profile/${updId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(temp),
      });
      await response.json();
    } catch (err) {
      console.log(err);
    }
  });
}
if (additionalInfo) {
  additionalInfo.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { id } = e.target.closest('form');
    const updId = id.slice(4);
    const category = additionalInfo.category.value;
    const theme = additionalInfo.theme.value;
    const smoke = document.querySelector('.smoke');
    const drink = document.querySelector('.drink');
    const updObj = {
      smoke, drink, titleCat: category, titleTheme: theme,
    };
    if (smoke.checked) {
      updObj.smoke = 'true';
    } else updObj.smoke = 'false';
    if (drink.checked) {
      updObj.drink = 'true';
    } else updObj.drink = 'false';
    try {
      const response = await fetch(`/profile/add/${updId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updObj),
      });
      await response.json();
    } catch (err) {
      console.log(err);
    }
  });
}
