const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;

const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  host: 'localhost',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

const Vote = db.define('vote', {
  react: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  angular: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  ember: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  vue: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

const User = db.define('user', {
  sessionID: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

db.sync({ force: false })
  .then(() => {
    return Vote.create({});
  });

module.exports = {
  db,
  Vote,
  User
};
