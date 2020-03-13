const db = require('../persistence/db');

module.exports.up = async function(next) {
  const client = await db.connect();

  await client.query(`
    CREATE TABLE posts
      (
        url text unique,
        checked bool default false,
        byline text,
        story text,
        date date,
        type text,
        title text,
        raised float,
        goal float,
        donations int,
        donors int
      );
    `);

  await client.release(true);
  next();
};

module.exports.down = async function(next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE posts;
  `);

  await client.release(true);
  next();
};
