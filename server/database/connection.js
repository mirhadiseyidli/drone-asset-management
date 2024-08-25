const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  mongoose.connect("mongodb://mongo:27017/", {});
}

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
