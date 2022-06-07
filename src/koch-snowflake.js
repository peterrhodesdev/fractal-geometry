import {
  degreesToRadians,
  distanceBetweenTwoPoints,
  getParams,
} from "./helpers.js";

let maxDrawnOrder = 0;
const MINIMUM_TRIANGLE_SIDE_LENGTH = 3;

function calculateThirdPoints(startX, startY, endX, endY) {
  const oneThirdPointX = Math.round(startX + (endX - startX) / 3);
  const oneThirdPointY = Math.round(startY + (endY - startY) / 3);
  const twoThirdPointX = Math.round(startX + ((endX - startX) * 2) / 3);
  const twoThirdPointY = Math.round(startY + ((endY - startY) * 2) / 3);
  return [oneThirdPointX, oneThirdPointY, twoThirdPointX, twoThirdPointY];
}

function removeMiddleThirds(
  context,
  currentOrder,
  maxOrder,
  startX,
  startY,
  endX,
  endY
) {
  if (currentOrder < maxOrder) {
    const [oneThirdPointX, oneThirdPointY, twoThirdPointX, twoThirdPointY] =
      calculateThirdPoints(startX, startY, endX, endY);
    const subTriangleSideLength = distanceBetweenTwoPoints(
      oneThirdPointX,
      oneThirdPointY,
      twoThirdPointX,
      twoThirdPointY
    );

    if (subTriangleSideLength > MINIMUM_TRIANGLE_SIDE_LENGTH) {
      context.fillStyle = "white";
      const horizontalLineOffset = 2;
      context.fillRect(
        Math.min(oneThirdPointX, twoThirdPointX),
        Math.min(oneThirdPointY, twoThirdPointY) -
          (oneThirdPointY === twoThirdPointY ? horizontalLineOffset : 0),
        Math.abs(oneThirdPointX - twoThirdPointX),
        Math.max(
          2 * horizontalLineOffset + 1,
          Math.abs(oneThirdPointY - twoThirdPointY)
        )
      );
      context.fillStyle = "black";
    }
  }
}

function drawTriangleSidePattern(
  context,
  currentOrder,
  maxOrder,
  startX,
  startY,
  endX,
  endY,
  direction,
  drawLine
) {
  const triangleSideLength = distanceBetweenTwoPoints(
    startX,
    startY,
    endX,
    endY
  );
  if (
    currentOrder <= maxOrder &&
    triangleSideLength > MINIMUM_TRIANGLE_SIDE_LENGTH
  ) {
    maxDrawnOrder = Math.max(maxDrawnOrder, currentOrder);

    if (drawLine) {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
      context.closePath();
    }

    removeMiddleThirds(
      context,
      currentOrder,
      maxOrder,
      startX,
      startY,
      endX,
      endY
    );

    const [oneThirdPointX, oneThirdPointY, twoThirdPointX, twoThirdPointY] =
      calculateThirdPoints(startX, startY, endX, endY);
    const subTriangleSideLength = triangleSideLength / 3;
    const outwardDirection = direction - 90;

    let outwardMidPointX = startX + (endX - startX) / 2;
    outwardMidPointX +=
      Math.cos(degreesToRadians(outwardDirection)) *
      ((Math.sqrt(3) / 2) * subTriangleSideLength);
    outwardMidPointX = Math.round(outwardMidPointX);
    let outwardMidPointY =
      Math.min(startY, endY) + Math.abs((endY - startY) / 2);
    outwardMidPointY -=
      Math.sin(degreesToRadians(outwardDirection)) *
      ((Math.sqrt(3) / 2) * subTriangleSideLength);
    outwardMidPointY = Math.round(outwardMidPointY);

    const subTriangleSides = [
      [startX, startY, oneThirdPointX, oneThirdPointY, direction, false],
      [
        oneThirdPointX,
        oneThirdPointY,
        outwardMidPointX,
        outwardMidPointY,
        direction - 60,
        true,
      ],
      [
        outwardMidPointX,
        outwardMidPointY,
        twoThirdPointX,
        twoThirdPointY,
        direction + 60,
        true,
      ],
      [twoThirdPointX, twoThirdPointY, endX, endY, direction, false],
    ];

    const nextOrder = currentOrder + 1;
    for (const ts of subTriangleSides) {
      drawTriangleSidePattern(
        context,
        nextOrder,
        maxOrder,
        ts[0],
        ts[1],
        ts[2],
        ts[3],
        ts[4],
        ts[5]
      );
    }
  }
}

function draw(context, order) {
  const [width, height, orderNumber] = getParams(context, order);
  maxDrawnOrder = 0;

  const triangleSideLength = Math.min(
    width,
    (2 / (Math.sqrt(3) + 1 / Math.sqrt(3))) * height
  );
  const triangleHeight = (Math.sqrt(3) / 2) * triangleSideLength;
  const baseY = Math.round(
    height - (height - triangleHeight + triangleHeight / 3) / 2
  );
  const topY = Math.round((height - triangleHeight - triangleHeight / 3) / 2);

  // bottom
  drawTriangleSidePattern(
    context,
    0,
    orderNumber,
    Math.round((width - triangleSideLength) / 2),
    baseY,
    Math.round((width + triangleSideLength) / 2),
    baseY,
    0,
    true
  );
  // right
  drawTriangleSidePattern(
    context,
    0,
    orderNumber,
    Math.round((width + triangleSideLength) / 2),
    baseY,
    Math.round(width / 2),
    topY,
    120,
    true
  );
  // left
  drawTriangleSidePattern(
    context,
    0,
    orderNumber,
    Math.round(width / 2),
    topY,
    Math.round((width - triangleSideLength) / 2),
    baseY,
    240,
    true
  );

  return maxDrawnOrder;
}

export { draw };
