let canvas = document.getElementById('snake'); // Referência ao id do canvas no HTML
let context = canvas.getContext('2d'); // Define contexto, 3d ou 2d
let box = 32;

const criarBackground = () => {
    context.fillStyle = 'lightgreen'; // Cor que será usada no fundo canvas
    context.fillRect(0, 0, 16 * box, 16 * box); // Desenha o canvas, (x, y, altura, largura) de cada pixel -> 16 * 32 = 12
};

criarBackground();