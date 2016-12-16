var express = require('express');
var router = express.Router();
var order_dal = require('../model/order_dal');
var carrier_dal = require('../model/carrier_dal');
var customer_dal = require('../model/customer_dal');
var item_dal = require('../model/item_dal');

router.get('/all', function(req, res) {
    order_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('order/orderAll', { 'result':result });
        }
    });
});

router.get('/', function(req, res){
    if(req.query.o_id == null) {
        res.send('o_id is null');
    }
    else {
        order_dal.getById(req.query.o_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('order/orderViewById', {'result': result});
           }
        });
    }
});

router.get('/add', function(req, res){
    order_dal.getAll(function(err,order) {
        customer_dal.getAll(function(err, customer) {
            carrier_dal.getAll(function(err, carrier) {
                item_dal.getAll(function (err, item) {
                    item_dal.getByIdX(req.query.o_id, function(err, itemX) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.render('order/orderAdd', {
                                order: order,
                                customer: customer,
                                carrier: carrier,
                                item: item,
                                itemX: itemX
                            });
                        }
                    });
                });
            });
        });
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.o_id == null) {
        res.send('order ID must be provided.');
    }

    else {
        order_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, '/order/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.o_id == null) {
        res.send('An order id is required');
    }
    else {
        order_dal.edit(req.query.o_id, function(err, result){
            res.render('order/orderUpdate', {order: result});
        });
    }
});

router.get('/edit2', function(req, res){
   if(req.query.o_id == null) {
       res.send('An order id is required');
   }
   else {
       order_dal.getById(req.query.o_id, function(err, order){
           customer_dal.getAll(function(err, customer) {
               carrier_dal.getAll(function(err, carrier) {
                  item_dal.getAll(function(err, item) {
                      item_dal.getByIdX(req.query.o_id, function(err, itemX) {
                          res.render('order/orderUpdate', {order: order, customer: customer, carrier: carrier, item: item, itemX: itemX});
                      });
                  });
               });
           });

       });
   }
});

router.get('/update', function(req, res){
    order_dal.delete(req.query.o_id, function(err, order) {
        order_dal.insert(req.query, function(err,result) {
            res.redirect(302, '/order/all');
        });
    });
});


router.get('/delete', function(req, res){
    if(req.query.o_id == null) {
        res.send('order_id is null');
    }
    else {
         order_dal.delete(req.query.o_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/order/all');
             }
         });
    }
});

module.exports = router;
