import { getParams } from "./helpers.js";

function removeSubSquares(
  context,
  currentOrder,
  maxOrder,
  squareSideLength,
  leftX,
  topY
) {
  let subSquareSideLength = squareSideLength / 3;
  if (currentOrder < maxOrder && subSquareSideLength > 1) {
    subSquareSideLength = Math.round(subSquareSideLength);
    context.fillRect(
      leftX + subSquareSideLength,
      topY + subSquareSideLength,
      subSquareSideLength,
      subSquareSideLength
    );

    const nextOrder = currentOrder + 1;
    const subSquareTopLeftPoints = [
      [leftX, topY],
      [leftX + subSquareSideLength, topY],
      [leftX + 2 * subSquareSideLength, topY],
      [leftX, topY + subSquareSideLength],
      [leftX + 2 * subSquareSideLength, topY + subSquareSideLength],
      [leftX, topY + 2 * subSquareSideLength],
      [leftX + subSquareSideLength, topY + 2 * subSquareSideLength],
      [leftX + 2 * subSquareSideLength, topY + 2 * subSquareSideLength],
    ];
    for (const point of subSquareTopLeftPoints) {
      removeSubSquares(
        context,
        nextOrder,
        maxOrder,
        subSquareSideLength,
        point[0],
        point[1]
      );
    }
  }
}

function draw(context, order) {
  const [width, height, orderNumber] = getParams(context, order);

  const squareSideLength = Math.min(width, height);
  const squareLeftX = Math.floor((width - squareSideLength) / 2);
  const squareTopY = Math.floor((width - squareSideLength) / 2);

  context.fillRect(squareLeftX, squareTopY, squareSideLength, squareSideLength);
  context.fillStyle = "white";
  removeSubSquares(
    context,
    0,
    order,
    squareSideLength,
    squareLeftX,
    squareTopY
  );
  context.fillStyle = "black";
}

export { draw };
