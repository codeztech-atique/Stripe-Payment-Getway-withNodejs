var express = require('express');
const stripe = require('stripe')('sk_test_BdavkaT4hXelQXTZa7NzhS4k');
var app = express();

app.listen(3000, function () {
    console.log("server running");
});

//create new customer

var createCustomer = function () {
    var param ={};
    param.email ="mike@gmail.com";
    param.name="Mike";
    param.description ="from node";

    stripe.customers.create(param, function (err,customer) {
        if(err)
        {
            console.log("err: "+err);
        }if(customer)
        {
            console.log("success: "+customer)
        }else{
            console.log("Something wrong")
        }
    })

}

//createCustomer();

var retrieveCustomer = function () {

    stripe.customers.retrieve("cus_Gi1jjdxYhsaMN2", function (err,customer) {
        if(err)
        {
            console.log("err: "+err);
        }if(customer)
        {
            console.log("success: "+JSON.stringify(customer, null, 2));
        }else{
            console.log("Something wrong")
        }
    })
}
//retrieveCustomer();

var createToken = function () {

    var param = {};
    param.card ={
        number: '4242424242424242',
        exp_month: 2,
        exp_year:2024,
        cvc:'212'
    }

    stripe.tokens.create(param, function (err,token) {
        if(err)
        {
            console.log("err: "+err);
        }if(token)
        {
            console.log("success: "+JSON.stringify(token, null, 2));
        }else{
            console.log("Something wrong")
        }
    })
}
//createToken();

var addCardToCustomer = function () {

    stripe.customers.createSource('cus_Gi1jjdxYhsaMN2',{source: 'tok_1GAcj5CEXnEqdvqzXq4VFPGJ'}, function (err,card) {
        if(err)
        {
            console.log("err: "+err);
        }if(card)
        {
            console.log("success: "+JSON.stringify(card, null, 2));
        }else{
            console.log("Something wrong")
        }
    })
}

//addCardToCustomer();


var chargeCustomerThroughCustomerID = function () {

    var param = {
        amount: '2000',
        currency: 'usd',
        description:'First payment',
        customer:'cus_Gi1jjdxYhsaMN2'
    }

    stripe.charges.create(param, function (err,charge) {
        if(err)
        {
            console.log("err: "+err);
        }if(charge)
        {
            console.log("success: "+JSON.stringify(charge, null, 2));
        }else{
            console.log("Something wrong")
        }
    })
}
//chargeCustomerThroughCustomerID();

var chargeCustomerThroughTokenID = function () {

    var param = {
        amount: '2000',
        currency: 'usd',
        description:'First payment',
        source:'tok_1GFGKuCEXnEqdvqz10yhHl8s'
    }

    stripe.charges.create(param, function (err,charge) {
        if(err)
        {
            console.log("err: "+err);
        }if(charge)
        {
            console.log("success: "+JSON.stringify(charge, null, 2));
        }else{
            console.log("Something wrong")
        }
    })
}

//chargeCustomerThroughTokenID();

var getAllCustomers = function () {


    stripe.customers.list({limit: 4},function (err,customers) {
        if(err)
        {
            console.log("err: "+err);
        }if(customers)
        {
            console.log("success: "+JSON.stringify(customers.data, null, 2));
        }else{
            console.log("Something wrong")
        }
    })
}

getAllCustomers();
