/**
 * For handwriting drawn on a canvas: returns, for every pixel column, the height
 * the pen tip should be at. It sits a third of the way down the ink in that column,
 * holds its height across gaps between letters, and is smoothed so the pen glides.
 */
export function inkCenterline(alpha: Uint8ClampedArray, width: number, height: number, startY: number): number[] {
  const raw: number[] = [];
  let last = startY;
  for (let x = 0; x < width; x++) {
    let top = -1;
    let bottom = -1;
    for (let y = 0; y < height; y++) {
      if (alpha[(y * width + x) * 4 + 3] > 60) {
        if (top < 0) top = y;
        bottom = y;
      }
    }
    if (top >= 0) last = top + (bottom - top) * 0.32;
    raw.push(last);
  }
  return raw.map((_, i) => {
    let sum = 0;
    let n = 0;
    for (let d = -6; d <= 6; d++) {
      const v = raw[i + d];
      if (v !== undefined) {
        sum += v;
        n++;
      }
    }
    return sum / n;
  });
}
