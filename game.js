//window.onload = init();

function field (width,height)
{
    this.width = width;
    this.height = height;
    this.padding = 2;

    gridArray = new Array(3);

    for (i = 0; i < 4; i++)
    {
        gridArray[i] = new Array(3);

        for(j = 0; j < 4; j++)
        {
            gridArray[i][j] = undefined;
        }
    }

    this.arrayElement = gridArray;

    this.draw = function ()
    {
        for (i = 0; i < 3; i++)
        {
            for (j = 0; j < 3; j++)
            {
                if (this.arrayElement[i][j] == undefined)
                {
                    context.fillStyle = "#4c5866";
                    context.fillRect(i * (this.width + this.padding), j * (this.height + this.padding), this.width, this.height);
                }
                else if(this.arrayElement[i][j] == 1)
                {
                    context.fillStyle = "#FFF";
                    context.fillRect(i * (this.width + this.padding), j * (this.height + this.padding), this.width, this.height);
                }
            }
        }
    }

    this.drawCross = function (row,col)
    {
        //
    }

    this.drawZero = function (argument)
    {
        // body...
    }
}

function userAction ()
{
    canvas.onclick = function (event)
    {
        row = Math.floor(event.pageX / (field.height + field.padding));
        col = Math.floor(event.pageY / (field.width + field.padding));
        //Определяем в какую ячейку нажал пользователь.

        field.arrayElement[row][col] = 1;
        field.draw();
        //Рисуем крестик
    }
}

function init()
{
    canvas = document.getElementById('field');
    canvas.width = 480;
    canvas.height = 480;
    context = canvas.getContext("2d");
    
    //Рисуем игровое поле и сетку
    field = new field(150,150);
    field.draw();
    //Таймер
    setInterval(userAction,10);
}