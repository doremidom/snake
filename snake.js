$(document).ready(function() {
    

//creating the object that holds grid data
function grid_maker(){   
    var grid = []

for(var x=0; x < 40; x++){
        var row = [];
    for(var i=0; i < 40; i++){ 
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

    //replacing grids with s for snake body
    for(var b= 0; b <= size-1 ; b++){
        var s = new_snake.position;
        var position =  s[b];
        grid[position[0]][position[1]] = 's';
        //console.log('adding an s at ' + position[0] + ', '+ position[1]);
    }

    var s = new_snake.position[0]

    var direction = new_snake.direction

    
    switch(direction) {
    case 'r':

    grid[old_position[0]][old_position[1]-size] = ' ';
    //console.log(new_snake.position);
    break;
    case 'l':
    grid[old_position[0]][old_position[1]+size] = ' ';
    //console.log(new_snake.position);
    break;
    case 'u':
    grid[old_position[0]+size][old_position[1]] = ' ';
    //console.log(new_snake.position);
    break;
    case 'd':
    grid[old_position[0]-(size)][old_position[1]] = ' ';

    //console.log(new_snake.position);
    break;   
            
    }
    //console.log('removing' + [old_position[0], (old_position[1]-size)])
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
        return true;
    }
    else{
        false;
    }
}

function food(coordinates, grid){
    if (grid[coordinates[0]][coordinates[1]] == 'X') {
        return true;
    }
    false;
}

function eat(coordinates, grid){
    console.log('begin eat');
    //remove the food
    grid[coordinates[0]][coordinates[1]] = ' ';

    //add size to snake
    new_snake.size ++

    //add to snake body
    grow();

    grid = food_maker(grid);

    return snake_render(grid);
}

function grow(){
    //adds next coordinate pair to snake position
    console.log('growing!')
    var direction = new_snake.direction
    var snake_head = new_snake.position[0]
    var snake_x = snake_head[0]
    var snake_y = snake_head[1]
    var size = new_snake.size-1

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
    //console.log('added to snake position: ' + new_snake.position[(new_snake.position.length)-1]);
}
    

function move(grid){ 
    //console.log('begin move')
    //moves the coordinate pairs of the snake
    var d = new_snake.direction
    var size = new_snake.size 
    switch(d) {
        case 'r':
        for(var b=0; b < (size); b++){
            new_snake.position[b][1] ++;    
        }
        //console.log('moving right' + new_snake.position[new_snake.position.length-1]);
        //console.log(new_snake.position);
        break;
        case 'l':
        for(var b=0; b < (size); b++){
        new_snake.position[b][1] --;}
        //console.log(new_snake.position);
        break;
        case 'u':
        for(var b=0; b < (size); b++){
        new_snake.position[b][0] --;}
        //console.log(new_snake.position);
        break;
        case 'd':
        for(var b=0; b < (size); b++){
        new_snake.position[b][0] ++;}
        //console.log(new_snake.position);
        break;       
    }
    console.log(new_snake.position[0] + new_snake.position[1])

    clear_grid();

    if (valid_position(new_snake.position[0])){
        
        if (food(new_snake.position[0], grid)) {
            //console.log(grid)
            console.log('eating at' + new_snake.position[0])

            grid = eat(new_snake.position[0], grid);
            //console.log(grid)
        }
        //console.log('rendering hello')
        var new_grid = snake_render(grid)
        //console.log(new_grid)
        render(new_grid);
    }
    else {
        game_over();
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
    for(var r=0; r < 40; r++) {
        for(var sq=0; sq < 40; sq++){
            if ( grid[r][sq] == 's')
            {
                divAppend('0');
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

var begin = setInterval(function(){move(game);}, 10);

});

