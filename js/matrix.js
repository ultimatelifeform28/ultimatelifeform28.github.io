// Finde the background canvas and get its @d drawing tools
const canvas = document.getElementById("matrix-background");
const context = canvas.getContext("2d");

// Set the convas drawing size tomatch the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Track Frames between binary digit changes and rain drawing updates.
// Then stores the vertical position of each rain column.
let frameCount = 0;
let rainFrameCount = 0;
let drops = [];

// Calculate how many columns fit with 40_pixel spacing.
const columns = Math.ceil(canvas.width / 40);

for (let i = 0; i < columns; i++)
{
    // Give each column a random starting height
    drops.push(Math.random() * canvas.height);
}

// choose an initial binary digit: 0 or 1.
let digit = Math.floor(Math.random() * 2);
function draw() {
    // Draw and update the rain animation.
    rainFrameCount++;

    // Count animation frames toward the next rain update
    // Run the rain drawing update every six animation frames.
    if (rainFrameCount >= 6)
    {
        context.fillStyle = "rgba(8, 8, 8, 0.08)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "20px monospace";
        context.fillStyle = "#ff2020";

        for (let i = 0; i < drops.length; i++) {
            context.fillText(digit, i * 40, drops[i]);

            drops[i] += 20;

            if (drops[i] > canvas.height) {
                drops[i] = 0;
            }
        }
        rainFrameCount = 0;
    }


    // Choose a new binary digit every 30 animation frames 
    frameCount++;
    if (frameCount >= 30)
    {
        digit = Math.floor(Math.random() * 2);
        frameCount = 0;

    }
    
    

    

    // Request the next animation frame.
    requestAnimationFrame(draw);
}

draw();

