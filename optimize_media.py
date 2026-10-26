"""Generate web images and posters; remux MP4 for progressive playback.
Requires: python -m pip install pillow imageio-ffmpeg
"""
from pathlib import Path
import subprocess
import imageio_ffmpeg
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
before = after = 0
for folder in ('album', 'jejakwaktu'):
    for source in (ROOT / folder).glob('*.jpg'):
        target = source.with_suffix('.webp')
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert('RGB')
            image.thumbnail((1200, 1200))
            image.save(target, 'WEBP', quality=82, method=6)
        before += source.stat().st_size
        after += target.stat().st_size
print(f'Photos: {before:,} -> {after:,} bytes', flush=True)
for source in (ROOT / 'album').glob('*.mp4'):
    poster = source.with_name(source.stem + '-poster.webp')
    subprocess.run([ffmpeg, '-v', 'error', '-y', '-i', str(source),
                    '-frames:v', '1', '-vf', 'scale=480:-2', str(poster)], check=True)
    target = source.with_suffix('.faststart.tmp.mp4')
    subprocess.run([ffmpeg, '-v', 'error', '-y', '-i', str(source),
                    '-map', '0', '-c', 'copy', '-movflags', '+faststart', str(target)], check=True)
    target.replace(source)
    print(f'{source.name}: fast start ready, poster {poster.stat().st_size:,} bytes', flush=True)
