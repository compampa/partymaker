const { Interests, Themes } = require('./db/models');

const kek = async () => {
  const interest = await Interests.create({ title: 'кекать' });
  const theme = await Themes.create({ title: 'о любви' });
  const interest1 = await Interests.create({ title: 'играть' });
  const theme2 = await Themes.create({ title: 'о политике' });
};
kek();



// <div class="wrapper">
// 	<input type="checkbox" id="check-menu">
// 	<label for="check-menu">MENU</label>
// 	<div class="burger-line first"></div>
// 	<div class="burger-line second"></div>
// 	<div class="burger-line third"></div>
// 	<div class="burger-line fourth"></div>
// 	<nav class="main-menu">
// 		<a href="/logout">Logout</a>
// 		<a href="#">Punct_1</a>
// 		<a href="#">Punct_1</a> 
// 		<a href="#">Punct_1</a>
// 		<a href="#">Punct_1</a>
// 	</nav>
// </div>
