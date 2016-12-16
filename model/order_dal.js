var mysql   = require('mysql');
var db  = require('./db_connection.js');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'select * from order_info;';
    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(o_id, callback) {
    var query = 'SELECT * FROM order_info WHERE o_id = ?';
    var queryData = [o_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO order_ (cu_id, c_id, i_id) VALUES (?,?,?)';
    var queryData = [params.cu_id, params.c_id, params.i_id];
    connection.query(query, queryData, function(err, result) {
        var new_id = result.insertId;
        insertCustomerItem(params.cu_id, params.i_id, function(err, result) {
            insertOrderItem(new_id, params.i_id, function(err, result) {
                insertOrderPrice(new_id, function(err, result) {
                    callback(err, result);
                });
            });
        });
    });
};

var insertCustomerItem = function (cu_id, i_id, callback) {
    var query = 'insert into customer_item (cu_id, i_id) values (?, ?)';
    var queryData = [cu_id, i_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var insertOrderItem = function (o_id, i_id, callback) {
    var query = 'insert into order_item (o_id, i_id) values (?, ?)';
    var queryData = [o_id, i_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var insertOrderPrice = function(o_id, callback) {
    var query = 'insert into order_price (o_id, o_price) values (?, (select sum(i_price) from item_price where o_id = ?))';
    var queryData = [o_id, o_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(o_id, callback) {
    var query = 'DELETE FROM order_ WHERE o_id = ?';
    connection.query(query, [o_id], function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE order_ SET cu_id = ?, c_id = ?, i_id = ? WHERE o_id = ?';
    var queryData = [params.cu_id, params.c_id, params.i_id, params.o_id];
    connection.query(query, queryData, function(err, result) {
        updateCustomerItem(params.cu_id, params.i_id, function(err, result) {
            updateOrderItem(params.o_id, params.i_id, function (err, result) {
                updateOrderPrice(params.o_id, function (err, result) {
                    callback(err, result);
                });
            });
        });
    });
};

var updateCustomerItem = function (cu_id, i_id, callback) {
    var query = 'update customer_item set i_id = ? where cu_id = ?';
    var queryData = [cu_id, i_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var updateOrderItem = function (o_id, i_id, callback) {
    var query = 'update order_item set i_id = ? where o_id = ?';
    var queryData = [o_id, i_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var updateOrderPrice = function(o_id, callback) {
    var query = 'update order_price set o_price=sum(i_price) from item_price where o_id = ?';
    console.log('o_id: ' + o_id);
    var queryData = [o_id];
    console.log('queryData: ' + queryData);
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.edit = function(o_id, callback) {
    var query = 'CALL order_getinfo(?)';
    var queryData = [o_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};