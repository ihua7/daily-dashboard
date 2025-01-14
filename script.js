$.getJSON("https://api.weather.gov/gridpoints/LOT/75,72/forecast/", function(weatherdata){
    var temp =(weatherdata.properties.periods[0].temperature);
    $('#temp').text(`${temp}F°`);

    var wind =(weatherdata.properties.periods[0].windSpeed);
    $('#wind').text(`wind speed: ${wind}`);

    var forecasts=(weatherdata.properties.periods[0].shortForecast);
    $('#desc').text(`${forecasts.toLowerCase()}`);
    var forecast=(weatherdata.properties.periods[0].detailedForecast)
    var parts = forecast.split('.');
    for(i=0;i<parts.length; i++){
        if(parts[i].toLowerCase().indexOf("precipitation") >= 0){
            var chance = parts[i].toLowerCase();
            console.log(chance);
            $('#chance').text(`${chance}`);
        } 
    }
    
    if (forecast.toLowerCase().indexOf("rain") >= 0){
        $('#tips').text("bring an umbrella!")
    }

    if(temp<60){
        $('#tips').text("wear a jacket!")
        var parts = forecast.split('.');
        for(i=0;i<parts.length; i++){
            if(parts[i].toLowerCase().indexOf("precipitation") >= 0){
                var chance = parts[i].match(/\d+/);
                if(chance >=40){
                    $('#tips').append(" or don't go outside at all")
                }
            } 
            
        }
    }
});

//i followed a tutorial for this
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);

function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault();
  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //Save to local - do this last
  //Save to local
  saveLocalTodos(todoInput.value);
  //
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash button

  //attach final Todo
  todoList.appendChild(todoDiv);
}
function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "complete-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("fall");
    //at the end
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button

    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

//omygod
document.addEventListener('DOMContentLoaded', function() {
  var events = [
    {
      id: 'a',
      title: 'web design',
      startRecur: '2025-01-13',
      endRecur: '2025-02-10',
      daysOfWeek:[1,2,3],
      startTime:'12:00',
      endTime:'17:00'
    },
    {
      id: 'b',
      title:'FINAL!',
      allDay: true,
      start: '2025-02-09'
    }
  ]
  var calendarEl = document.getElementById('calendar1');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events
  });
  calendar.render();
  var calendarDay = document.getElementById('tEvents');
  var calendar2 = new FullCalendar.Calendar(calendarDay, {
    initialView: 'listDay', 
    headerToolbar: false,
    height:'auto',
    events
  });
  calendar2.render();
  var calendarUp = document.getElementById('uEvents');
  var divsel = document.getElementById('uEvents');
  var calendar3 = new FullCalendar.Calendar(calendarUp, {
    initialView: 'listWeek',
    headerToolbar: false,
    events
  });
  calendar3.render();
});

var g = function(sketch){
  var button;
  let picker, slider;
  sketch.setup=function(){
    var canvasDiv = document.getElementById('scratchpad');
    var cnv = sketch.createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight-10, this.WEBGL);
    var w=canvasDiv.offsetWidth, h= canvasDiv.offsetHeight;
    sketch.background(255);
    sketch.frameRate(60);
    button = sketch.createButton('clear');
    button.style('border', 'none');
    button.style('height', 30);
    button.style('width', 50);
    button.position(0, 0);
    button.parent('scratchpad');
    button.mousePressed(doStuff);
    picker = sketch.createColorPicker('#ed225d');
    picker.position(50,0);
    picker.style('border', 'none');
    picker.style('height', 30);
    picker.style('width', 50);
    picker.parent('scratchpad');
  }   
  sketch.draw=function(){ 
    var canvasDiv = document.getElementById('scratchpad');
    var w=canvasDiv.offsetWidth, h=canvasDiv.offsetHeight;
    var targetX = sketch.mouseX;
    var targetY = sketch.mouseY;
    if(sketch.mouseIsPressed==true){
      //sketch.ellipse(x-w/2, y-h/2, 6);
      sketch.stroke(picker.color());
      sketch.strokeWeight(5);
      sketch.line(targetX-w/2, targetY-h/2 , sketch.pmouseX-w/2, sketch.pmouseY-h/2);
    }
  }

  function doStuff(){
    sketch.background(255);
  }
  sketch.windowResized=function() {
    var canvasDiv = document.getElementById('box9');
    var w=canvasDiv.offsetWidth, h= canvasDiv.offsetHeight;
    sketch.resizeCanvas(w, h, 5);
    button.position(w, h);
  }
}
var box9 = new p5(g, 'scratchpad');