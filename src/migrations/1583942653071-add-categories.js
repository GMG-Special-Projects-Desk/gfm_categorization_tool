'use strict'
const db = require('../persistence/db');

module.exports.up = async function(next) {
  const client = await db.connect();

  await client.query(`
    ALTER TABLE posts
    ADD COLUMN disease_condition varchar;
    `);

  await client.query(`
    ALTER TABLE posts
    ADD COLUMN funding_condition varchar;
    `);
  
  await client.query(`
  	update posts set checked=false;
    `);

  await client.release(true);
  next();
};

module.exports.down = function (next) {
  next()
}
