let canvas = document.getElementById('snake'); // Referência ao id do canvas no HTML
let context = canvas.getContext('2d'); // Define contexto, 3d ou 2d
let box = 32; // Tamahno em pixels de um frame
let snake = [ // Posição e tamanho iniciais
    {
        x : 8 * box,
        y : 8 * box
    }
];
let direction = 'right'; // Direção inicial
let food = { // Posição aleatória da comida
    x : Math.floor(Math.random() * 15 + 1) * box,
    y : Math.floor(Math.random() * 15 + 1) * box
};
let pontuacao = 0; // Quantidade de pontos
let pausado = false; // Controlador de pause
let gameOver = false; // Controlador de Game Over
let sfxComidinha = new Audio('./sfx/sfxPonto.wav');
let sfxGameOver = new Audio('./sfx/sfxFail.wav');
let sfxRestart = new Audio('./sfx/sfxRestart.wav');
let sfxPauseIn = new Audio('./sfx/sfxPauseIn.wav');
let sfxPauseOut = new Audio('./sfx/sfxPauseOut.wav');


const criarBackground = () => {
    context.fillStyle = '#262626'; // Cor que será usada no fundo canvas
    context.fillRect(0, 0, 16 * box, 16 * box); // Desenha o canvas, (x, y, altura, largura) de cada quadrado -> 16 * 32 = 512
};

const criarSnake = () => {
    for ( let i = 0; i < snake.length; i ++ ){
        context.shadowBlur = 30; // Embaçamento que sera aplicado na sombra da cobrinha
        context.shadowColor = 'rgb(0, 255, 13)'; // Cor da sombra da cobrinha
        context.fillStyle = 'rgb(0, 255, 13)'; // Cor que será usada na cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); // Desenha a cobrinha de acordo com o tamanho do vetor snake
    }
}

const criarComida = () => {
    context.shadowBlur = 30; // Embaçamento que sera aplicado na sombra da comidinha
    context.shadowColor = 'rgb(241, 0, 141)';  // Cor da sombra da comidinha
    context.fillStyle = 'rgb(241, 0, 141)'; // Cor que será usada na comidinha
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', (event) => { // "Escuta" o evento de apertar uma tecla
    // Todas as teclas definidas e faz com que não possa voltar para a direção inversa no mesmo eixo -> se estou para a direita, não posso ir para esquerda; se estou para cima, não posso ir para baixo.
    if( !pausado){
        if ( event.key == 'ArrowRight' && direction !== 'left' ) direction = 'right';
        if ( event.key == 'ArrowLeft' && direction !== 'right' ) direction = 'left';
        if ( event.key == 'ArrowDown' && direction !== 'up' ) direction = 'down';
        if ( event.key == 'ArrowUp' && direction !== 'down' ) direction = 'up';
    }
    
    // Se a tecla p for pressionada, o jogo pausa
    if( event.key == 'p'){
        if(!gameOver){
            if(!pausado) pausarJogo(true);
            else pausarJogo(false);
        }
    }

    // Se a tecla r for pressionada, o jogo reinicia
    if(event.key == 'r'){
        reiniciarJogo();
    }
});

const iniciarJogo = () => {
    // Se a cobrinha atingir o limite do canvas, faz com que apareça do outro lado
    if ( snake[0].x < 0 * box && direction === 'left' ) snake[0].x = 16 * box;
    if ( snake[0].x > 15 * box && direction === 'right' ) snake[0].x = 0;
    if ( snake[0].y < 0 * box && direction === 'up' ) snake[0].y = 16 * box;
    if ( snake[0].y > 15 * box && direction === 'down' ) snake[0].y = 0;

    for( let i = 1; i < snake.length; i++ ){
        if ( snake[0].x == snake[i].x && snake[0].y == snake[i].y ){ // Se a "cabeça" da cobrinha se colidir com qualquer outra parte dela mesmo, o jogo finaliza
            clearInterval(jogo); // Para de executar a função para atualizar a tela
            document.getElementById('game-over').style.display = 'block';
            gameOver = true;
            sfxGameOver.play();
        }
    }

    criarBackground(); // Executa a função de criar o fundo do canvas
    criarSnake(); // Executa a função de criar a cobrinha
    criarComida(); // Executa a função de criar a comida

    // Pegando a posição atual da "cabeça" para saber onde posicionar quando mudar de direção
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if ( direction === 'left' ) snakeX -= box; // Se for para esquerda, adiciona um quadrado para o lado esquerdo
    if ( direction === 'right' ) snakeX += box; // Se for para direita, adiciona um quadrado para o lado direito
    if ( direction === 'up' ) snakeY -= box; // Se for para cima, adiciona um quadrado para o lado cima
    if ( direction === 'down' ) snakeY += box; // Se for para baixo, adiciona um quadrado para o lado baixo

    if ( snakeX != food.x || snakeY != food.y ) snake.pop(); // Remove a última "cabeça" do corpo da cobrinha
    else { // Cria uma nova comida em uma nova posição e aumenta a pontuação
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        pontuacao++;
        sfxComidinha.play();
    }

    let newHead = { // Define onde deve aparecer a nova "cabeça" da cobrinha
        x : snakeX,
        y : snakeY
    };

    document.getElementById('pontuacao').innerHTML = `Pontuação : ${pontuacao}`; // Exibe a pontuação atual na tela
    snake.unshift(newHead); // Adiciona uma nova "cabeça" ao topo do corpo da cobrinha
}

const pausarJogo = (op) => {
    if(op){
        clearInterval(jogo); // Para de executar a função para atualizar a tela
        document.getElementById('pausado').style.display = 'block';
        pausado = true;
        sfxPauseIn.play();
    }else{
        jogo = setInterval(iniciarJogo, 75); // Retoma o intervalo de execução da função de atualização de tela
        document.getElementById('pausado').style.display = 'none';
        pausado = false;
        sfxPauseOut.play();
    }
}

const reiniciarJogo = () => {
    clearInterval(jogo); // Para de executar a função para atualizar a tela
    document.getElementById('pausado').style.display = 'none';
    pausado = false;
    document.getElementById('game-over').style.display = 'none';
    gameOver = false;
    snake = [ // posição inicial
        {
            x : 8 * box,
            y : 8 * box
        }
    ];

    // Reposiciona a comida
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;

    pontuacao = 0; // Zera a pontuação

    jogo = setInterval(iniciarJogo, 75); // Retoma o intervalo de execução da função de atualização de tela
    sfxRestart.play();
}

let jogo = setInterval(iniciarJogo, 75); // Define o intervalo de execução da função de atualização de tela