export class ImageData {
  width: number
  height: number
  length: number
  data: Buffer

  toBuffer(): Buffer {
    return Buffer.from(this.data.buffer)
  }

  constructor(width: number, height: number, data?: Buffer) {
    this.width = width
    this.height = height
    this.length = data?.length ?? width * height * 4 // assumes 4 BPP; documented.
    this.data = data ?? Buffer.alloc(this.length)
  }
}

export interface Vector3 {
  x: number
  y: number
  z: number
}
