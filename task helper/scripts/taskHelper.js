/* taskHelper.js */

/* DOM OBJECTS */
let taskButton = document.getElementById("inputButton");
let priorityButton = document.getElementById("priorityButton");
let container = document.getElementsByClassName("container");
let content = document.getElementById("content");
let priorityList = document.getElementById("LIST");
let button = document.getElementById("bb");


/* GLOBAL VARIABLES */
let list_of_values = [];
let copy = null;
let contentPointer = 0;
let currentValue = null;
let currentPriority = null;

/* Event Listeners */
taskButton.addEventListener("keypress", function(e){
    if (e.key.toUpperCase() == "ENTER")
    {
        currentValue = taskButton.value.toString();

        if (isComplete(currentValue, currentPriority)){
            instance.insert(createTask(currentValue, parseInt(currentPriority)));
            currentValue = null;
            currentPriority = null;
        }
    }
})

priorityButton.addEventListener("keypress", function(e){
    if (e.key.toUpperCase() === "ENTER")
    {
        currentPriority = priorityButton.value.toString();

        if (parseInt(currentPriority) <= 0) {
            currentPriority = 1;
        } else if (parseInt(currentPriority) >= 10)
        {
            currentPriority = 10;
        }

        if (isComplete(currentValue, currentPriority))
        {
            instance.insert(createTask(currentValue, parseInt(currentPriority)));
            currentPriority = null;
            currentValue = null
        }
    }
})

button.addEventListener("click", flush);
    


//Functions
function createTask ( taskString, priorityNumber )
{
    return {taskString, priorityNumber};
}

function isComplete ( value, priority )
{
    if (value != null && priority != null)
    {
        return true
    } else {
        return false
    }
}

function flush()
{
    let SIZE = instance._heapData.length;
    let value = instance.delete();
    let li = document.createElement('li');
    li.innerHTML =" Priority (" + value.priorityNumber + ")" + "   " + "Task:  " +  value.taskString;
    priorityList.appendChild(li);

    if (SIZE === 1)
    {
        return;
    } else {
        
        flush();
    }
}



/* Creating the Heap */
class Heap{
    constructor()
    {
        this._heapData = []
    }

    get root_node()
    {
        return this._heapData[0];
    }

    get last_node()
    {
        return this._heapData[-1];
    }

    left_child_index( index )
    {
        return (index * 2) + 1;
    }

    right_child_index( index )
    {
        return (index * 2) + 2;
    }

    parent_index( index )
    {
        return Math.floor((index - 1) / 2);
    }

    has_greater_child( index )
    {
        return (
            (this._heapData[this.left_child_index(index)] && this._heapData[this.left_child_index(index)] > this._heapData[index])
            ||
            (this._heapData[this.right_child_index(index)] && this._heapData[this.right_child_index(index)] > this._heapData[index])
        );
    }

    calculate_larger_child_index( index )
    {
        if (!this._heapData[this.right_child_index(index)])
        {
            return this.left_child_index(index);
        }

        if (this._heapData[this.right_child_index(index)] > this._heapData[this.left_child_index(index)])
        {
            return this.right_child_index(index);
        } else {
            return this.left_child_index(index);
        }
    }

    swap (new_ind, par){
        let temp = this._heapData[new_ind];
        this._heapData[new_ind] = this._heapData[par];
        this._heapData[par] = temp;
    }
    
    /* 
    Adds the new record to the end of the array and then trickles upwards if the new_node is greater than the parent node
    */
    insert( value )
    {
        this._heapData.push(value);
        let new_node_index = this._heapData.length - 1;

        if (this._heapData[this.parent_index(new_node_index)])
        {
            while (new_node_index > 0 && this._heapData[new_node_index].priorityNumber > this._heapData[this.parent_index(new_node_index)].priorityNumber){
                this.swap(new_node_index, this.parent_index(new_node_index));
                new_node_index = this.parent_index(new_node_index);
            }
        }
    }

    delete()
    {
        let old_value = this._heapData[0];
        this._heapData[0] = this._heapData.pop();
        let trickle_index = 0;
        while (this.has_greater_child(trickle_index))
        {
            let larger_child_index = this.calculate_larger_child_index(trickle_index);
            this.swap(trickle_index, larger_child_index);
            trickle_index = larger_child_index;
        }
        return old_value;
    }
}

let instance = new Heap();
