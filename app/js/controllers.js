/* App Controllers */


function MyCtrl1() {
    var json_tasks = localStorage['tasks']
    if (json_tasks) this.tasks = JSON.parse(json_tasks)
    else this.tasks = {}
    this.tasks_list = function(){
        return _.values(this.tasks)
    }
    this.remove = function(task){
        delete this.tasks[task.id]
    }

    this.new_task_title = ''
    this.add_task = function(){
        var id = guidGenerator()
        this.tasks[id] = {title:this.new_task_title, id:id}
        this.new_task_title = ''
    }
    this.something = {}

    this.tasks_json = _.debounce(function(){
        localStorage['tasks'] = JSON.stringify(this.tasks)
    }, 500)

    this.$watch('tasks_json()', function(){})

    this.$watch('something.current_task_id', function(){
        this.current_task = this.tasks[this.something.current_task_id]
    })
}
//MyCtrl1.$inject = [];


function MyCtrl2() {
}
//MyCtrl2.$inject = [];
