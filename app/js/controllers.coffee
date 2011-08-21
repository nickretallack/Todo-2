window.MyCtrl1 = ->
    # load tasks
    json_tasks = localStorage['tasks']
    @tasks = if json_tasks then JSON.parse json_tasks else {}

    # use this to work around a scoping bug in angular bindings
    @something = {}

    # actions and aggregates
    @tasks_list = -> _.values(this.tasks)
    @remove = (task) -> 
        if @something.current_task_id is task.id 
            @something.current_task_id = null
        delete this.tasks[task.id]
    @add_task = ->
        task = 
            title:this.new_task_title
            id:guidGenerator()
        @tasks[task.id] = task
        @new_task_title = ''
    @save_tasks = _.debounce ->
        localStorage['tasks'] = JSON.stringify(this.tasks)
    , 500
    @something.task_status = (task) ->
        if task.done then 'done' else 'new'

    # watchers
    this.$watch 'save_tasks()', ->
    this.$watch 'something.current_task_id', ->
        this.current_task = this.tasks[this.something.current_task_id]


window.MyCtrl2 = ->
