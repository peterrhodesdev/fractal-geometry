import { getParams } from "./helpers.js";

let maxDrawnOrder = 0;

function removeTriangles(
  context,
  currentOrder,
  maxOrder,
  triangleBaseLength,
  triangleHeight,
  triangleBaseCentreX,
  triangleBaseCentreY
) {
  if (currentOrder < maxOrder && triangleBaseLength > 4) {
    maxDrawnOrder = Math.max(maxDrawnOrder, currentOrder + 1);

    context.beginPath();
    context.moveTo(triangleBaseCentreX, triangleBaseCentreY);
    context.lineTo(
      Math.round(triangleBaseCentreX + triangleBaseLength / 4),
      Math.round(triangleBaseCentreY - triangleHeight / 2)
    );
    context.lineTo(
      Math.round(triangleBaseCentreX - triangleBaseLength / 4),
      Math.round(triangleBaseCentreY - triangleHeight / 2)
    );
    context.fill();

    const nextOrder = currentOrder + 1;
    const nextTriangleBaseLength = triangleBaseLength / 2;
    const nextTriangleHeight = triangleHeight / 2;
    const smallerTriangleCentrePoints = [
      [Math.round(triangleBaseCentreX - triangleBaseLength / 4), triangleBaseCentreY],
      [Math.round(triangleBaseCentreX + triangleBaseLength / 4), triangleBaseCentreY],
      [triangleBaseCentreX, Math.round(triangleBaseCentreY - triangleHeight / 2)],
    ];
    for (const point of smallerTriangleCentrePoints) {
      removeTriangles(
        context,
        nextOrder,
        maxOrder,
        nextTriangleBaseLength,
        nextTriangleHeight,
        point[0],
        point[1]
      );
    }
  }
}

function draw(context, order) {
  const [width, height, orderNumber] = getParams(context, order);
  maxDrawnOrder = 0;

  let triangleBaseLength = Math.floor(Math.min(width, (2 / Math.sqrt(3)) * height));
  triangleBaseLength -= triangleBaseLength % 2;
  let triangleHeight = Math.floor((Math.sqrt(3) / 2) * triangleBaseLength);
  const triangleBaseCentreX = width / 2;
  const triangleBaseCentreY = Math.floor(height - (height - triangleHeight) / 2);

  context.beginPath();
  context.moveTo(
    triangleBaseCentreX - triangleBaseLength / 2,
    triangleBaseCentreY
  );
  context.lineTo(
    triangleBaseCentreX + triangleBaseLength / 2,
    triangleBaseCentreY
  );
  context.lineTo(triangleBaseCentreX, triangleBaseCentreY - triangleHeight);
  context.fill();

  context.fillStyle = "white";
  removeTriangles(
    context,
    0,
    orderNumber,
    triangleBaseLength,
    triangleHeight,
    triangleBaseCentreX,
    triangleBaseCentreY
  );
  context.fillStyle = "black";

  return maxDrawnOrder;
}

export { draw };
