var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM carrier;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(c_id, callback) {
    var query = 'SELECT * FROM carrier WHERE c_id = ?';
    var queryData = [c_id];
    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO carrier (c_name) VALUES (?)';
    var queryData = [params.c_name];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(c_id, callback) {
    console.log("id : " + c_id);
    var query = 'DELETE FROM carrier WHERE c_id = ?';
    var queryData = [c_id];

    connection.query(query, c_id, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE carrier SET c_name = ? WHERE c_id = ?';
    var queryData = [params.c_id, params.c_name];
    connection.query(query, queryData, function(err, result) {
        companyAddressDeleteAll(params.company_id, function(err, result){

            if(params.address_id != null) {
                //insert company_address ids
                companyAddressInsert(params.company_id, params.address_id, function(err, result){
                    callback(err, result);
                });}
            else {
                callback(err, result);
            }
        });

    });
};

exports.edit = function(c_id, callback) {
    var query = 'CALL company_getinfo(?)';
    var queryData = [company_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
