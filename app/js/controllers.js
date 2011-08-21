/* App Controllers */


function MyCtrl1() {
    var json_tasks = localStorage['tasks']
    if (json_tasks) this.tasks = JSON.parse(json_tasks)
    else this.tasks = []

    this.new_task_title = ''
    this.add_task = function(){
        this.tasks.push({title:this.new_task_title, id:guidGenerator()})
        this.new_task_title = ''
    }
    this.something = {}
    //this.something.current_task_id = this.tasks[0].id
    /*this.current_task = function(){
        return this.tasks[this.something.current_task_id]
    }*/

    this.tasks_json = _.debounce(function(){
        localStorage['tasks'] = JSON.stringify(this.tasks)
    }, 500)

    this.$watch('tasks_json()', function(){})

    this.$watch('something.current_task_id', function(){
        for (task in this.tasks){
            task = this.tasks[task]
            if (task.id === this.something.current_task_id) {
                this.current_task = task
                this.$eval()
                break
            }
        }
    })
}
//MyCtrl1.$inject = [];


function MyCtrl2() {
}
//MyCtrl2.$inject = [];
