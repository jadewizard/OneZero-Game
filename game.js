//window.onload = init();

function game (width,height)
{
    this.width = width;
    this.height = height;
    this.padding = 2;

    this.newGame = function ()
    {
        gameMod = 0;
        gridArray = new Array(3);
        
        for (i = 0; i < 4; i++)
        {
            gridArray[i] = new Array(3);

            for(j = 0; j < 4; j++)
            {
                gridArray[i][j] = undefined;
            }
        }
        this.arrayElement = gridArray; //Записываем массив в глобальную переменную.

        context.clearRect(0,0,480,480);
        this.drawField();
    }

    this.drawField = function (x)
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

    this.drawUnit = function (row,col,x,y)
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

function drawWinWindow (player)
{
    context.globalCompositeOperation = "darker";
    context.fillStyle = "#00008b"
    context.fillRect(0, 0, 455, 455);

    context.globalCompositeOperation = "xor";
    context.fillStyle = "#FFF";
    context.font = "54px Arial";
    if (player == 1)
    {
        context.fillText("PLAYER 1 WIN!", 452 / 15, 452 / 2);
    }
    else
    {
        context.fillText("PLAYER 2 WIN!", 452 / 15, 452 / 2);
    }

    context.font = "35px Arial";
    context.fillText("click to new game.", 452 / 15, 270);

    gameMod = 1; //Если гейммод = 1, то значит есть победитель.
}

function userAction ()
{
    canvas.onclick = function (event)
    {
        if (gameMod == 0)
        {
            row = Math.floor(event.pageX / (game.height + game.padding));
            col = Math.floor(event.pageY / (game.width + game.padding));
            //Определяем в какую ячейку нажал пользователь.

            //alert(row);
            //alert(col);

            if (currentStep == 1)
            {
                game.drawUnit(row,col,event.pageX,event.pageY);
                //Рисуем крестик
                game.arrayElement[row][col] = 1;
                //Устанавлием значение элемента массива (rpw,col) = 1
                //Если элемент массива = 1, то значит он уже занят.
                currentStep = 0;
            }
            else
            {
                game.drawZero(row,col,event.pageX,event.pageY);
                //Рисуем крестик
                game.arrayElement[row][col] = 0;
                //Устанавлием значение элемента массива (rpw,col) = 1
                //Если элемент массива = 1, то значит он уже занят.
                currentStep = 1;
            }
        }
        else
        {
            game.newGame();
        }
    }

    winCheck();
}

function winCheck ()
{
    for(i = 0; i < 3; i++)
    {
        if (game.arrayElement[0][i] != undefined &&
            game.arrayElement[0][i] == game.arrayElement[1][i] &&
            game.arrayElement[0][i] == game.arrayElement[2][i])
        {
            if (game.arrayElement[0][i] == 1)
            {
                drawWinWindow(1);
            }
            else
            {
                drawWinWindow(2);
            }
        }
        //Проверка строк

        if (game.arrayElement[i][0] != undefined &&
            game.arrayElement[i][0] == game.arrayElement[i][1] &&
            game.arrayElement[i][0] == game.arrayElement[i][2])
        {
            if (game.arrayElement[i][0] == 1)
            {
                drawWinWindow(1);
            }
            else
            {
                drawWinWindow(2);
            }
        }
        //Поверка столбцов

        if (game.arrayElement[0][0] != undefined &&
            game.arrayElement[1][1] != undefined &&
            game.arrayElement[2][2] != undefined &&
            game.arrayElement[0][0] == game.arrayElement[1][1] &&
            game.arrayElement[1][1] == game.arrayElement[2][2])
            drawWinWindow(1);

        if (game.arrayElement[0][2] != undefined &&
            game.arrayElement[1][1] != undefined &&
            game.arrayElement[2][0] != undefined &&
            game.arrayElement[0][2] == game.arrayElement[1][1] &&
            game.arrayElement[1][1] == game.arrayElement[2][0])
            drawWinWindow(1);
        //Проверка диагоналей
    }
}

function init()
{
    canvas = document.getElementById('field');
    canvas.width = 480;
    canvas.height = 480;
    context = canvas.getContext("2d");

    canvasWin = document.getElementById('winWindow');
    canvasWin.width = 480;
    canvasWin.height = 480;
    contextWin = canvasWin.getContext("2d");

    currentStep = 1;
    //Первый ход
    gameMod = 0; //Если 0, то победителя ещё нет // новая игра.
    
    //Рисуем игровое поле и сетку
    game = new game(150,150);
    game.newGame();
    //Таймер
    setInterval(userAction,10);
}