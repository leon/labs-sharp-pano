import { getFaceOrientationFn } from './getFaceOrentation'
import { copyPixelNearest } from './copyNearest'
import { Vector3, ImageData } from './domain'
import { mod } from './math'
import { copyPixelBicubic } from './copyBicubic'

export const renderFace = (
  readData: ImageData,
  face: string,
  rotation: number,
  interpolation?: string,
  maxWidth: number = Number.MAX_VALUE,
): ImageData => {
  const faceWidth: number = Math.min(maxWidth, readData.width / 4)
  const faceHeight: number = faceWidth

  // how should we transform this face
  const orientationFn = getFaceOrientationFn(face)

  // const writeData = new ImageData(faceWidth, faceHeight);
  const writeData: ImageData = new ImageData(faceWidth, faceHeight)

  // how should we copy the pixels
  const copyPixel = copyPixelNearest(readData, writeData)
  //const copyPixel = copyPixelLanczos(readData, writeData)
  //const copyPixel = copyPixelBicubic(readData, writeData)
  // const copyPixel =
  //   interpolation === 'linear'
  //     ? copyPixelBilinear(readData, writeData)
  //     : interpolation === 'cubic'
  //     ? copyPixelBicubic(readData, writeData)
  //     : interpolation === 'lanczos'
  //     ? copyPixelLanczos(readData, writeData)
  //     : interpolation === 'nearest'
  //     ? copyPixelNearest(readData, writeData)
  //     : copyPixelLanczos(readData, writeData)

  // create working cube Vector3
  const cube: Vector3 = { x: 0, y: 0, z: 0 }

  const pixelBytes = 3

  // iterate over all pixels in image
  for (let x: number = 0; x < faceWidth; x++) {
    for (let y: number = 0; y < faceHeight; y++) {
      const to: number = pixelBytes * (y * faceWidth + x)

      // fill alpha channel
      // writeData.data[to + 3] = 255

      // get position on cube face
      // cube is centered at the origin with a side length of 2
      orientationFn(cube, (2 * (x + 0.5)) / faceWidth - 1, (2 * (y + 0.5)) / faceHeight - 1)

      // project cube face onto unit sphere by converting cartesian to spherical coordinates
      const r = Math.sqrt(cube.x * cube.x + cube.y * cube.y + cube.z * cube.z)
      const lon = mod(Math.atan2(cube.y, cube.x) + rotation, 2 * Math.PI)
      const lat = Math.acos(cube.z / r)

      copyPixel(
        (readData.width * lon) / Math.PI / 2 - 0.5,
        (readData.height * lat) / Math.PI - 0.5,
        to,
      )
    }
  }

  return writeData
}
