import { getParams } from "./helpers.js";

function removeTriangles(
  context,
  currentOrder,
  maxOrder,
  triangleBaseLength,
  triangleHeight,
  triangleBaseCentreX,
  triangleBaseCentreY
) {
  if (currentOrder < maxOrder) {
    context.beginPath();
    context.moveTo(triangleBaseCentreX, triangleBaseCentreY);
    context.lineTo(
      triangleBaseCentreX + triangleBaseLength / 4,
      triangleBaseCentreY - triangleHeight / 2
    );
    context.lineTo(
      triangleBaseCentreX - triangleBaseLength / 4,
      triangleBaseCentreY - triangleHeight / 2
    );
    context.fill();

    const nextOrder = currentOrder + 1;
    const nextTriangleBaseLength = triangleBaseLength / 2;
    const nextTriangleHeight = triangleHeight / 2;
    const smallerTriangleCentrePoints = [
      [triangleBaseCentreX - triangleBaseLength / 4, triangleBaseCentreY],
      [triangleBaseCentreX + triangleBaseLength / 4, triangleBaseCentreY],
      [triangleBaseCentreX, triangleBaseCentreY - triangleHeight / 2],
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

  const triangleBaseLength = Math.min(width, (2 / Math.sqrt(3)) * height);
  const triangleHeight = (Math.sqrt(3) / 2) * triangleBaseLength;
  const triangleBaseCentreX = width / 2;
  const triangleBaseCentreY = height - (height - triangleHeight) / 2;

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
}

export { draw };
