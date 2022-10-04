const container = document.querySelector(".container");
const buttons = document.querySelectorAll("button");
const color = document.querySelector("#color");
const eraser = document.querySelector("#Eraser");
const newGrid = document.querySelector("#newGrid");
const rgb = document.querySelector("#rgb");
const darken = document.querySelector("#Darken");
const lighten = document.querySelector("#Lighten")
const output = document.querySelector(".output");
const range = document.querySelector(".range");

let eraserValue = false;
let rgbValue = false;
let darkenValue = false;
let lightenValue = false;

const rgbRegex = /\d{1,3}/g;

output.textContent = `${range.value}x${range.value}`;
range.addEventListener("input", () => {
    output.textContent = `${range.value}x${range.value}`;
});

for (const button of buttons) {
    button.addEventListener("mousedown", () => {
        button.classList.toggle("pressed");
    });

    button.addEventListener("mouseenter", () => {
        button.classList.add("mouseover");
    });

    button.addEventListener("mouseleave", () => {
        button.classList.remove("mouseover");
    });

}

newGrid.addEventListener("click", () => {
    container.replaceChildren();
    createGrid(range.value);
});


newGrid.addEventListener("mouseup", () => {
    newGrid.classList.remove("pressed");
});

eraser.addEventListener("click", () => {
    if (eraserValue) {
        eraserValue = false;
    } else {
        lightenValue = false;
        darkenValue = false;
        rgbValue = false;
        lighten.classList.remove("pressed");
        darken.classList.remove("pressed");
        rgb.classList.remove("pressed");
        eraserValue = true;
    }
});

rgb.addEventListener("click", () => {
    if (rgbValue) {
        rgbValue = false;
    } else {
        lightenValue = false;
        darkenValue = false;
        eraserValue = false;
        lighten.classList.remove("pressed");
        darken.classList.remove("pressed");
        eraser.classList.remove("pressed");
        rgbValue = true;
    }
});

lighten.addEventListener("click", () => {
    if (lightenValue) {
        lightenValue = false; 
    } else {
        darkenValue = false;
        eraserValue = false;
        rgbValue = false;
        darken.classList.remove("pressed");
        eraser.classList.remove("pressed");
        rgb.classList.remove("pressed");
        lightenValue = true;
    }
});

darken.addEventListener("click", () => {
    if (darkenValue) {
        darkenValue = false; 
    } else {
        lightenValue = false;
        eraserValue = false;
        rgbValue = false;
        lighten.classList.remove("pressed");
        eraser.classList.remove("pressed");
        rgb.classList.remove("pressed");
        darkenValue = true;
    }
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shadeColor(color, percent) {
    let rgb = color.match(rgbRegex);
    let newColor = "#";

    rgb.forEach(color => {
        color = parseInt(color);
        color = (color==0)?10:color;
        color = parseInt(color * (100 + percent) / 100);
        color = (color<255)?color:255;
        color = ((color.toString(16).length==1))?"0"+color.toString(16):color.toString(16);
        newColor += color;
    })

    return newColor;
}

function getColor(div) {
    if (lightenValue) {
        return shadeColor(div.style.color, 20);
    }
    if (darkenValue) {
        return shadeColor(div.style.color, -20)
    }
    if (rgbValue) {
        return getRandomColor();
    }
    if (eraserValue) {
        return "#ffffff"
    }
    return color.value;
}

function createGrid(dimension) {
    const size = 75 / dimension;
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            const div = document.createElement("div");
            div.classList.add("grid_div");
            div.style.flexBasis = size + "vh";
            div.style.height = size + "vh";
            div.style.width = size + "vh";
            div.style.color = "#ffffff"

            div.addEventListener("mouseenter", (e) => {
                div.style.backgroundColor = getColor(div);

                if (e.buttons == 1) {
                    div.style.color = div.style.backgroundColor;
                }
                
            });

            div.addEventListener("mouseleave", () => {
                div.style.backgroundColor = div.style.color;
            })

            
            div.addEventListener("mousedown", () => {
                div.style.color = getColor(div);
            })

            container.appendChild(div);
        }
    };
};

let dimension = range.value;

createGrid(dimension);

