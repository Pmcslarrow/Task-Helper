/* taskHelper.js */

/* DOM OBJECTS */
let taskButton = document.getElementById("inputButton");
let priorityButton = document.getElementById("priorityButton");
let container = document.getElementsByClassName("container");
let content = document.getElementById("content");
let priorityList = document.getElementById("LIST");
let button = document.getElementById("bb");
let card_list = document.getElementById("card_list");
let red = document.getElementById("red");
let blue = document.getElementById("blue");
let green = document.getElementById("green");
let defaul = document.getElementById("default");
let card = null;



/* GLOBAL VARIABLES */
let list_of_values = [];
let copy = null;
let contentPointer = 0;
let numberOfCards = 0;
let currentValue = null;
let currentPriority = null;
let active = false;

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



button.addEventListener("click",start);

green.addEventListener("click", function(e){
    if (active === true)
    {
        card.forEach(i => {
            i.style.backgroundColor = "hsl(93, 90%, 40%)";
        });
    }
})

red.addEventListener("click", function(e){
    if (active === true)
    {
        card.forEach(i => {
            i.style.backgroundColor = "hsl(0, 100%, 65%)";
        });
    }
})

blue.addEventListener("click", function(e){
    if (active == true)
    {
        card.forEach(i => {
            i.style.backgroundColor = "hsl(216, 100%, 70%)";
        });
    }
})

defaul.addEventListener("click", function(e){
    if (active == true)
    {
        card.forEach(i => {
            i.style.backgroundColor = "#171717";
        });
    }
})
    


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

function start()
{
    if (button.getAttribute("state") === "on")
    {
        button.setAttribute("state", "off");
        button.innerHTML = "BUILD SCHEDULE";
        active = false;
        resetAll();
    } else {
        button.setAttribute("state", "on");
        button.innerHTML = "Click to Reset All";
        active = true;
        flush();
    }

    card = document.querySelectorAll('.card');
    
}

function resetAll()
{
    list_of_values = [];
    copy = null;
    contentPointer = 0;
    numberOfCards = 0;
    currentValue = null;
    currentPriority = null;

    instance.resetHeap();
    clearScreen();
}

function clearScreen()
{
    card_list.innerHTML = "";
}


/* Deletes the root node from the heap and then places the value onto the screen */
function flush()
{
    let SIZE = instance._heapData.length;
    let value = instance.delete();

    let article = document.createElement('article');
    article.setAttribute("class", "card");
    let header = document.createElement("header");
    header.setAttribute("id", "content" + numberOfCards.toString());
    let h2_pri = document.createElement("h2");
    h2_pri.innerHTML = "Priority:";
    let h2_task = document.createElement("h2");
    h2_task.innerHTML = "Task:";
    let p_pri = document.createElement("p");
    p_pri.innerHTML = value.priorityNumber;
    let p_task = document.createElement("p");
    p_task.innerHTML = value.taskString;
   

    h2_pri.appendChild(p_pri);
    h2_task.appendChild(p_task);
    article.appendChild(header);
    header.appendChild(h2_pri);
    header.appendChild(h2_task);
    card_list.appendChild(article);

    numberOfCards += 1;

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

    resetHeap()
    {
        this._heapData = [];
    }


    insert( value )
    {
        
        this._heapData.push(value);
        if (this._heapData.length === 1)
        {
            return;
        } else {
            let i = this._heapData.length - 1;
            while (i > 0)
            {
                if (this._heapData[i].priorityNumber < this._heapData[i - 1].priorityNumber)
                {
                    let temp = this._heapData[i - 1];
                    this._heapData[i - 1] = this._heapData[i];
                    this._heapData[i] = temp;
                    i--;
                } else break;
            }
        }
    }

    delete()
    {
        let value = this._heapData.pop();
        return value;
    }
}

let instance = new Heap();


