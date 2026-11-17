/** First item moves to the end. Returns a new array. */
export function toBack<T>(order: readonly T[]): T[] {
  return order.length ? [...order.slice(1), order[0]] : [];
}

/** Last item moves to the start. Returns a new array. */
export function toFront<T>(order: readonly T[]): T[] {
  return order.length ? [order[order.length - 1], ...order.slice(0, -1)] : [];
}
