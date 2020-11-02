import { Vector3 } from './domain'

/**
 * Gets the transform values for the cube
 * @param face the face that we should extract from the equirectangular image
 */
export function getFaceOrientationFn(face: string): (out: Vector3, x: number, y: number) => void {
  switch (face) {
    case 'pz':
      return (out: Vector3, x: number, y: number) => {
        out.x = -1
        out.y = -x
        out.z = -y
      }
    case 'nz':
      return (out: Vector3, x: number, y: number) => {
        out.x = 1
        out.y = x
        out.z = -y
      }
    case 'px':
      return (out: Vector3, x: number, y: number) => {
        out.x = x
        out.y = -1
        out.z = -y
      }
    case 'nx':
      return (out: Vector3, x: number, y: number) => {
        out.x = -x
        out.y = 1
        out.z = -y
      }
    case 'py':
      return (out: Vector3, x: number, y: number) => {
        out.x = -y
        out.y = -x
        out.z = 1
      }
    case 'ny':
      return (out: Vector3, x: number, y: number) => {
        out.x = y
        out.y = -x
        out.z = -1
      }
    default:
      return (out: Vector3, x: number, y: number) => {
        out.x = 0
        out.y = 0
        out.z = 0
      }
  }
}
