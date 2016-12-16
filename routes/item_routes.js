var express = require('express');
var router = express.Router();
var item_dal = require('../model/item_dal');
// var carrier_dal = require('../model/carrier_dal');
// var customer_dal = require('../model/customer_dal');

router.get('/all', function(req, res) {
    item_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('item/itemAll', { 'result':result });
        }
    });
});

router.get('/', function(req, res){
    if(req.query.i_id == null) {
        res.send('i_id is null');
    }
    else {
        item_dal.getById(req.query.i_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('item/itemViewById', {'result': result});
           }
        });
    }
});

router.get('/add', function(req, res){
    item_dal.getAll(function(err,item) {
        customer_dal.getAll(function(err, customer) {
            item_dal.getAll(function(err, item) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.render('item/itemAdd', {item: item, customer: customer, item: item});
                }
            });
        });
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.school_name == null) {
        res.send('School Name must be provided.');
    }
    else if(req.query.address_id == null) {
        res.send('An Address must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        school_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.redirect(302, '/item/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.school_id == null) {
        res.send('A item id is required');
    }
    else {
        school_dal.edit(req.query.school_id, function(err, result){
            res.render('item/schoolUpdate', {school: result[0][0], address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
   if(req.query.school_id == null) {
       res.send('A item id is required');
   }
   else {
       item_dal.getById(req.query.school_id, function(err, item){
           item_dal.getByIdX(req.query.i_id, function(err, itemX) {
               res.render('item/itemUpdate', {item: item, itemX: itemX});
           });
       });
   }

});

router.get('/update', function(req, res){
    school_dal.update(req.query, function(err, result){
       res.redirect(302, '/item/all');
    });
});

router.get('/delete', function(req, res){
    if(req.query.school_id == null) {
        res.send('school_id is null');
    }
    else {
         school_dal.delete(req.query.school_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 //poor practice, but we will handle it differently once we start using Ajax
                 res.redirect(302, '/item/all');
             }
         });
    }
});

module.exports = router;
