const { Interests, Themes } = require('./db/models');

const kek = async () => {
  const interest = await Interests.create({ title: 'кекать' });
  const theme = await Themes.create({ title: 'о любви' });
  const interest1 = await Interests.create({ title: 'играть' });
  const theme2 = await Themes.create({ title: 'о политике' });
};
kek();
