import { PerformanceObserver, performance } from 'perf_hooks'
import sharp from 'sharp'
import { ImageData } from './domain'
import { renderFace } from './renderFace'

const convertFace = async (originalImage: ImageData, imageName: string, faceName: string) => {
  const face: ImageData = await renderFace(originalImage, faceName, (Math.PI * 180) / 180)
  await sharp(face.data, {
    raw: {
      width: face.width,
      height: face.height,
      channels: 3, // no transparency in panos
    },
  })
    // .jpeg({
    //   // progressive: true,
    //   quality: 85,
    //   // optimiseScans: true,
    //   // trellisQuantisation: true,
    //   // quantisationTable: 1,
    // })
    .toFile(`./out/${imageName}@${faceName}.jpg`)
}

const main = async () => {
  const imageName = 'brf-eken@pano'

  performance.mark('start')
  const { data, info } = await sharp(`./assets/${imageName}.jpg`)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const originalImage = new ImageData(info.width, info.height, data)
  performance.mark('open')

  // convertFace(originalImage, imageName, 'pz')
  convertFace(originalImage, imageName, 'nz')
  // convertFace(originalImage, imageName, 'px')
  // convertFace(originalImage, imageName, 'nx')
  // convertFace(originalImage, imageName, 'py')
  // convertFace(originalImage, imageName, 'ny')

  performance.mark('convert')

  const obs = new PerformanceObserver((items) => {
    for (const entry of items.getEntries()) {
      console.log(entry.name, entry.duration)
    }
  })
  obs.observe({ entryTypes: ['measure'] })

  performance.measure('open', 'start', 'open')
  performance.measure('convert', 'open', 'convert')
  performance.measure('all', 'start', 'convert')
}
main()
  .catch(console.error)
  .finally(() => performance.clearMarks())
