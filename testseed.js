const { Interests, Themes } = require('./db/models');

const kek = async () => {
  const interest = await Interests.create({ title: 'кекать' });
  const theme = await Themes.create({ title: 'о любви' });
};
kek();
