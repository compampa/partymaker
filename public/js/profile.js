const mainInfo = document.forms.interests;
const additionalInfo = document.querySelector('.pref');
console.log(mainInfo, additionalInfo);
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
  // const uplInput = document.querySelector('#sampleFile');
  // const files = uplInput.files[0];

  // const formData = new FormData();
  // formData.append('file', uplInput.files[0]);
  console.log(updObj);
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
  // try {
  //   const response = await fetch(`/profile/add/${updId}`, {
  //     method: 'POST',
  //     body: formData,
  //     files,
  //   });
  //   await response.json();
  // }
  // catch (err) {
  //   console.log(err);
  // }
});
/*  */
// uploadButton.addEventListener('click', async (event) => {
//   const uploadInput = document.getElementById('uploadInput');
//   const files = uploadInput.files[0];

//   const formData = new FormData();
//   formData.append('file', uploadInput.files[0]);

//   const fetchOptions = {
//     method: 'POST',
//     body: formData,
//     files: files
//   };

//   try {
//     const post = await fetch('/upload', fetchOptions);
//     const postResult = await post.json();
//     iziToast.show({
//       title: 'Готово!',
//       message: postResult,
//       position: 'topRight',
//       color: 'green',
//   });
//   } catch (error) {
//     console.log(error);
//   }
/*  */
