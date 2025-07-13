let currentGridSize = 16; //Default grid size
let isRainbowMode = false; //Ranibow mode toggle


//Entry point - initializes the grid and set up grid size adjustment
initialize();

function initialize() {
    createGrid(currentGridSize); // Create the default 16x16 grid
    setGridSize(); // Set up event listener for rresizing the grid
}

//This function is use to create a grid of divs inside the container
function createGrid(size) {
    const container = document.querySelector("#container");

    //Loop to create size * size boxes (e.g. 25 for 5x5)
    for(let i = 0; i < size * size; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `${500/size}px`;
        box.style.height = `${500/size}px`;
        container.appendChild(box);
    }

    
    increaseOpacity(); //Add hover based opacity effect
    colorPicker(); //Enable color picking on hover
}

//This function is use to increase opacity after every mouse entry
function increaseOpacity() {
    const boxes = document.querySelectorAll(".box");

   boxes.forEach((div) => {
    div.addEventListener("mouseenter", () => {
        div.style.opacity = +div.style.opacity + 0.1;
      })
   })
}


//This fuction is use to clear all grid boxes from the container
function removeGrid() {
    const container = document.querySelector("#container");
    while (container.firstChild) {
        container.firstChild.remove();
    }
}

//Color Picker - this is use to adds color changing behavior to each box
function colorPicker() {
    const colorInput = document.querySelector("#colorPicker");

    document.querySelectorAll(".box").forEach(box => {
        box.addEventListener("mouseenter", () => {
            if (isRainbowMode) {
                box.style.backgroundColor = getRandomColor();
            } else{
                box.style.backgroundColor = colorInput.value;
            }
            
        })
    });

}


// This fuction is for resize grid
function setGridSize() {
    const setGrid = document.querySelector("#gridBtn");

    setGrid.addEventListener("click", () => {
       let size = parseInt(prompt("Set Grid Size (must be between 1 to 100)"));
       if(size >= 1 && size <= 100) {
            currentGridSize = size;
            removeGrid();
            createGrid(currentGridSize);
       } else {
            alert("Grid size must be between 1 to 100!")
       }
    })

}

// Rainbow mode toggle
const rainbowBtn = document.querySelector("#rainbowBtn");

rainbowBtn.addEventListener("click", () => {
    isRainbowMode = !isRainbowMode;

    if (isRainbowMode) {
        rainbowBtn.classList.add("active");
    } else {
        rainbowBtn.classList.remove("active");
    }

    removeGrid();
    createGrid(currentGridSize);
})

//This is helper function to generate random hex colors
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#"
    for(let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// Reset Grid - Clears the current grid and re-create it using current size
const clearBtn = document.querySelector("#resetBtn");

function clearGrid() {
    removeGrid();
    createGrid(currentGridSize);
}
clearBtn.addEventListener("click", clearGrid);



