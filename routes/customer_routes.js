var express = require('express');
var router = express.Router();
var customer_dal = require('../model/customer_dal');

router.get('/all', function(req, res) {
    customer_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('customer/customerAll', {'result':result });
        }
    });
});

router.get('/', function(req, res){
    if(req.query.cu_id == null) {
        res.send('cu_id is null');
    }
    else {
        customer_dal.getById(req.query.cu_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('customer/customerViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    customer_dal.getAll(function(err,customer) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('customer/customerAdd', {customer: customer});
        }
    });
});

router.get('/insert', function(req, res){
    // simple validation
    if(req.query.cu_id == null) {
        res.send('customer id must be provided.');
    }
    else {
        customer_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.redirect(302, '/customer/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.school_id == null) {
        res.send('A customer id is required');
    }
    else {
        school_dal.edit(req.query.school_id, function(err, result){
            res.render('customer/schoolUpdate', {school: result[0][0], address: result[1]});
        });
    }

});

router.get('/edit2', function(req, res){
    if(req.query.cu_id == null) {
        res.send('A customer id is required');
    }
    else {
        customer_dal.getById(req.query.cu_id, function(err, customer){
            res.render('customer/customerUpdate', {customer: customer});
        });
    }
});

router.get('/update', function(req, res){
    customer_dal.update(req.query, function(err, result){
        res.redirect(302, '/customer/all');
    });
});

router.get('/delete', function(req, res){
    if(req.query.cu_id == null) {
        res.send('cu_id is null');
    }
    else {
        customer_dal.delete(req.query.cu_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/customer/all');
            }
        });
    }
});

module.exports = router;
