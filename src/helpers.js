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
