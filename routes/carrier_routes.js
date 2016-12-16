var express = require('express');
var router = express.Router();
var carrier_dal = require('../model/carrier_dal');
var address_dal = require('../model/address_dal');

router.get('/all', function(req, res) {
    carrier_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('carrier/carrierAll', { 'result':result });
        }
    });
});

router.get('/', function(req, res){
    if(req.query.c_id == null) {
        res.send('c_id is null');
    }
    else {
        carrier_dal.getById(req.query.c_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('carrier/carrierViewById', {'result': result});
           }
        });
    }
});

// Return the add a new carrier form
router.get('/add', function(req, res) {
    carrier_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('carrier/carrierAdd', {'carrier': result});
        }
    });
});

// View the carrier for the given id
router.get('/insert', function(req, res){
    if(req.query.c_name == null) {
        res.send('carrier Name must be provided.');
    }
    else {
        carrier_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.redirect(302, '/carrier/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.c_id == null) {
        res.send('A carrier id is required');
    }
    else {
        carrier_dal.edit(req.query.c_id, function(err, result){
            res.render('carrier/carrierUpdate', {carrier: result});
        });
    }
});

router.get('/edit2', function(req, res){
   if(req.query.c_id == null) {
       res.send('A carrier id is required 2');
   }
   else {
       carrier_dal.getById(req.query.c_id, function(err, carrier) {
           res.render('carrier/carrierUpdate', {carrier: carrier});
       });
   }
});

router.get('/update', function(req, res) {
    carrier_dal.delete(req.query.c_id, function(err, carrier){
        carrier_dal.insert(req.query, function(err, result) {
            res.redirect(302, '/carrier/all');
        });
    });
});

router.get('/delete', function(req, res){
    if(req.query.c_id == null) {
        res.send('c_id is null');
    }
    else {
         carrier_dal.delete(req.query.c_id, function(err, result){
             if(err) {
                 res.send(err);
             }
             else {
                 res.redirect(302, '/carrier/all');
             }
         });
    }
});

module.exports = router;
