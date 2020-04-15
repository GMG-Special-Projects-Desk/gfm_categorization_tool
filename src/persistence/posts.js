const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async find() {
    const {rows} = await db.query(sql`
      select * from posts where checked=false order by random() limit 1;
    `);
    if (rows.length !== 1) {
      return null;
    } 
    return rows[0];
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM sessions WHERE id = ${id};
    `);
  },
  async save(items) {
    
    await db.query(sql`
    update posts set funding_condition =  ${items['funding_condition']} WHERE url = ${items['url']}`);
    await db.query(sql`
    update posts set disease_condition =  ${items['disease_condition']} WHERE url = ${items['url']}`)
    await db.query(sql`
    update posts set checked=true WHERE url = ${items['url']}`);
    const {rows}=await db.query(sql`
    select * from posts WHERE url = ${items['url']} limit 1`)
    return rows[0]
  }
};
