var mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/profile_form', {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;