import { getParams } from "./helpers.js";

let maxDrawnOrder = 0;

function deleteOpenMiddleThirds(
  context,
  currentOrder,
  toOrder,
  leftX,
  rightX,
  lineSegmentHeight,
  topY
) {
  let middleThirdWidth = (rightX - leftX) / 3;
  if (currentOrder < toOrder && middleThirdWidth > 1) {
    maxDrawnOrder = Math.max(maxDrawnOrder, currentOrder + 1);

    middleThirdWidth = Math.round(middleThirdWidth);
    const middleThirdLeftX = leftX + middleThirdWidth;
    
    // Added extra height to account for rounding errors
    context.fillRect(
      middleThirdLeftX,
      topY - 1,
      middleThirdWidth,
      lineSegmentHeight + 2
    );

    const nextOrder = currentOrder + 1;
    const middleThirdRightX = rightX - middleThirdWidth;
    deleteOpenMiddleThirds(
      context,
      nextOrder,
      toOrder,
      leftX,
      middleThirdLeftX,
      lineSegmentHeight,
      topY
    );
    deleteOpenMiddleThirds(
      context,
      nextOrder,
      toOrder,
      middleThirdRightX,
      rightX,
      lineSegmentHeight,
      topY
    );
  }
}

function draw(context, order) {
  const [width, height, orderNumber] = getParams(context, order);
  maxDrawnOrder = 0;

  const lineSegmentHeight = Math.floor(height / (2 * orderNumber + 1));

  for (let i = 0; i <= orderNumber; i += 1) {
    const topY = lineSegmentHeight * (i * 2);

    context.fillRect(0, topY, width, lineSegmentHeight);
    context.fillStyle = "white";
    deleteOpenMiddleThirds(context, 0, i, 0, width, lineSegmentHeight, topY);
    context.fillStyle = "black";
  }

  return maxDrawnOrder;
}

export { draw };
