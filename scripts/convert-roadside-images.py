import json
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent.parent
assets = json.loads((root / 'data/roadside-image-prompts.json').read_text())['assets']
target = root / 'public/images/realistic'
target.mkdir(parents=True, exist_ok=True)
sheet = Image.new('RGB', (1200, 1200), '#edf0f2')
draw = ImageDraw.Draw(sheet)
for i, asset in enumerate(assets):
    im = Image.open(asset['source']).convert('RGBA')
    alpha = im.getchannel('A')
    assert alpha.getextrema()[0] == 0, asset['name'] + ' missing transparency'
    im.thumbnail((960, 960), Image.Resampling.LANCZOS)
    im.save(target / (asset['name'] + '.webp'), quality=92, method=6)
    preview = im.copy()
    preview.thumbnail((290, 260), Image.Resampling.LANCZOS)
    x, y = (i % 4) * 300, (i // 4) * 400
    sheet.paste(preview, (x + (300-preview.width)//2, y+30), preview)
    draw.text((x+12,y+310), asset['name'], fill='#102030')
    print(asset['name'], alpha.getextrema(), (target / (asset['name'] + '.webp')).stat().st_size)
sheet.save(root / 'roadside-preview.jpg')
