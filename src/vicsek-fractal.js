import { getParams } from "./helpers.js";

let maxDrawnOrder = 0;

function removeSubSquaresCross(
  context,
  currentOrder,
  maxOrder,
  squareSideLength,
  leftX,
  topY
) {
  let subSquareSideLength = squareSideLength / 3;
  if (currentOrder < maxOrder && subSquareSideLength > 1) {
    maxDrawnOrder = Math.max(maxDrawnOrder, currentOrder + 1);

    subSquareSideLength = Math.round(subSquareSideLength);
    // extra length to ensure the entire area is removed
    const padding = subSquareSideLength;

    // top-left
    context.fillRect(
      leftX - padding,
      topY - padding,
      subSquareSideLength + padding,
      subSquareSideLength + padding
    );
    // top-right
    context.fillRect(
      leftX + 2 * subSquareSideLength,
      topY - padding,
      subSquareSideLength + padding,
      subSquareSideLength + padding
    );
    // bottom-left
    context.fillRect(
      leftX - padding,
      topY + 2 * subSquareSideLength,
      subSquareSideLength + padding,
      subSquareSideLength + padding
    );
    // bottom-right
    context.fillRect(
      leftX + 2 * subSquareSideLength,
      topY + 2 * subSquareSideLength,
      subSquareSideLength + padding,
      subSquareSideLength + padding
    );

    const nextOrder = currentOrder + 1;
    const subSquareTopLeftPoints = [
      // top-centre
      [leftX + subSquareSideLength, topY],
      // centre-left
      [leftX, topY + subSquareSideLength],
      // centre-centre
      [leftX + subSquareSideLength, topY + subSquareSideLength],
      // centre-right
      [leftX + 2 * subSquareSideLength, topY + subSquareSideLength],
      // bottom-centre
      [leftX + subSquareSideLength, topY + 2 * subSquareSideLength],
    ];
    for (const point of subSquareTopLeftPoints) {
      removeSubSquaresCross(
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

function removeSubSquaresSaltire(
  context,
  currentOrder,
  maxOrder,
  squareSideLength,
  leftX,
  topY
) {
  let subSquareSideLength = squareSideLength / 3;
  if (currentOrder < maxOrder && subSquareSideLength > 1) {
    maxDrawnOrder = Math.max(maxDrawnOrder, currentOrder + 1);

    subSquareSideLength = Math.round(subSquareSideLength);
    // extra length to ensure the entire area is removed
    const padding = subSquareSideLength;

    // top-centre
    context.fillRect(
      leftX + subSquareSideLength,
      topY - padding,
      subSquareSideLength,
      subSquareSideLength + padding
    );
    // centre-left
    context.fillRect(
      leftX - padding,
      topY + subSquareSideLength,
      subSquareSideLength + padding,
      subSquareSideLength
    );
    // centre-right
    context.fillRect(
      leftX + 2 * subSquareSideLength,
      topY + subSquareSideLength,
      subSquareSideLength + padding,
      subSquareSideLength
    );
    // bottom-centre
    context.fillRect(
      leftX + subSquareSideLength,
      topY + 2 * subSquareSideLength,
      subSquareSideLength,
      subSquareSideLength + padding
    );

    const nextOrder = currentOrder + 1;
    const subSquareTopLeftPoints = [
      // top-left
      [leftX, topY],
      // top-right
      [leftX + 2 * subSquareSideLength, topY],
      // centre-centre
      [leftX + subSquareSideLength, topY + subSquareSideLength],
      // bottom-left
      [leftX, topY + 2 * subSquareSideLength],
      // bottom-right
      [leftX + 2 * subSquareSideLength, topY + 2 * subSquareSideLength],
    ];
    for (const point of subSquareTopLeftPoints) {
      removeSubSquaresSaltire(
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

function draw(context, order, form) {
  const [width, height, orderNumber] = getParams(context, order);
  maxDrawnOrder = 0;

  const squareSideLength = Math.floor(Math.min(width, height));
  const squareLeftX = Math.floor((width - squareSideLength) / 2);
  const squareTopY = Math.floor((width - squareSideLength) / 2);

  context.fillRect(squareLeftX, squareTopY, squareSideLength, squareSideLength);

  context.fillStyle = "white";
  switch (form) {
    case "cross":
      removeSubSquaresCross(
        context,
        0,
        orderNumber,
        squareSideLength,
        squareLeftX,
        squareTopY
      );
      break;
    case "saltire":
      removeSubSquaresSaltire(
        context,
        0,
        orderNumber,
        squareSideLength,
        squareLeftX,
        squareTopY
      );
      break;
    default:
      throw new Error(`unknown form (${form})`);
  }
  context.fillStyle = "black";

  return maxDrawnOrder;
}

export { draw };
