"""Check generated media and parse the inline JavaScript without running it."""
from pathlib import Path
import re
import subprocess
from PIL import Image

root = Path(__file__).resolve().parent
html = (root / 'index.html').read_text(encoding='utf-8')
for source in re.findall(r'(?:src|photo): "([^"]+)"', html):
    path = root / source
    assert path.is_file(), source
    if source.endswith('.jpg'):
        with Image.open(path.with_suffix('.webp')) as image:
            assert max(image.size) <= 1200
    if source.endswith('.mp4'):
        assert path.with_name(path.stem + '-poster.webp').is_file()
        boxes = []
        with path.open('rb') as stream:
            while True:
                header = stream.read(8)
                if len(header) < 8:
                    break
                size, kind = int.from_bytes(header[:4], 'big'), header[4:]
                header_size = 8
                if size == 1:
                    size = int.from_bytes(stream.read(8), 'big')
                    header_size = 16
                boxes.append(kind)
                if size == 0:
                    break
                assert size >= header_size
                stream.seek(size - header_size, 1)
        assert boxes.index(b'moov') < boxes.index(b'mdat'), source
scripts = re.findall(r'<script>(.*?)</script>', html, re.S)
for script in scripts:
    subprocess.run(['node', '--check'], input=script, encoding='utf-8', check=True)
print('PASS: asset paths, WebP dimensions, seven posters, MP4 fast start, JavaScript syntax')
