var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM customer;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(cu_id, callback) {
    var query = 'SELECT * FROM customer WHERE cu_id = ?';
    var queryData = [cu_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO customer (cu_name, cu_phone, cu_address) VALUES (?, ?, ?)';
    var queryData = [params.cu_name, params.cu_phone, params.cu_address];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(cu_id, callback) {
    var query = 'DELETE FROM customer WHERE cu_id = ?';
    var queryData = [cu_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE customer SET cu_name = ?, cu_phone = ?, cu_address = ? WHERE cu_id = ?';
    var queryData = [params.cu_name, params.cu_phone, params.cu_address, params.cu_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(cu_id, callback) {
    var query = 'CALL order_getinfo(?)';
    var queryData = [cu_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};