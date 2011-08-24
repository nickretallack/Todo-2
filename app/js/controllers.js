(function() {
  var dmp, socket;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  dmp = new diff_match_patch();
  socket = io.connect('/');
  window.MyCtrl1 = function() {
    var json_tasks, make_task;
    json_tasks = localStorage['tasks'];
    this.tasks = json_tasks ? JSON.parse(json_tasks) : {};
    this.something = {};
    this.tasks_list = function() {
      return _.values(this.tasks);
    };
    this.prerequisite_tasks_list = function(parent) {
      var id, _results;
      if (!parent) {
        return [];
      }
      _results = [];
      for (id in parent.prerequisites) {
        _results.push(this.tasks[id]);
      }
      return _results;
    };
    this.postrequisite_tasks_list = function(parent) {
      var id, _results;
      if (!parent) {
        return [];
      }
      _results = [];
      for (id in parent.postrequisites) {
        _results.push(this.tasks[id]);
      }
      return _results;
    };
    this.remove = function(task) {
      if (this.something.current_task_id === task.id) {
        this.something.current_task_id = null;
      }
      return delete this.tasks[task.id];
    };
    this.add_task = function() {
      var task;
      task = make_task(this.new_task_title);
      return this.new_task_title = '';
    };
    this.old_json_tasks = JSON.stringify(this.tasks);
    this.something.task_status = function(task) {
      if (task.done) {
        return 'done';
      } else {
        return 'new';
      }
    };
    this.add_prerequisite = function() {
      var task;
      task = make_task(this.new_prerequisite_task_title);
      this.add_relationship(task, this.current_task);
      return this.new_prerequisite_task_title = '';
    };
    this.add_postrequisite = function() {
      var task;
      task = make_task(this.new_postrequisite_task_title);
      this.add_relationship(this.current_task, task);
      return this.new_postrequisite_task_title = '';
    };
    this.associate_prerequisite = function(task, current_task) {
      this.add_relationship(task, current_task);
      return this.new_prerequisite_task_title = '';
    };
    this.associate_postrequisite = function(current_task, task) {
      this.add_relationship(current_task, task);
      console.log(this.new_postrequisite_task_title);
      return this.new_postrequisite_task_title = '';
    };
    this.add_relationship = function(prerequisite, postrequisite) {
      postrequisite.prerequisites[prerequisite.id] = true;
      return prerequisite.postrequisites[postrequisite.id] = true;
    };
    this.remove_relationship = function(prerequisite, postrequisite) {
      delete postrequisite.prerequisites[prerequisite.id];
      return delete prerequisite.postrequisites[postrequisite.id];
    };
    make_task = __bind(function(title) {
      var task;
      task = {
        title: title,
        id: guidGenerator(),
        prerequisites: {},
        postrequisites: {}
      };
      this.tasks[task.id] = task;
      return task;
    }, this);
    this.current_task = null;
    this.$onEval(_.debounce(function() {
      var patch;
      json_tasks = JSON.stringify(this.tasks);
      patch = dmp.patch_make(this.old_json_tasks, json_tasks);
      if (patch.length) {
        console.log("sending", patch);
        socket.emit('patch', JSON.stringify(patch));
      }
      return this.old_json_tasks = json_tasks;
    }, 500));
    socket.on('patch', __bind(function(patch) {
      patch = JSON.parse(patch);
      json_tasks = this.old_json_tasks = dmp.patch_apply(patch, JSON.stringify(this.tasks))[0];
      this.tasks = JSON.parse(json_tasks);
      return this.$eval();
    }, this));
    return this.$watch('something.current_task_id', function() {
      return this.current_task = this.tasks[this.something.current_task_id];
    });
  };
  window.MyCtrl2 = function() {};
}).call(this);
