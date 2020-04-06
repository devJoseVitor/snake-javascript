let canvas = document.getElementById('snake'); // Referência ao id do canvas no HTML
let context = canvas.getContext('2d'); // Define contexto, 3d ou 2d
let box = 32;
let snake = [ // posição inicial
    {
        x : 8 * box,
        y : 8 * box
    }
];
let direction = 'up';


const criarBackground = () => {
    context.fillStyle = 'lightgreen'; // Cor que será usada no fundo canvas
    context.fillRect(0, 0, 16 * box, 16 * box); // Desenha o canvas, (x, y, altura, largura) de cada quadrado -> 16 * 32 = 512
};

const criarSnake = () => {
    for ( let i = 0; i < snake.length; i ++ ){
        context.fillStyle = 'green'; // Cor que será usada na cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); // Desenha a cobrinha de acordo com o tamanho do vetor snake
    }
}

document.addEventListener('keydown', (event) => { // "escuta" o evento de apertar uma tecla
    // todas as teclas definidas e faz com que não possa voltar para a direção inversa no mesmo eixo -> se estou para a direita, não posso ir para esquerda; se estou para cima, não posso ir para baixo.
    if ( event.keyCode == 39 && direction !== 'left' ) direction = 'right';
    if ( event.keyCode == 37 && direction !== 'right' ) direction = 'left';
    if ( event.keyCode == 40 && direction !== 'up' ) direction = 'down';
    if ( event.keyCode == 38 && direction !== 'down' ) direction = 'up';
    
});

const iniciarJogo = () => {
    // se a cobrinha atingir o limite do canvas, faz com que apareça do outro lado
    if ( snake[0].x < 0 * box && direction === 'left' ) snake[0].x = 16 * box;
    if ( snake[0].x > 15 * box && direction === 'right' ) snake[0].x = 0;
    if ( snake[0].y < 0 * box && direction === 'up' ) snake[0].y = 16 * box;
    if ( snake[0].y > 15 * box && direction === 'down' ) snake[0].y = 0;

    criarBackground(); // Executa a função de criar o fundo do canvas
    criarSnake(); // Executa a função de criar a cobrinha

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if ( direction === 'left' ) snakeX -= box; // se for para esquerda, adiciona um quadrado para o lado esquerdo
    if ( direction === 'right' ) snakeX += box; // se for para direita, adiciona um quadrado para o lado direito
    if ( direction === 'up' ) snakeY -= box; // se for para cima, adiciona um quadrado para o lado cima
    if ( direction === 'down' ) snakeY += box; // se for para baixo, adiciona um quadrado para o lado baixo

    snake.pop(); // remove a última "cabeça" do corpo da cobrinha

    let newHead = { // define onde deve aparecer a nova "cabeça" da cobrinha
        x : snakeX,
        y : snakeY
    };

    snake.unshift(newHead); // adiciona uma nova "cabeça" ao topo do corpo da cobrinha
}

let jogo = setInterval(iniciarJogo, 100);