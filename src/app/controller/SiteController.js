const Todo = require("../models/Todo");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");

class SiteController {
  // [GET] /
  index(req, res, next) {
    Todo.find({})
      .then((todos) => {
        res.render("home", {
          todos: mutipleMongooseToObject(todos),
        });
      })
      .catch(next);
  }

  //[POST]
  create(req, res, next) {
    const todo = new Todo(req.body);
    todo.save({})
      .then((todo) => {
        res.redirect("/");
      })
      .catch(next);
  }

  //[PUT]
  update(req, res, next) {
    let todoObj = req.body
    if(!todoObj.isCompleted) todoObj.isCompleted = false
    Todo.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/'))
      .catch(next)
  }

    // [DELETE]
    delete(req, res, next) {
      Todo.deleteOne({ _id: req.params.id})
          .then( () => {
            res.redirect('/')
          })
          .catch(next)
  }
}

module.exports = new SiteController();
