"""Package the Passwork page and its dependencies for GitHub Pages."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
OUTPUT = ROOT / '_site'
TEXT_TYPES = {'.html', '.css', '.js', '.svg'}
REFERENCES = re.compile(
    r'''(?:src|href)\s*=\s*["']([^"']+)["']'''
    r'''|url\(\s*["']?([^)"'\s]+)'''
    r'''|(?:\bfrom\s+|\bimport\s*)["'](\.[^"']+)["']'''
)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-path', default='/passwork-pragmatica/')
    args = parser.parse_args()
    base = '/' + args.base_path.strip('/') + '/' if args.base_path.strip('/') else '/'
    if not re.fullmatch(r'/[a-zA-Z0-9_./-]*', base):
        parser.error('base-path must be a URL path')

    pending = [DIST / 'index.html']
    files = {}
    while pending:
        path = pending.pop().resolve()
        if path in files:
            continue
        if not path.is_relative_to(DIST) or not path.is_file():
            raise ValueError(f'Missing or invalid site resource: {path}')
        data = path.read_bytes()
        if path.suffix in TEXT_TYPES:
            text = data.decode('utf-8')
            replacements = {}
            for match in REFERENCES.finditer(text):
                ref = next(group for group in match.groups() if group is not None)
                url = urlsplit(ref)
                # Encoded SVG filter fragments inside data URLs are not files.
                if url.scheme or url.netloc or not url.path or unquote(url.path).startswith('#') or '${' in ref:
                    continue
                dependency = (DIST / unquote(url.path).lstrip('/') if ref.startswith('/')
                              else path.parent / unquote(url.path)).resolve()
                pending.append(dependency)
                if ref.startswith('/'):
                    replacements[ref] = base + ref.lstrip('/')
            # Rebase literal resource URLs while keeping local development unchanged.
            text = REFERENCES.sub(
                lambda match: next((match.group(0).replace(ref, replacement)
                                    for ref, replacement in replacements.items()
                                    if ref in match.groups()), match.group(0)), text
            )
            data = text.encode('utf-8')
        files[path] = data

    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    for path, data in files.items():
        target = OUTPUT / path.relative_to(DIST)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
    (OUTPUT / '.nojekyll').touch()
    print(f'Packaged {len(files)} files for {base} in {OUTPUT}')


if __name__ == '__main__':
    main()
