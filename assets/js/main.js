function main() {
    const undoStack = [];
    const redoStack = [];
    let idCounter = 0;

    document.addEventListener('click', (e) => {
        const el = e.target;
        const msg = document.querySelector('#start-msg');
        msg.style.visibility = 'hidden';

        if (!el.classList.contains('buttons')) {
            const size = sizeRandom();
            const sizeMidle = halfSize(size);
            const color = colorRandom();
            const ballObject = createBallObject(idCounter, e.pageX, e.pageY, size, sizeMidle, color);

            createBall(ballObject);
            undoStack.push(ballObject);
            redoStack.length = 0;
            idCounter++;
        }

        if (el.classList.contains('undo') && undoStack.length > 0) {
            undo();
        }

        if (el.classList.contains('redo') && redoStack.length > 0) {
            redo();
        }
    });

    document.addEventListener('keypress', (e) => {
        if (e.ctrlKey && e.code === 'KeyZ' && undoStack.length > 0) {
            undo();
        }

        if (e.ctrlKey && e.code === 'KeyY' && redoStack.length > 0) {
            redo();
        }
    });

    function createBallObject(id, x, y, size, sizeMidle, color) {
        const idBall = `ball-${id}`;
        return { idBall, x, y, size, sizeMidle, color };
    }

    function createBall(ballObject) {
        const ball = document.createElement('span');
        const body = document.querySelector('body');

        ball.classList.add('ball');
        ball.setAttribute('id', ballObject.idBall);

        addStyles(ball, ballObject);

        body.appendChild(ball);
    }

    function colorRandom() {
        const cores = ['#FF000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF',
            '#dd00f3', '#ff2400', '#e81d1d', '#e8b71d', '#e3e81d', '#1de840', '#1ddde8', '#2b1de8',
            '#dd00f3', '#dd00f3', '#ff2400', '#e81d1d', '#e8b71d', '#e3e81d', '#1de840', '#1ddde8',
            '#2b1de8', '#dd00f3', '#dd00f3', '#6600ff', '#ff0066', '#00ffcc', '#00ffff', '#ff00ff'];
        return cores[Math.round(Math.random() * (cores.length - 1))];
    }

    function sizeRandom() {
        return Math.round(Math.random() * (60 - 20) + 20);
    }

    function halfSize(size) {
        return Math.round(size / 2);
    }

    function addStyles(ball, ballObject) {
        ball.style.left = `${ballObject.x - ballObject.sizeMidle}px`;
        ball.style.top = `${ballObject.y - ballObject.sizeMidle}px`;
        ball.style.width = `${ballObject.size}px`;
        ball.style.height = `${ballObject.size}px`;
        ball.style.backgroundColor = ballObject.color;
    }

    function undo() {
        const ballObject = undoStack.pop();
        const spanBall = document.getElementById(ballObject.idBall);

        redoStack.push(ballObject);
        spanBall.remove();

        idCounter--;
    }

    function redo() {
        const ballObject = redoStack.pop();

        undoStack.push(ballObject);
        createBall(ballObject);

        idCounter++;
    }
}

main();
