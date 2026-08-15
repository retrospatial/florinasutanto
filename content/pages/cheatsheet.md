---
title: Cheatsheet
---

## Media Optimization

### Images

#### All in a folder

```bash
mkdir -p webp
for f in *.{jpg,jpeg,heic,JPG,JPEG,HEIC}(N); do
  magick "$f" -auto-orient \
    -filter Lanczos -resize '1600x>' \
    -unsharp 0x0.75+0.75+0.008 \
    -quality 82 -define webp:method=6 \
    "webp/${f:r}.webp"
done

for f in *.{png,PNG}(N); do
  magick "$f" -auto-orient -filter Lanczos -resize '1600x>' \
    -define webp:lossless=true \
    "webp/${f:r}.webp"
done
```

#### By individual image

For regular 'scenery' images:

```bash
f=image.jpg
magick "$f" -auto-orient \
  -filter Lanczos -resize '1600x>' \
  -unsharp 0x0.75+0.75+0.008 \
  -quality 82 -define webp:method=6 \
  "${f:r}.webp"
```

For screenshots, images with text & flat colors:

```bash
f=image.png
magick "$f" -auto-orient \
  -filter Lanczos -resize '1600x>' \
  -define webp:lossless=true \
  "${f:r}.webp"
```

#### Dithering

```bash
magick image.png -colorspace Gray -resize 800x -normalize \
  -ordered-dither o4x4 -colorspace sRGB \
  +level-colors '#181818','#d7d3c7' image.png
```

### Videos

#### All in a folder

```bash
for f in *.mp4; do
  ffmpeg -i "$f" -vf "scale='trunc(min(1200,iw)/2)*2:-2'" -c:v libx265 -vtag hvc1 -c:a copy "${f%.mp4}_temp.mp4"
  mv "${f%.mp4}_temp.mp4" "$f"
done
```

#### By individual video

```bash
f=input.mp4
ffmpeg -i "$f" \
  -vf "scale='trunc(min(1200,iw)/2)*2:-2'" \
  -c:v libx265 -vtag hvc1 -c:a copy \
  "${f%.mp4}_temp.mp4" &&
  mv "${f%.mp4}_temp.mp4" "$f"
```

## Aside

```svelte
<script>
	import Aside from '$lib/helpers/Aside.svelte';
</script>

<!-- inline with text -->
<span class="aside-marker">\*</span>

<!-- after paragraph -->
<Aside><span class="aside-marker">*</span>aside</Aside>
```
