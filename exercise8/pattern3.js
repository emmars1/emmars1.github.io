function init() {
    /* Pattern 3: Growing Text Pattern
       What it does: Creates 8 rows with the word "HELLO" repeated 10 times with nested loops
       and includes two conditions that changes the behavior for every 3rd and 12th word.
       Added the hover animation because I think it looks cool. */

    const patternBox = document.getElementById('patternBox');
    const totalRows = 8;
    const itemsPerRow = 10;
    const defaultTextSize = 16; // default font size in pixels

    let position = 0; // Used to track overall position (across all rows)

    // This parent loop creates each row
    for (let row = 0; row < totalRows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'text-row';

        // The inner loop creates each word for the current row
        for (let item = 0; item < itemsPerRow; item++) {
            const span = document.createElement('span');
            span.className = 'text-item';

            // Start with default text and text size
            let fontSize = defaultTextSize;
            let text = 'HELLO';

            // Increase the text size every 3rd word
            if (position % 3 === 0) {
                fontSize = defaultTextSize + 12;
            }

            // Additional condition, change every 12th word to "Hi!" and make it larger and gold
            if (position % 12 === 0) {
                text = 'Hi!';
                fontSize = defaultTextSize + 18;
                span.style.color = '#f59e0b';
            }

            span.textContent = text;
            span.style.fontSize = fontSize + 'px';
            //adds word to current row
            rowDiv.appendChild(span);
            position++; // Increment overall position counter as we need to keep track of this across rows
        }
        //Adds entire row to pattern box div
        patternBox.appendChild(rowDiv);
    }
}

/* Read that it is best practice to wrap your main execution logic within a function and then use the
   DOMContentLoaded event listener to ensure that function runs at the appropriate time. */
document.addEventListener('DOMContentLoaded', init);