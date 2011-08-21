(function() {
  window.MyCtrl1 = function() {
    var json_tasks;
    json_tasks = localStorage['tasks'];
    this.tasks = json_tasks ? JSON.parse(json_tasks) : {};
    this.tasks_list = function() {
      return _.values(this.tasks);
    };
    this.remove = function(task) {
      return delete this.tasks[task.id];
    };
    this.new_task_title = '';
    this.add_task = function() {
      var id;
      id = guidGenerator();
      this.tasks[id] = {
        title: this.new_task_title,
        id: id
      };
      return this.new_task_title = '';
    };
    this.something = {};
    this.tasks_json = _.debounce(function() {
      return localStorage['tasks'] = JSON.stringify(this.tasks);
    }, 500);
    this.$watch('tasks_json()', function() {});
    return this.$watch('something.current_task_id', function() {
      return this.current_task = this.tasks[this.something.current_task_id];
    });
  };
  window.MyCtrl2 = function() {};
}).call(this);
