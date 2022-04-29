import * as hFractal from "./src/h-fractal.js";

const canvas = document.getElementById("canvas");
const fractalSelect = document.getElementById("fractals");
const maxLevelInput = document.getElementById("max-level");

function draw() {
  if (canvas.getContext) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const context = canvas.getContext("2d");
    context.lineWidth = 1;
    context.translate(0.5, 0.5);

    const fractal = fractalSelect.options[fractalSelect.selectedIndex].value;
    const maxLevel = maxLevelInput.value;
    
    switch (fractal) {
      case "h-fractal":
        hFractal.draw(context, maxLevel);
        break;
      default:
        throw new Error(`unknown fractal selected: ${fractal}`);
    }
  } else {
    const message = "canvas not supported by browser";
    alert(message);
    throw new Error(message);
  }
}

maxLevelInput.addEventListener("change", (event) => draw());

draw();
window.addEventListener("resize", draw);

