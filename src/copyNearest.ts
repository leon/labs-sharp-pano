import { clamp } from './math'
import { ImageData } from './domain'

export function copyPixelNearest(
  read: ImageData,
  write: ImageData,
): (xFrom: number, yFrom: number, to: number) => void {
  const { width, height, data } = read
  const readIndex = (x: number, y: number): number => 3 * (y * width + x)

  return (xFrom: number, yFrom: number, to: number) => {
    const nearest: number = readIndex(
      clamp(Math.round(xFrom), 0, width - 1),
      clamp(Math.round(yFrom), 0, height - 1),
    )

    for (let channel = 0; channel < 3; channel++) {
      write.data[to + channel] = data[nearest + channel]
    }
  }
}
