document.addEventListener('DOMContentLoaded', () => {
    const gridSelectionScreen = document.getElementById('grid-selection');
    const gameScreen = document.getElementById('game-screen');
    const board = document.getElementById('game-board');
    let gridSize = 5; // Default grid size
    let tiles = [];

    // Start the game with the selected grid size
    function startGame(size) {
        gridSize = size;
        tiles = [];
        board.innerHTML = ''; // Clear previous tiles
        board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Set grid columns dynamically

        // Generate the board dynamically
        for (let i = 0; i < gridSize; i++) {
            tiles[i] = [];
            for (let j = 0; j < gridSize; j++) {
                const tile = createTile(i, j);
                board.appendChild(tile);
                tiles[i][j] = tile;
            }
        }

        // Randomize the board to make it solvable
        for (let i = 0; i < gridSize * 2; i++) {
            simulateRandomClick();
        }

        // Switch to the game screen
        gridSelectionScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
    }

    // Reset to the main menu
    function resetGame() {
        gridSelectionScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
        board.innerHTML = ''; // Clear the game board
    }

    // Create a tile with event listener
    function createTile(x, y) {
        const tile = document.createElement('div');
        tile.classList.add('tile'); // Default "on" state
        tile.dataset.x = x;
        tile.dataset.y = y;
        tile.addEventListener('click', () => toggleTile(x, y));
        return tile;
    }

    // Toggle the clicked tile and its neighbors
    function toggleTile(x, y) {
        const toggle = (i, j) => {
            if (i >= 0 && i < gridSize && j >= 0 && j < gridSize) {
                tiles[i][j].classList.toggle('is-off'); // Toggle between "on" and "off"
            }
        };

        toggle(x, y); // Toggle the clicked tile
        toggle(x - 1, y); // Toggle the top neighbor
        toggle(x + 1, y); // Toggle the bottom neighbor
        toggle(x, y - 1); // Toggle the left neighbor
        toggle(x, y + 1); // Toggle the right neighbor

        // Check if the user has won the game
        if (checkWin()) {
            window.alert("🎉 You win! 🎉");
            resetGame(); // Return to the main menu after winning
        }
    }

    // Simulate a random tile click
    function simulateRandomClick() {
        const randomX = Math.floor(Math.random() * gridSize);
        const randomY = Math.floor(Math.random() * gridSize);
        toggleTile(randomX, randomY);
    }

    // Check if all tiles are "off"
    function checkWin() {
        return tiles.flat().every(tile => tile.classList.contains('is-off'));
    }

    // Open a modal
    function openModal(type) {
        const modal = document.getElementById(`${type}-modal`);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // Close a modal
    function closeModal(type) {
        const modal = document.getElementById(`${type}-modal`);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Attach functions to global scope
    window.startGame = startGame;
    window.resetGame = resetGame;
    window.openModal = openModal;
    window.closeModal = closeModal;
});
