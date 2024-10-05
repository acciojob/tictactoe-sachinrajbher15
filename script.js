const submitButton = document.getElementById('submit');
        const player1Input = document.getElementById('player1');
        const player2Input = document.getElementById('player2');
        const messageDiv = document.querySelector('.message');
        const boardDiv = document.querySelector('.board');
        let currentPlayer = 'x'; // Player 1 starts
        let gameActive = true;
        let gameState = ["", "", "", "", "", "", "", "", ""];
        let player1 = '';
        let player2 = '';

        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        submitButton.addEventListener('click', () => {
            player1 = player1Input.value;
            player2 = player2Input.value;
            if (!player1 || !player2) {
                alert('Please enter names for both players!');
                return;
            }
            messageDiv.innerText = `${player1}, you're up!`;
            boardDiv.classList.remove('hidden');
            document.querySelector('.setup').classList.add('hidden');
        });

        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        function handleCellClick(event) {
            const clickedCell = event.target;
            const clickedCellIndex = parseInt(clickedCell.id) - 1;

            if (gameState[clickedCellIndex] !== "" || !gameActive) {
                return;
            }

            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.innerText = currentPlayer;

            checkWinner();
        }

        function checkWinner() {
            let roundWon = false;
            for (let i = 0; i < winningConditions.length; i++) {
                const winCondition = winningConditions[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                messageDiv.innerText = `${currentPlayer === 'x' ? player1 : player2} congratulations you won!`;
                gameActive = false;
                return;
            }

            if (!gameState.includes("")) {
                messageDiv.innerText = "It's a tie!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            messageDiv.innerText = `${currentPlayer === 'x' ? player1 : player2}, you're up!`;
        }