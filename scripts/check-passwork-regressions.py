#!/usr/bin/env python3
"""Check that inline animated artwork preserves every exported face and order."""
from pathlib import Path
import re
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / 'dist/index.html').read_text()
ns = {'s': 'http://www.w3.org/2000/svg'}
for name in ('gis', 'kii', 'asu-tp', 'ispdn'):
    original = ET.parse(ROOT / f'dist/passwork-assets/certification/{name}.svg').getroot()
    markup = next(s for s in re.findall(r'<svg\b.*?</svg>', html, re.S) if f'data-art="{name}"' in s)
    inline = ET.fromstring(markup)
    def faces(svg):
        return [{k:v for k,v in p.attrib.items() if k != 'id'} for p in svg.findall('.//s:path', ns)]
    assert faces(original) == faces(inline), f'{name}: lost, changed or reordered faces'
    assert inline.attrib['viewBox'] == original.attrib['viewBox']
    assert len(inline.findall('.//s:g[@class="certification-layer"]', ns)) > 1
    print(f'PASS {name}: original geometry and painter order preserved')
