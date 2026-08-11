#!/usr/bin/env python3
"""
Turn the raw shop photos into web-ready assets in public/images/shop/.

The originals are 4032x3024 iPhone frames, ~3 MB each, all portrait, and most
of them rely on an EXIF orientation flag to display the right way up. This
script bakes the rotation in, crops to a fixed aspect per slot, strips all
metadata (the originals carry GPS), and writes WebP + JPEG for each output.

    pip install Pillow
    python scripts/optimize-images.py

Re-run it after changing SOURCE or the recipes below; it overwrites in place.
"""

import os
import sys
from PIL import Image, ImageOps

SOURCE = os.environ.get(
    'CELLAR_PHOTOS',
    r"C:\Users\mdala\OneDrive\Desktop\Last semester\New folder\Celler\wetransfer-2026-08-09",
)
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'images', 'shop')

# Photos chosen for the gallery grid, in display order.
GALLERY = [1, 2, 3, 5, 6, 8, 11, 13, 15, 20, 21, 25]

# slot name -> (source number, aspect w/h, width, vertical focus 0=top 1=bottom)
FEATURES = {
    # Neon cross + CE-LLAR wordmark sit high in the frame, so bias the crop up.
    'hero-storefront': (4, 3 / 2, 2000, 0.08),
    'events-tasting': (17, 4 / 5, 1200, 0.35),
    'shop-counter': (18, 4 / 5, 1200, 0.45),
    'visit-storefront': (9, 4 / 5, 1200, 0.45),
}

JPEG_Q = 82
WEBP_Q = 80


def load(num):
    """Open a source photo with EXIF rotation applied and metadata dropped."""
    path = os.path.join(SOURCE, f'image{num:05d}.jpeg')
    im = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    clean = Image.new('RGB', im.size)
    clean.putdata(list(im.getdata()))
    return clean


def crop_to(im, aspect, focus):
    """Centre-crop horizontally, focus-weighted vertically, to `aspect` (w/h)."""
    w, h = im.size
    if w / h > aspect:
        new_w = int(round(h * aspect))
        left = (w - new_w) // 2
        return im.crop((left, 0, left + new_w, h))
    new_h = int(round(w / aspect))
    top = int(round((h - new_h) * focus))
    return im.crop((0, top, w, top + new_h))


def emit(im, name, width):
    im = im.resize((width, int(round(width * im.height / im.width))), Image.LANCZOS)
    jpg = os.path.join(OUT, name + '.jpg')
    webp = os.path.join(OUT, name + '.webp')
    im.save(jpg, 'JPEG', quality=JPEG_Q, optimize=True, progressive=True)
    im.save(webp, 'WEBP', quality=WEBP_Q, method=6)
    return (
        name,
        im.size,
        os.path.getsize(jpg) // 1024,
        os.path.getsize(webp) // 1024,
    )


def main():
    if not os.path.isdir(SOURCE):
        sys.exit(f'Source folder not found: {SOURCE}\nSet CELLAR_PHOTOS to override.')
    os.makedirs(OUT, exist_ok=True)

    rows = []
    for name, (num, aspect, width, focus) in FEATURES.items():
        rows.append(emit(crop_to(load(num), aspect, focus), name, width))

    for i, num in enumerate(GALLERY, start=1):
        src = load(num)
        tile = crop_to(src, 4 / 5, 0.4)
        rows.append(emit(tile, f'gallery-{i:02d}', 900))
        rows.append(emit(crop_to(src, 3 / 4, 0.4), f'gallery-{i:02d}-full', 1400))

    total_jpg = sum(r[2] for r in rows)
    total_webp = sum(r[3] for r in rows)
    for name, size, kj, kw in rows:
        print(f'{name:24} {size[0]:>5}x{size[1]:<5} jpg {kj:>4} KB   webp {kw:>4} KB')
    print(f'\n{len(rows)} images   jpg {total_jpg / 1024:.1f} MB   webp {total_webp / 1024:.1f} MB')
    print(f'written to {os.path.normpath(OUT)}')


if __name__ == '__main__':
    main()
