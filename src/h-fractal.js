function drawPattern(
  context,
  centreX,
  centreY,
  level,
  maxLevel,
  width,
  height,
  baseUnitLength
) {
  const unitLength = baseUnitLength * 2 ** (maxLevel - level);
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
  if (level < maxLevel) {
    const nextLevel = level + 1;
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
        nextLevel,
        maxLevel,
        width,
        height,
        baseUnitLength
      );
    }
  }
}

function draw(context, maxLevel) {
  if (!isFinite(maxLevel) || maxLevel < 1) {
    throw new Error(`maxLevel (${maxLevel}) must be a number that is >= 1`);
  }

  const width = context.canvas.clientWidth;
  const height = context.canvas.clientHeight;
  context.clearRect(0, 0, width, height);

  // Length of the vertical side of the smallest H
  const baseUnitLength = Math.min(width, height / 2) / (2 ** maxLevel - 1);

  drawPattern(
    context,
    width / 2,
    height / 2,
    1,
    maxLevel,
    width,
    height,
    baseUnitLength
  );
}

export { draw };

