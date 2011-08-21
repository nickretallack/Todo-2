window.MyCtrl1 = ->
    json_tasks = localStorage['tasks']
    @tasks = if json_tasks then JSON.parse json_tasks else {}

    @tasks_list = -> _.values(this.tasks)
    @remove = (task) -> delete this.tasks[task.id]

    @new_task_title = ''
    @add_task = ->
        id = guidGenerator()
        @tasks[id] =
            title:this.new_task_title
            id:id
        @new_task_title = ''

    @something = {}

    @tasks_json = _.debounce ->
        localStorage['tasks'] = JSON.stringify(this.tasks)
    , 500

    this.$watch 'tasks_json()', ->

    this.$watch 'something.current_task_id', ->
        this.current_task = this.tasks[this.something.current_task_id]


window.MyCtrl2 = ->
