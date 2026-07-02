import os
import glob

files = glob.glob('*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Replace unsplash links with local images
    content = content.replace("https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800", "images/artisan_blends.png")
    content = content.replace("https://images.unsplash.com/photo-1495474472207-46522c07000b?auto=format&fit=crop&q=80&w=800", "images/brewing_equipment.png")
    content = content.replace("https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=800", "images/coffee_event.png")
    
    # Hero background replacements
    content = content.replace("url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1920')", "url('images/hero_bg.png')")
    content = content.replace("url('https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1920')", "url('images/hero_bg.png')")
    content = content.replace("url('https://images.unsplash.com/photo-1544243614-7ce700e4b85c?auto=format&fit=crop&q=80&w=1920')", "url('images/hero_bg.png')")
    content = content.replace("url('https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=1920')", "url('images/hero_bg.png')")
    
    # Other images in catalogue (coffee-selection and brewing equipment)
    content = content.replace("https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400", "images/artisan_blends.png")
    content = content.replace("https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=400", "images/artisan_blends.png")
    content = content.replace("https://images.unsplash.com/photo-1551806235-a05d8f6f571b?auto=format&fit=crop&q=80&w=400", "images/artisan_blends.png")
    content = content.replace("https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=400", "images/artisan_blends.png")
    
    content = content.replace("https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&q=80&w=400", "images/brewing_equipment.png")
    content = content.replace("https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400", "images/brewing_equipment.png")
    content = content.replace("https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&q=80&w=400", "images/brewing_equipment.png")
    content = content.replace("https://images.unsplash.com/photo-1589396575653-c09c794f6f39?auto=format&fit=crop&q=80&w=400", "images/brewing_equipment.png")

    # Fix index.html hero inline style (which is currently missing)
    if '<section class="hero">' in content:
        content = content.replace('<section class="hero">', '<section class="hero" style="background-image: url(\'images/hero_bg.png\'); background-size: cover; background-position: center;">')
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Images replaced successfully.")
