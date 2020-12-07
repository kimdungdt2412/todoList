function TaskList(){
    this.arr = [];

    TaskList.prototype._findIndex = function(_id){
        
        return this.arr.findIndex(function (item){
            return Number(_id) === item.id;
        })
    };

    TaskList.prototype.addTask = function(task){
        this.arr.push(task);
    };

    TaskList.prototype.deleteTask = function(_id){
        var _index = this._findIndex(_id);
        if( _index !== -1){
            this.arr.splice(_index, 1);
        }    
    };

    TaskList.prototype.getTaskById = function(_id){

        var _index = this._findIndex(_id);
        return this.arr[_index];
    }

    TaskList.prototype.updateTask = function(_id){
        var _index = this._findIndex(_id);
        var _status = this.arr[_index].status;
        if(_status === 'todo')
        {
            this.arr[_index].status = 'completed';
        }
        else{
            this.arr[_index].status = 'todo';
        }
    }


}

