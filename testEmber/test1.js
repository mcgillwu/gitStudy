window.Todos = Ember.Application.create();

Todos.ApplicationAdapter = DS.FixtureAdapter.extend();

Todos.Router.map(function () {
  this.resource('todos', { path: '/' });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('todo');
  }
});

Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

Todos.Todo.FIXTURES = [
  {
    id: 1,
    title: 'Learn Ember.js',
    isCompleted: true
  },
  {
    id: 2,
    title: '...',
    isCompleted: false
  },
  {
    id: 3,
    title: 'Profit!',
    isCompleted: false
  }
];

Todos.TodoController = Ember.ObjectController.extend({
  isCompleted: function(key, value){
    var model = this.get('model');

    if (value === undefined) {
      // property being used as a getter
      return model.get('isCompleted');
    } else {
      // property being used as  setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted')
});

Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function () {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    }
  }
});
