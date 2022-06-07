import * as cantorSet from "./src/cantor-set.js";
import * as hFractal from "./src/h-fractal.js";
import * as kochSnowflake from "./src/koch-snowflake.js";
import * as pythagorasTree from "./src/pythagoras-tree.js";
import * as sierpinskiCarpet from "./src/sierpinski-carpet.js";
import * as sierpinskiTriangle from "./src/sierpinski-triangle.js";
import * as vicsekFractal from "./src/vicsek-fractal.js";

const canvas = document.getElementById("canvas");
const fractalSelect = document.getElementById("fractals");
const orderInput = document.getElementById("order");
const orderLimitedNote = document.getElementById("order-limited-note");

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
    
    orderLimitedNote.innerText = " ";
    let maxDrawnOrder;
    switch (fractal) {
      case "cantor-set":
        maxDrawnOrder = cantorSet.draw(context, order);
        break;
      case "h-fractal":
        maxDrawnOrder = hFractal.draw(context, order);
        break;
      case "koch-snowflake":
        maxDrawnOrder = kochSnowflake.draw(context, order);
        break;
      case "pythagoras-tree":
        maxDrawnOrder = pythagorasTree.draw(context, order);
        break;
      case "sierpinski-carpet":
        maxDrawnOrder = sierpinskiCarpet.draw(context, order);
        break;
      case "sierpinski-triangle":
        maxDrawnOrder = sierpinskiTriangle.draw(context, order);
        break;
      case "vicsek-fractal-cross":
        maxDrawnOrder = vicsekFractal.draw(context, order, "cross");
        break;
      case "vicsek-fractal-saltire":
        maxDrawnOrder = vicsekFractal.draw(context, order, "saltire");
        break;
      default:
        throw new Error(`unknown fractal selected: ${fractal}`);
    }

    if (maxDrawnOrder < order) {
      orderLimitedNote.innerText = `* the order drawn to the canvas has been limited to ${maxDrawnOrder}`;
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
