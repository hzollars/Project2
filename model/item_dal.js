var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM item;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(i_id, callback) {
    var query = 'SELECT * FROM item WHERE i_id = ?';
    var queryData = [i_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getByIdX = function(i_id, callback) {
    var query = 'SELECT * FROM item WHERE i_id = ?';
    var queryData = [i_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO item (i_id, i_name) VALUES (?, ?)';
    var queryData = [params.i_id, params.i_name];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(item__id, callback) {
    var query = 'DELETE FROM item_ WHERE o_id = ?';
    var queryData = [o_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE item_ SET cu_id = ?, c_name = ? WHERE o_id = ?';
    var queryData = [params.cu_id, params.c_name, params.o_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(o_id, callback) {
    var query = 'CALL item_getinfo(?)';
    var queryData = [o_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};