import * as cantorSet from "./src/cantor-set.js";
import * as hFractal from "./src/h-fractal.js";
import * as pythagorasTree from "./src/pythagoras-tree.js";
import * as sierpinskiCarpet from "./src/sierpinski-carpet.js";
import * as sierpinskiTriangle from "./src/sierpinski-triangle.js";
import * as vicsekFractal from "./src/vicsek-fractal.js";

const canvas = document.getElementById("canvas");
const fractalSelect = document.getElementById("fractals");
const orderInput = document.getElementById("order");

function draw() {
  if (canvas.getContext) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;
    context.translate(0.5, 0.5);

    const fractal = fractalSelect.options[fractalSelect.selectedIndex].value;
    const order = orderInput.value;
    
    switch (fractal) {
      case "cantor-set":
        cantorSet.draw(context, order);
        break;
      case "h-fractal":
        hFractal.draw(context, order);
        break;
      case "pythagoras-tree":
        pythagorasTree.draw(context, order);
        break;
      case "sierpinski-carpet":
        sierpinskiCarpet.draw(context, order);
        break;
      case "sierpinski-triangle":
        sierpinskiTriangle.draw(context, order);
        break;
      case "vicsek-fractal-cross":
        vicsekFractal.draw(context, order, "cross");
        break;
      case "vicsek-fractal-saltire":
        vicsekFractal.draw(context, order, "saltire");
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

fractalSelect.addEventListener("change", (event) => draw());
orderInput.addEventListener("change", (event) => draw());

draw();
