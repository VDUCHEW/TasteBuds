// require promise module -- may need to select another
var Promise = require('bluebird');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tasteBudsDB',
    charset: 'utf8'
  }
});

module.exports = db = require('bookshelf')(knex);

var buildTable = function(name, callback) {
  return db.knex.schema.hasTable(name)
    .then(function(exists) {
      if (exists) {
        return {
          name: name,
          created: false
        };
      } else {
        return db.knex.schema.createTable(name, callback);
      }
    })
    .then(function(response) {
      if (!response.name) {
        var qb = response;
        if (qb) {
          return {
            name: name,
            created: true
          };
        } else {
          return {
            name: name,
            created: false
          };
        }
      } else {
        return response;
      }
    });
};

var users = buildTable('users', function(table) {
  table.increments('id').primary();
  table.string('facebook_id');
  table.string('name');
  table.string('profile_picture');
});

var posts = buildTable('posts', function(table) {
  table.increments('id').primary();
  table.boolean('eat');
  table.binary('image'); // uncertain about data type
  table.string('comment');
  table.string('location');
  table.timestamp('posted_at');
});

var restaurants = buildTable('restaurants', function(table) {
  table.increments('id').primary();
  table.string('name');
  table.integer('rating');
  table.string('address');
  table.string('telephone');
  table.string('url');
});

var wantToTrys = buildTable('want_to_trys', function(table) {
  table.increments('id').primary();
  table.integer('post_id').notNullable();
  table.integer('user_id').notNullable();
});

var followers = buildTable('followers', function(table) {
  table.increments('id').primary();
  table.integer('being_followed_id').notNullable();
  table.integer('follower_id').notNullable();
});

var hashtags = buildTable('hashtags', function(table) {
  table.increments('id').primary();
  table.string('name');
});

var postsHashtags = buildTable('posts_hashtags', function(table) {
  table.increments('id').primary();
  table.integer('hashtag_id').notNullable();
  table.integer('post_id').notNullable();
});

var tables = [users, posts, restaurants, wantToTrys, followers, hashtags, postsHashtags];

Promise.all(tables)
  .then(function(tables) {
    tables.forEach(function(table) {
      if (table.created) {
        console.log('Bookshelf: created table', table.name);
      } else {
        console.log('Bookshelf:'
          table.name, 'table already exists');
      }
    });
  });