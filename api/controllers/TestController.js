/**
 * TestController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req, res) {
        console.log('111');
        var test = Test.create({
            id: 'aaa'
        }).exec(console.log);
        console.log(test);
        return res.ok('Hello');
    },
    create: function(req, res) {
        var name = req.param('name');
        Test.create({
            name: name
        }).exec(function(err, r) {
            if (err) {
                throw err;
            } else {
                return res.json(r);
            }

        });

    },
    findOne: function(req, res) {
        var name = req.param('name');
        Test.findOne({
            name: name
        }).exec(function(err, r) {
            if (err) {
                throw err;
            } else {
                return res.json(r);
            }
        });
    },
    page: function(req, res) {
        var name = req.param('name');
        var start = req.param('start') || 0;
        var pageSize = req.param('pageSize') || 10;
        var query = Test.find();
        query.skip(start);
        query.limit(pageSize);
        query.exec(function callBack(err, results) {
            return res.json(results);
        });
    },
    count: function(req, res) {
        var name = req.param('name');
        Test.count({
            name: name
        }).exec(function countCB(err, c) {
            console.log(1);
            if (err) {
                console.log(2);
                throw err;
            } else {
                console.log(3, c);
                return res.ok('Ok' + c);
            }
        });
    },
    query: function(req, res) {
        Test.query('SELECT name FROM test', function(err, results) {
            if (err) return res.serverError(err);
            return res.ok(results);
        });
    },
    destroy: function(req, res) {
        var name = req.param('name');
        Test.destroy({
            name: name
        }).exec(function deleteCB(err) {

            if (err) {
                throw err;
            } else {
                console.log('The record has been deleted');
                return res.ok(name + ' has been destroyedz!');
            }
        });
    }
};
