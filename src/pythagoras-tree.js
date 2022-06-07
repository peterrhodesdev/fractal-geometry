import { degreesToRadians, getParams } from "./helpers.js";

let maxDrawnOrder = 0;

function drawPattern(
  context,
  currentOrder,
  maxOrder,
  squareSideLength,
  squareBasePointX,
  squareBasePointY,
  rotation
) {
  if (currentOrder <= maxOrder && squareSideLength > 1) {
    maxDrawnOrder = Math.max(maxDrawnOrder, currentOrder + 1);

    context.save();
    context.translate(squareBasePointX, squareBasePointY);
    context.rotate(degreesToRadians(rotation));
    context.translate(-squareBasePointX, -squareBasePointY);
    context.scale(1, -1);
    context.fillRect(
      squareBasePointX,
      -squareBasePointY,
      squareSideLength,
      squareSideLength
    );
    context.restore();

    const nextOrder = currentOrder + 1;
    const nextSquareSideLength = Math.round(
      (squareSideLength * Math.sqrt(2)) / 2
    );
    const leftBasePointX =
      squareBasePointX +
      Math.sin(degreesToRadians(rotation)) * squareSideLength;
    const leftBasePointY =
      squareBasePointY -
      Math.cos(degreesToRadians(rotation)) * squareSideLength;
    //left
    drawPattern(
      context,
      nextOrder,
      maxOrder,
      nextSquareSideLength,
      Math.round(leftBasePointX),
      Math.round(leftBasePointY),
      rotation - 45
    );
    const rightBasePointX =
      leftBasePointX +
      Math.sin(degreesToRadians(rotation + 45)) * nextSquareSideLength;
    const rightBasePointY =
      leftBasePointY -
      Math.cos(degreesToRadians(rotation + 45)) * nextSquareSideLength;
    // right
    drawPattern(
      context,
      nextOrder,
      maxOrder,
      nextSquareSideLength,
      Math.round(rightBasePointX),
      Math.round(rightBasePointY),
      rotation + 45
    );
  }
}

function calculateTreeWidth(maxOrder) {
  if (maxOrder === 0) {
    return 1;
  }

  let treeWidth = 0;
  for (let i = 1; i <= maxOrder; i += 1) {
    let squareWidth =
      (Math.sqrt(2) / 2) ** i * (i % 2 === 0 ? 1 : Math.sqrt(2));
    treeWidth += squareWidth;
  }
  treeWidth *= 2;
  return treeWidth;
}

function calculateTreeHeight(maxOrder) {
  let treeHeight = 0;
  for (let i = 0; i <= maxOrder; i += 1) {
    let squareHeight =
      (Math.sqrt(2) / 2) ** i * (i % 2 === 0 ? 1 : Math.sqrt(2));
    treeHeight += squareHeight;
  }
  return treeHeight;
}

function draw(context, order) {
  const [width, height, orderNumber] = getParams(context, order);
  maxDrawnOrder = 0;

  const treeWidth = calculateTreeWidth(orderNumber);
  const treeHeight = calculateTreeHeight(orderNumber);
  const largestSquareSideLength = Math.floor(
    Math.min(width / treeWidth, height / treeHeight)
  );

  const squareBasePointX = Math.round(width / 2 - largestSquareSideLength / 2);
  const squareBasePointY = Math.round(
    height - (height - treeHeight * largestSquareSideLength) / 2
  );
  const rotation = 0;

  drawPattern(
    context,
    0,
    orderNumber,
    largestSquareSideLength,
    squareBasePointX,
    squareBasePointY,
    rotation
  );

  return maxDrawnOrder;
}

export { draw };
