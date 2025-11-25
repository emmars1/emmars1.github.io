function init() {
    /* Pattern 2: Growing Circles
       What it does: Every 4th circle is larger and a different color, also the rigid width of the 'circle-container'
       creates a cool pattern across the rows.   Added the hover animation because I think it looks cool. */

    const container = document.getElementById('circleContainer');
    const totalCircles = 65;

    // Create all circles
    for (let i = 0; i < totalCircles; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';

        // Every 4th circle is larger and different color
        if (i % 4 === 0) {
            circle.style.width = '60px';
            circle.style.height = '60px';
            circle.style.backgroundColor = '#FF7038';
        } else {
            // the default circles - smaller and pink
            circle.style.width = '35px';
            circle.style.height = '35px';
            circle.style.backgroundColor = '#FFB4DB';
        }

        container.appendChild(circle);
    }
}

/* Read that it is best practice to wrap your main execution logic within a function and then use the
   DOMContentLoaded event listener to ensure that function runs at the appropriate time. */
document.addEventListener('DOMContentLoaded', init);