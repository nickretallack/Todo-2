(function() {
  window.MyCtrl1 = function() {
    var json_tasks;
    json_tasks = localStorage['tasks'];
    this.tasks = json_tasks ? JSON.parse(json_tasks) : {};
    this.something = {};
    this.tasks_list = function() {
      return _.values(this.tasks);
    };
    this.remove = function(task) {
      if (this.something.current_task_id === task.id) {
        this.something.current_task_id = null;
      }
      return delete this.tasks[task.id];
    };
    this.add_task = function() {
      var task;
      task = {
        title: this.new_task_title,
        id: guidGenerator()
      };
      this.tasks[task.id] = task;
      return this.new_task_title = '';
    };
    this.save_tasks = _.debounce(function() {
      return localStorage['tasks'] = JSON.stringify(this.tasks);
    }, 500);
    this.something.task_status = function(task) {
      if (task.done) {
        return 'done';
      } else {
        return 'new';
      }
    };
    this.$watch('save_tasks()', function() {});
    return this.$watch('something.current_task_id', function() {
      return this.current_task = this.tasks[this.something.current_task_id];
    });
  };
  window.MyCtrl2 = function() {};
}).call(this);
