dmp = new diff_match_patch()

window.MyCtrl1 = ->
    # load tasks
    json_tasks = localStorage['tasks']
    @tasks = if json_tasks then JSON.parse json_tasks else {}

    # use this to work around a scoping bug in angular bindings
    @something = {}

    # actions and aggregates
    @tasks_list = -> _.values(this.tasks)

    @prerequisite_tasks_list = (parent) ->
        return [] unless parent
        @tasks[id] for id of parent.prerequisites

    @postrequisite_tasks_list = (parent) ->
        return [] unless parent
        @tasks[id] for id of parent.postrequisites

    @remove = (task) -> 
        if @something.current_task_id is task.id 
            @something.current_task_id = null
        delete this.tasks[task.id]
    @add_task = ->
        task = make_task(@new_task_title)
        @new_task_title = ''
    @old_json_tasks = JSON.stringify(@tasks)
    @something.task_status = (task) ->
        if task.done then 'done' else 'new'

    @add_prerequisite = ->
        task = make_task(@new_prerequisite_task_title)
        @add_relationship task, @current_task
        @new_prerequisite_task_title = ''

    @add_postrequisite = ->
        task = make_task(@new_postrequisite_task_title)
        @add_relationship @current_task, task
        @new_postrequisite_task_title = ''

    @associate_prerequisite = (task, current_task) ->
        @add_relationship task, current_task
        @new_prerequisite_task_title = ''

    @associate_postrequisite = (current_task, task) ->
        @add_relationship current_task, task
        console.log @new_postrequisite_task_title
        @new_postrequisite_task_title = ''

    @add_relationship = (prerequisite, postrequisite) ->
        postrequisite.prerequisites[prerequisite.id] = true
        prerequisite.postrequisites[postrequisite.id] = true

    @remove_relationship = (prerequisite, postrequisite) ->
        delete postrequisite.prerequisites[prerequisite.id]
        delete prerequisite.postrequisites[postrequisite.id]
        
    make_task = (title) =>
        task = 
            title:title
            id:guidGenerator()
            prerequisites:{}
            postrequisites:{}
        @tasks[task.id] = task
        task
        
    @current_task = null
    # watchers
    this.$onEval _.debounce ->
        json_tasks = JSON.stringify(@tasks)
        localStorage['tasks'] = json_tasks
        console.log dmp.patch_make @old_json_tasks, json_tasks
        @old_json_tasks = json_tasks
    , 500

    this.$watch 'something.current_task_id', ->
        @current_task = this.tasks[@something.current_task_id]


window.MyCtrl2 = ->
