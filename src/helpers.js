/**
 * Gets the common parameters needed to draw each fractal:
 * - width of the canvas
 * - height of the canvas
 * - the order value as a number
 * @param {*} context canvas context
 * @param {*} order fractal order
 * @returns [width, height, orderNumber]
 * @throws if the order cannot be parsed to a number >= 0
 */
function getParams(context, order) {
  const orderNumber = parseInt(order);
  if (!isFinite(orderNumber) || orderNumber < 0) {
    throw new Error(`order (${order}) must be a whole number that is >= 0`);
  }

  const width = context.canvas.clientWidth;
  const height = context.canvas.clientHeight;
  
  return [ width, height, orderNumber ];
}

export { getParams };
