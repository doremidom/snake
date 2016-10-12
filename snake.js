$(document).ready(function() {
    

//creating the object that holds grid data
function grid(){
    var row = []
    var grid = []
for(var i=0; i < 40; i++){
    row.push(' ')
};
for(var x=0; x < 40; x++){
    grid.push(row)

    } 

return grid;
}

function move(grid){
    var d = new_snake.direction
    switch(d) {
        case 'r':
        new_snake.position[1] ++;
        console.log(new_snake.position);
        break;
        case 'l':
        new_snake.position[1] --;
        console.log(new_snake.position);
        break;
        case 'u':
        new_snake.position[0] --;
        console.log(new_snake.position);
        break;
        case 'd':
        new_snake.position[0] ++;
        console.log(new_snake.position);
        break;       
    }
    clear_grid();
    render(grid);
}

function divAppend(content) {
        $('div.container').append('<div class="square">'+ content + '</div>');       
    }

function Snake(position, direction) {
    this.position = position;
    this.direction = direction;
}



function render(grid){
    for(var r=0; r< 40; r++) {
        for(var sq=0; sq < 41; sq++){
            if ( r == new_snake.position[0] && sq == new_snake.position[1])
            {
                divAppend('0');
                //console.log([r, sq])
            }
            else{
                //console.log([r, sq])
                divAppend('');
            }
        }

    }
}

function clear_grid(){
    $('div.container').html('')
}


//game functionality


//changing snake direction on arrow key press
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        new_snake.direction = 'l'
        console.log(new_snake.direction)
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
var game = grid(); 
var new_snake = new Snake([20,20], 'r');
render(game);

setInterval(function(){
move(game);


}, 1000);

});

