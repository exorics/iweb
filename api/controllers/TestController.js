/**
 * TestController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /**
     *  index默认页面
     *  http://ip:1337/test
     */
    index: function(req, res) {
        return res.ok('Hello');
    },
    /**
     *
     * 调用创建
     * @param  {[type]} 
     * @param  {[type]}
     * @return {[type]}
     */
    save: function(req, res) {
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
    /**
     * 匹配查询
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */
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
    /**
     * 分页查询
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */
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
    /**
     * 记录数查询
     * 
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */
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
    /**
     * 执行原生SQL
     * type: 默认为查询全部
     *       d    -- 删除一个，传入name
     *       da   -- 删除全部
     *       
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */
    query: function(req, res) {
        var type = req.param('type');
        var sql = 'SELECT name FROM test ';
        var values;
        if ('da' == type) {
            sql = 'DELETE FROM TEST ';
        } else if ('d' == type) {
            var name = req.param('name');
            values = [name];
            sql = 'DELETE FROM TEST where name = ? ';
        } else if ('s' == type) {
        	var name = req.param('name');
        	values = [name];
            sql += 'where name= ? ';
        }
        if (values) {
            Test.query(sql, values,function(err, results) {
                if (err) return res.serverError(err);
                return res.ok(results);
            });
        } else {
            Test.query(sql, function(err, results) {
                if (err) return res.serverError(err);
                return res.ok(results);
            });
        }

    },
    /**
     * 销毁对象
     * @param  {[type]}
     * @param  {[type]}
     * @return {[type]}
     */
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
