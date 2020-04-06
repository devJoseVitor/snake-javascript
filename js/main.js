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

const iniciarJogo = () => {
    criarBackground(); // Executa a função de criar o fundo do canvas
    criarSnake(); // Executa a função de criar a cobrinha

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if ( direction === 'right' ) snakeX += box; // se for para direita, adiciona um quadrado para o lado direito
    if ( direction === 'left' ) snakeX -= box; // se for para esquerda, adiciona um quadrado para o lado esquerdo
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