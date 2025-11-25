function init() {

    /* Pattern 1: Checkerboard Pattern with Diagonal Circle line
       What it does:  Creates a checkerboard pattern of blue and yellow squares where the first element in each row
         must alternate colors.  Additionally, I'm making a diagonal line of circles from the top left to bottom
          right by comparing the current row and column counts */

    const grid = document.getElementById('grid');
    const rows = 10;
    const cells = 10;

    // Outer loop: create each row
    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        // Inner loop: create each cell in the row
        for (let cell = 0; cell < cells; cell++) {
            const square = document.createElement('div');
            square.className = 'square';

            // When row index equals column index, make it a circle, as we progress to new rows, the circle moves
            // one position to the right
            if (row === cell) {
                square.classList.add('circle');
            }

            // If row + col is even, use blue; if odd, use yellow
            if ((row + cell) % 2 === 0) {
                square.style.backgroundColor = '#213F9F'; // Blue
            } else {
                square.style.backgroundColor = '#968622'; // Yellow
            }

            rowDiv.appendChild(square);
        }

        grid.appendChild(rowDiv);
    }
}

/* Read that it is best practice to wrap your main execution logic within a function and then use the
   DOMContentLoaded event listener to ensure that function runs at the appropriate time. */
document.addEventListener('DOMContentLoaded', init);