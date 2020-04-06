let canvas = document.getElementById('snake'); // Referência ao id do canvas no HTML
let context = canvas.getContext('2d'); // Define contexto, 3d ou 2d
let box = 32;
let snake = [ // posição inicial
    {
        x : 8 * box,
        y : 8 * box
    }
];

const criarBackground = () => {
    context.fillStyle = 'lightgreen'; // Cor que será usada no fundo canvas
    context.fillRect(0, 0, 16 * box, 16 * box); // Desenha o canvas, (x, y, altura, largura) de cada pixel -> 16 * 32 = 512
};

const criarSnake = () => {
    for ( let i = 0; i < snake.length; i ++){
        context.fillStyle = 'green'; // Cor que será usada na cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); // Desenha a cobrinha de acordo com o tamanho do vetor snake
    }
}

criarBackground(); // Executa a função de criar o fundo do canvas
criarSnake(); // Executa a função de criar a cobrinha