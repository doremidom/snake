$(document).ready(function() {

// var grid_dimensions = [40, 40];
var grid_dimension = 40;

//creating the object that holds grid data
function grid_maker(){   
    var grid = []

for(var x=0; x < grid_dimension; x++){
        var row = [];
    for(var i=0; i < grid_dimension; i++){ 
        row.push(' ');
    };
    grid.push(row);
} 
//add food

grid = food_maker(grid)


return grid;
}

function food_maker(grid){
    var location = food_spot();
    grid[location[0]][location[1]] = 'X';
    return grid
}


function snake_render(grid){
    //console.log('begin snake render')
    //put snake's position on new grid
    var size = new_snake.size;
    var old_position = new_snake.position[0];


    // clearing everything but food
    for (var i=0; i<grid_dimension; i++) {
        for (var j=0; j<grid_dimension; j++) {
            if (grid[i][j] != 'X')
                grid[i][j] = ' ';
        }
    }


    //replacing grids with s for snake body
    for(var b= 0; b <= size-1 ; b++){
        var s = new_snake.position;
        var position =  s[b];

        grid[position[0]][position[1]] = 's';
 
    }

    var s = new_snake.position[0]

    var direction = new_snake.direction

    
    return grid;
    }
    

function food_spot(){
    var fx = Math.floor(Math.random() * 39);
    var fy = Math.floor(Math.random() * 39);
    var food_coordinates = [fx, fy];
    return food_coordinates;
}

function valid_position(coordinates){
    if ((coordinates[0] < 41 && coordinates[0] >= 0 ) && coordinates[1] < 41 && coordinates[1] >= 0 ){
        if (game[coordinates[0]][coordinates[1]] == 's'){
            return false;
        } 
        return true;
    }
    false;
}

function food(coordinates, grid){
    if (grid[coordinates[0]][coordinates[1]] == 'X') {
        return true;
    }
    false;
}

function eat(coordinates, grid){
    console.log('begin eat');
    //console.log(new_snake)
    
    //remove the food from board
    grid[coordinates[0]][coordinates[1]] = ' ';

    //add to snake body
    //debugger;
    grow();
    console.log('after grow')
    console.log('snake coordinates:' + new_snake.position)

    grid = food_maker(grid);

    return grid;
    // return snake_render(grid);
}

function grow(){
    //adds next coordinate pair to snake position
    //console.log('growing!')
    //console.log(new_snake)
    var direction = new_snake.direction
    var snake_head = new_snake.position[0]
    var snake_x = snake_head[0]
    var snake_y = snake_head[1]
    var size = new_snake.size

    switch(direction) {
        case 'r':
        new_snake.position.push([snake_x, snake_y-size]);      
        break;
        case 'l':
        new_snake.position.push([snake_x,(snake_y+size)]);
        //console.log(new_snake.position);
        break;
        case 'u':
        new_snake.position.push([snake_x-size,snake_y]);
        //console.log(new_snake.position);
        break;
        case 'd':
        new_snake.position.push([snake_x+size,snake_y]);
        //console.log(new_snake.position);
        break;
    }

    //add size to snake
    new_snake.size ++
    //console.log('after grow');
    //console.log(new_snake);
    console.log('added to snake position from grow: ' + new_snake.position[(new_snake.position.length)-1]);

}
    

function move(grid){ 
    console.log('begin move')
    //console.log(new_snake)
    //moves the coordinate pairs of the snake
    var d = new_snake.direction;
    var size = new_snake.size;
    var head = new_snake.position[0];
    var new_head = 0; 

    switch(d) {
        case 'r':
            new_head = [head[0], (head[1]+1)];
            break;
        case 'l':
            new_head = [head[0], (head[1]-1)];
            break;
        case 'u':
            new_head = [head[0]-1, head[1]];
            break;
        case 'd':
            new_head = [head[0]+1, head[1]];
            break;
    }

    console.log('snake coordinates: ' + new_snake.position)

    clear_grid();

    if (valid_position(new_head)){
        console.log('move valid')
        console.log('snake coordinates:' + new_snake.position)
        
        if (food(new_head, grid)) {
            console.log('beginning eating at ' + new_snake.position[0])


            grid = eat(new_head, grid);


        }
        else {
            var gone = new_snake.position.pop();
            console.log('removed' + gone);
            console.log('added to snake position' + new_head);
            new_snake.position.unshift(new_head);
        }
        
        console.log(new_snake.position)


   
        var new_grid = snake_render(grid)

        render(new_grid);
    }
    else {
        game_over();
        render(grid);
    }
}

function divAppend(content) {
        $('div.container').append('<div class="square">'+ content + '</div>');       
    }

function Snake(position, direction, size) {
    this.position = [position];
    this.direction = direction;
    this.size = size;
}


function render(grid){
    //console.log('begin render')
    var ss = 0;
    for(var r=0; r < grid_dimension; r++) {
        for(var sq=0; sq < grid_dimension; sq++){
            if ( grid[r][sq] == 's')
            {
                divAppend('0');
                ss++;
                //console.log([r, sq])
            }
            else if (grid[r][sq] == 'X'){
                divAppend('X');
            }
            else{
                //console.log([r, sq])
                divAppend(' ');
            }
        }

    }
    //console.log("rendered " + ss + " ss");
}

function clear_grid(){
    $('div.container').html('');
}

function game_over(){
    clearInterval(begin)
    $('body').html('<div><h2>GAME OVER :(</h2></div>')
}


//game functionality


//changing snake direction on arrow key press
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        new_snake.direction = 'l'
        //console.log(new_snake.direction)
        break;

        case 38: // up
        new_snake.direction = 'u'

        break;

        case 39: // right
        new_snake.direction = 'r'
        break;

        case 40: // down
        new_snake.direction = 'd'
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

//game loop
var new_snake = new Snake([20,20], 'r', 1);
var game = grid_maker(); 
render(game);
//console.log('beginning game')
//console.log(new_snake)
var begin = setInterval(function(){move(game);}, 10);

});

