# Proof of Concept

using sharp to convert from an equirectangular image to 6 cube faces compatible with three.js

![Demo](/assets/test2048.jpg)

# Run

Will take the jpg specified in `index.ts main() imageName` and opening the image as a raw byte buffer then
project cube face onto unit sphere by converting cartesian to spherical coordinates and then using different
copy functions, copy the pixels from the source image into a cube face.
We then do this six times, once for each cube face.

the result will be present in the `out` dir.

```bash
yarn install
yarn start
```

# Help

In the `renderFace.ts` file we have a `copyPixel` function which uses either linear, bicubic, lanczos algorithms
to copy the pixels from the source to the destination.
These are javascript implementations which mean that they are very sluggish.
I have done some reading about libvips and the mapim function it has.
But my knowledge of how I would convert renderFace to use this is limited.

Has anyone seen a equirectangular to cubemap implementation in sharp?
The thing I'm looking for should copy a pixel from a raw array into another raw array using lanczos,
since that gives me the best looking outcome.

Could someone point me in the right direction?
