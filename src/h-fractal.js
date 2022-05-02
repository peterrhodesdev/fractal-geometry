import { getParams } from "./helpers.js";

function drawPattern(
  context,
  centreX,
  centreY,
  currentOrder,
  maxOrder,
  width,
  height,
  baseUnitLength
) {
  const unitLength = baseUnitLength * 2 ** (maxOrder - currentOrder);
  const leftX = centreX - unitLength;
  const rightX = Math.min(width - 1, centreX + unitLength);
  const topY = centreY - unitLength / 2;
  const bottomY = centreY + unitLength / 2;

  context.beginPath();
  context.moveTo(leftX, centreY);
  context.lineTo(rightX, centreY);
  context.moveTo(leftX, topY);
  context.lineTo(leftX, bottomY);
  context.moveTo(rightX, topY);
  context.lineTo(rightX, bottomY);
  context.stroke();
  context.closePath();

  // Recursively draw H's centered at the top and bottom of each vertical segment
  if (currentOrder < maxOrder) {
    const nextOrder = currentOrder + 1;
    const verticalSegmentPoints = [
      [leftX, topY],
      [leftX, bottomY],
      [rightX, topY],
      [rightX, bottomY],
    ];
    for (const point of verticalSegmentPoints) {
      drawPattern(
        context,
        point[0],
        point[1],
        nextOrder,
        maxOrder,
        width,
        height,
        baseUnitLength
      );
    }
  }
}

function calculateBaseUnitLength(width, height, orderNumber) {
  return Math.floor(Math.min(width, height / 2) / (2 ** (orderNumber + 1) - 1));
}

function draw(context, order) {
  const [ width, height, orderNumber ] = getParams(context, order);

  // Length of the vertical side of the smallest H
  let baseUnitLength = calculateBaseUnitLength(width, height, orderNumber);
  
  let adjustedOrderNumber = orderNumber;
  while (baseUnitLength < 3 && adjustedOrderNumber > 0) {
    adjustedOrderNumber -= 1;
    baseUnitLength = calculateBaseUnitLength(width, height, adjustedOrderNumber);
  }
  
  drawPattern(
    context,
    Math.floor(width / 2),
    Math.floor(height / 2),
    0,
    adjustedOrderNumber,
    width,
    height,
    baseUnitLength
  );
}

export { draw };
