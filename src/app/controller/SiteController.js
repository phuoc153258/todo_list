const Todo = require('../models/Todo');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Todo.find({})
            .then((todos) => {
                res.render('home', {
                    todos: mutipleMongooseToObject(todos),
                });
            })
            .catch(next);
    }

    //[POST]
    create(req, res, next){
        const todo = new Todo(req.body);
        todo.save({})
            .then((todo) => {
                res.redirect('/')
            })
            .catch(next)
    }

    //[PUT]
    update(req, res, next){
        let todoObj = req.body
        // let objectId = mongoose.Types.ObjectId(req.params.id);
        Todo.updateOne({ _id: req.params.id }, todoObj, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                res.redirect('/')
            }
        });
    }
}

module.exports = new SiteController();