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

    this.draw = function (x)
    {
        this.x = x;
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
                    //this.drawCross();
                }
            }
        }
    }

    this.drawCross = function (row,col,x,y)
    {
        this.row = row;
        this.col = col;
        this.x = x;
        this.y = y;

        if (this.arrayElement[this.row][this.col] == undefined)
        {
            context.fillStyle = "#FFF";
            context.font = "100px Arial";
            context.fillText("1",this.x,this.y);
        }
    }

    this.drawZero = function (row,col,x,y)
    {
        this.row = row;
        this.col = col;
        this.x = x;
        this.y = y;

        if (this.arrayElement[this.row][this.col] == undefined)
        {
            context.fillStyle = "#FFF";
            context.font = "100px Arial";
            context.fillText("0",this.x,this.y);
        }
    }
}

function userAction ()
{
    canvas.onclick = function (event)
    {
        row = Math.floor(event.pageX / (field.height + field.padding));
        col = Math.floor(event.pageY / (field.width + field.padding));
        //Определяем в какую ячейку нажал пользователь.

        //alert(row);
        //alert(col);

        if (currentStep == 1)
        {
            field.drawCross(row,col,event.pageX,event.pageY);
            //Рисуем крестик
            field.arrayElement[row][col] = 1;
            //Устанавлием значение элемента массива (rpw,col) = 1
            //Если элемент массива = 1, то значит он уже занят.
            currentStep = 0;
        }
        else
        {
            field.drawZero(row,col,event.pageX,event.pageY);
            //Рисуем крестик
            field.arrayElement[row][col] = 0;
            //Устанавлием значение элемента массива (rpw,col) = 1
            //Если элемент массива = 1, то значит он уже занят.
            currentStep = 1;
        }

    }

    winCheck();
}

function winCheck ()
{
    if((field.arrayElement[0][0] == 1) && 
       (field.arrayElement[1][0] == 1) &&
       (field.arrayElement[2][0] == 1))
    {
        alert("win");
    }
    else if((field.arrayElement[0][1] == 1) && 
            (field.arrayElement[1][1] == 1) &&
            (field.arrayElement[2][1] == 1))
    {
        alert("win");
    }
}

function init()
{
    canvas = document.getElementById('field');
    canvas.width = 480;
    canvas.height = 480;
    context = canvas.getContext("2d");

    currentStep = 1;
    //Первый ход
    
    //Рисуем игровое поле и сетку
    field = new field(150,150);
    field.draw();
    //Таймер
    setInterval(userAction,10);
}