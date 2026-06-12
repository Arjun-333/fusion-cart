"""Product Service — CRUD, search, filter, featured products"""
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from fastapi import HTTPException
from typing import Optional
from app.models.product import Product, Category, Review
from app.schemas.product import ProductCreate, ProductUpdate, ReviewCreate
from app.utils.helpers import paginate


MOCK_PRODUCTS = [
    # Electronics
    {"id": 1, "name": "Sony WH-1000XM5 Headphones", "slug": "sony-wh1000xm5", "price": 24999, "original_price": 34999, "discount_percent": 28, "brand": "Sony", "category_id": 1, "rating": 4.8, "review_count": 1240, "stock_quantity": 50, "is_featured": True, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"], "tags": ["headphones", "wireless", "noise-cancelling"], "short_description": "Industry-leading noise cancelling with Auto NC Optimizer", "specifications": {"Driver": "30mm", "Battery": "30hrs", "Connectivity": "Bluetooth 5.2"}, "variants": [], "is_active": True},
    {"id": 2, "name": "Apple MacBook Air M3", "slug": "apple-macbook-air-m3", "price": 114900, "original_price": 124900, "discount_percent": 8, "brand": "Apple", "category_id": 1, "rating": 4.9, "review_count": 890, "stock_quantity": 20, "is_featured": True, "is_bestseller": True, "is_new": True, "images": ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600"], "tags": ["laptop", "macbook", "apple", "m3"], "short_description": "Supercharged by M3 chip with 18-hour battery", "specifications": {"Chip": "Apple M3", "RAM": "8GB", "Storage": "256GB SSD", "Display": "13.6-inch Liquid Retina"}, "variants": [], "is_active": True},
    {"id": 3, "name": "Samsung Galaxy S25 Ultra", "slug": "samsung-galaxy-s25-ultra", "price": 134999, "original_price": 144999, "discount_percent": 7, "brand": "Samsung", "category_id": 1, "rating": 4.7, "review_count": 650, "stock_quantity": 35, "is_featured": True, "is_new": True, "is_bestseller": False, "images": ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600"], "tags": ["smartphone", "samsung", "android"], "short_description": "Ultimate AI smartphone with 200MP camera", "specifications": {"Processor": "Snapdragon 8 Elite", "RAM": "12GB", "Camera": "200MP"}, "variants": [], "is_active": True},
    {"id": 4, "name": "iPad Pro 13-inch M4", "slug": "ipad-pro-13-m4", "price": 108900, "original_price": None, "discount_percent": 0, "brand": "Apple", "category_id": 1, "rating": 4.8, "review_count": 420, "stock_quantity": 15, "is_featured": False, "is_new": True, "is_bestseller": False, "images": ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600"], "tags": ["tablet", "ipad", "apple"], "short_description": "Impossibly thin. Incredibly powerful.", "specifications": {"Chip": "Apple M4", "Display": "13-inch Ultra Retina XDR"}, "variants": [], "is_active": True},
    # Fashion
    {"id": 5, "name": "Nike Air Max 270", "slug": "nike-air-max-270", "price": 12995, "original_price": 14995, "discount_percent": 13, "brand": "Nike", "category_id": 2, "rating": 4.6, "review_count": 3200, "stock_quantity": 80, "is_featured": True, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"], "tags": ["shoes", "nike", "sneakers", "air max"], "short_description": "The biggest Air unit yet for all-day cushioning", "specifications": {}, "variants": [{"type": "size", "options": ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"]}, {"type": "color", "options": ["Black/White", "Triple White", "Blue/Red"]}], "is_active": True},
    {"id": 6, "name": "Levi's 511 Slim Jeans", "slug": "levis-511-slim-jeans", "price": 3499, "original_price": 4999, "discount_percent": 30, "brand": "Levi's", "category_id": 2, "rating": 4.4, "review_count": 5600, "stock_quantity": 120, "is_featured": False, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"], "tags": ["jeans", "denim", "levis", "men"], "short_description": "Slim fit jeans with a slight taper at the ankle", "specifications": {}, "variants": [{"type": "size", "options": ["28x30", "30x30", "32x32", "34x32"]}, {"type": "color", "options": ["Indigo", "Black", "Grey"]}], "is_active": True},
    {"id": 7, "name": "Adidas Ultraboost 24", "slug": "adidas-ultraboost-24", "price": 17999, "original_price": 19999, "discount_percent": 10, "brand": "Adidas", "category_id": 2, "rating": 4.7, "review_count": 2100, "stock_quantity": 60, "is_featured": True, "is_new": True, "is_bestseller": False, "images": ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600"], "tags": ["shoes", "adidas", "running", "ultraboost"], "short_description": "Revolutionary BOOST midsole for unmatched energy return", "specifications": {}, "variants": [{"type": "size", "options": ["UK 6", "UK 7", "UK 8", "UK 9"]}], "is_active": True},
    {"id": 8, "name": "Ray-Ban Aviator Classic", "slug": "rayban-aviator-classic", "price": 8990, "original_price": 10990, "discount_percent": 18, "brand": "Ray-Ban", "category_id": 2, "rating": 4.5, "review_count": 890, "stock_quantity": 45, "is_featured": False, "is_new": False, "is_bestseller": True, "images": ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600"], "tags": ["sunglasses", "rayban", "eyewear"], "short_description": "The icon. The legend. Timeless aviator style.", "specifications": {"Lens": "G-15 glass", "Frame": "Gold metal"}, "variants": [], "is_active": True},
    # Furniture
    {"id": 9, "name": "IKEA KALLAX Shelf Unit", "slug": "ikea-kallax-shelf", "price": 8499, "original_price": None, "discount_percent": 0, "brand": "IKEA", "category_id": 3, "rating": 4.3, "review_count": 4500, "stock_quantity": 25, "is_featured": False, "is_new": False, "is_bestseller": True, "images": ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"], "tags": ["shelf", "storage", "ikea", "furniture"], "short_description": "Flexible shelving that adapts to your needs", "specifications": {"Dimensions": "77x77cm", "Material": "Particleboard"}, "variants": [{"type": "color", "options": ["White", "Black-Brown", "Oak"]}], "is_active": True},
    {"id": 10, "name": "Herman Miller Aeron Chair", "slug": "herman-miller-aeron", "price": 89999, "original_price": 99999, "discount_percent": 10, "brand": "Herman Miller", "category_id": 3, "rating": 4.9, "review_count": 320, "stock_quantity": 8, "is_featured": True, "is_bestseller": False, "is_new": False, "images": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600"], "tags": ["chair", "office", "ergonomic"], "short_description": "The gold standard in ergonomic seating", "specifications": {"Size": "Size B (Medium)", "Material": "8Z Pellicle mesh"}, "variants": [{"type": "size", "options": ["Size A", "Size B", "Size C"]}], "is_active": True},
    # Toys
    {"id": 11, "name": "LEGO Technic Bugatti Chiron", "slug": "lego-technic-bugatti", "price": 14999, "original_price": 17999, "discount_percent": 17, "brand": "LEGO", "category_id": 4, "rating": 4.8, "review_count": 780, "stock_quantity": 30, "is_featured": True, "is_new": False, "is_bestseller": True, "images": ["https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600"], "tags": ["lego", "toys", "technic", "building"], "short_description": "3599 pieces of pure engineering excellence", "specifications": {"Pieces": "3599", "Age": "16+", "Dimensions": "56x25x14cm"}, "variants": [], "is_active": True},
    {"id": 12, "name": "PlayStation 5 Console", "slug": "playstation-5", "price": 54990, "original_price": None, "discount_percent": 0, "brand": "Sony", "category_id": 4, "rating": 4.9, "review_count": 9800, "stock_quantity": 5, "is_featured": True, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600"], "tags": ["gaming", "playstation", "sony", "console"], "short_description": "Play has no limits with PS5's lightning speed and stunning graphics", "specifications": {"CPU": "AMD Zen 2", "Storage": "825GB SSD", "Resolution": "Up to 8K"}, "variants": [], "is_active": True},
    
    # 20 NEW RANDOM PRODUCTS TO FILL THE PAGE
    {"id": 13, "name": "Logitech MX Master 3S", "slug": "logitech-mx-master-3s", "price": 9999, "original_price": 10999, "discount_percent": 9, "brand": "Logitech", "category_id": 1, "rating": 4.7, "review_count": 4120, "stock_quantity": 40, "is_featured": True, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1615663245857-ac93bb7c3993?w=600"], "tags": ["mouse", "wireless", "logitech", "office"], "short_description": "Advanced Wireless Mouse for precise tracking", "specifications": {}, "variants": [], "is_active": True},
    {"id": 14, "name": "Dell UltraSharp 27 4K", "slug": "dell-ultrasharp-27-4k", "price": 52990, "original_price": 58990, "discount_percent": 10, "brand": "Dell", "category_id": 1, "rating": 4.6, "review_count": 820, "stock_quantity": 12, "is_featured": True, "is_bestseller": False, "is_new": False, "images": ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600"], "tags": ["monitor", "4k", "display", "dell"], "short_description": "Brilliant 27-inch 4K monitor with IPS Black tech", "specifications": {}, "variants": [], "is_active": True},
    {"id": 15, "name": "Casio G-Shock Matte Black", "slug": "casio-gshock-matte", "price": 7495, "original_price": 8995, "discount_percent": 16, "brand": "Casio", "category_id": 2, "rating": 4.8, "review_count": 5230, "stock_quantity": 100, "is_featured": False, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600"], "tags": ["watch", "gshock", "accessories"], "short_description": "Rugged, water-resistant matte black watch", "specifications": {}, "variants": [], "is_active": True},
    {"id": 16, "name": "Canon EOS R5 Mirrorless Camera", "slug": "canon-eos-r5", "price": 319990, "original_price": 339990, "discount_percent": 5, "brand": "Canon", "category_id": 1, "rating": 4.9, "review_count": 210, "stock_quantity": 5, "is_featured": True, "is_bestseller": False, "is_new": True, "images": ["https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=600"], "tags": ["camera", "photography", "canon"], "short_description": "45MP full-frame sensor and 8K video recording", "specifications": {}, "variants": [], "is_active": True},
    {"id": 17, "name": "Bose SoundLink Revolve+", "slug": "bose-soundlink-revolve", "price": 24900, "original_price": 27900, "discount_percent": 10, "brand": "Bose", "category_id": 1, "rating": 4.6, "review_count": 1850, "stock_quantity": 25, "is_featured": False, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600"], "tags": ["speaker", "audio", "bluetooth", "bose"], "short_description": "True 360-degree sound for consistent coverage", "specifications": {}, "variants": [], "is_active": True},
    {"id": 18, "name": "Puma Classic Suede", "slug": "puma-classic-suede", "price": 4499, "original_price": 5999, "discount_percent": 25, "brand": "Puma", "category_id": 2, "rating": 4.5, "review_count": 3100, "stock_quantity": 60, "is_featured": False, "is_bestseller": False, "is_new": False, "images": ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600"], "tags": ["shoes", "sneakers", "puma"], "short_description": "The iconic suede classic sneaker", "specifications": {}, "variants": [], "is_active": True},
    {"id": 19, "name": "Dyson V15 Detect", "slug": "dyson-v15-detect", "price": 74900, "original_price": 82900, "discount_percent": 9, "brand": "Dyson", "category_id": 3, "rating": 4.8, "review_count": 1120, "stock_quantity": 10, "is_featured": True, "is_bestseller": True, "is_new": True, "images": ["https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600"], "tags": ["vacuum", "home", "dyson"], "short_description": "Laser reveals microscopic dust", "specifications": {}, "variants": [], "is_active": True},
    {"id": 20, "name": "Nintendo Switch OLED", "slug": "nintendo-switch-oled", "price": 34990, "original_price": 37990, "discount_percent": 7, "brand": "Nintendo", "category_id": 4, "rating": 4.8, "review_count": 7600, "stock_quantity": 40, "is_featured": True, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600"], "tags": ["gaming", "console", "nintendo"], "short_description": "7-inch OLED screen with vibrant colors", "specifications": {}, "variants": [], "is_active": True},
    {"id": 21, "name": "Kindle Paperwhite (16GB)", "slug": "kindle-paperwhite", "price": 13999, "original_price": 14999, "discount_percent": 6, "brand": "Amazon", "category_id": 1, "rating": 4.7, "review_count": 14500, "stock_quantity": 200, "is_featured": True, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=600"], "tags": ["ereader", "kindle", "amazon"], "short_description": "Now with a 6.8\" display and thinner borders", "specifications": {}, "variants": [], "is_active": True},
    {"id": 22, "name": "Samsung 55\" The Frame TV", "slug": "samsung-frame-55", "price": 84990, "original_price": 104990, "discount_percent": 19, "brand": "Samsung", "category_id": 1, "rating": 4.5, "review_count": 940, "stock_quantity": 15, "is_featured": True, "is_bestseller": False, "is_new": False, "images": ["https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600"], "tags": ["tv", "samsung", "4k"], "short_description": "TV when it's on. Art when it's off.", "specifications": {}, "variants": [], "is_active": True},
    {"id": 23, "name": "Oculus Quest 3 (128GB)", "slug": "oculus-quest-3", "price": 49999, "original_price": 54999, "discount_percent": 9, "brand": "Meta", "category_id": 1, "rating": 4.6, "review_count": 1200, "stock_quantity": 30, "is_featured": True, "is_bestseller": True, "is_new": True, "images": ["https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600"], "tags": ["vr", "gaming", "meta", "oculus"], "short_description": "Breakthrough mixed reality headset", "specifications": {}, "variants": [], "is_active": True},
    {"id": 24, "name": "Yeti Rambler 20 oz Tumbler", "slug": "yeti-rambler-20", "price": 2999, "original_price": 3499, "discount_percent": 14, "brand": "Yeti", "category_id": 3, "rating": 4.9, "review_count": 8900, "stock_quantity": 150, "is_featured": False, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600"], "tags": ["tumbler", "kitchen", "yeti"], "short_description": "Stainless steel, vacuum insulated tumbler", "specifications": {}, "variants": [], "is_active": True},
    {"id": 25, "name": "Apple Watch Series 9", "slug": "apple-watch-series-9", "price": 41900, "original_price": 44900, "discount_percent": 6, "brand": "Apple", "category_id": 1, "rating": 4.8, "review_count": 3400, "stock_quantity": 50, "is_featured": True, "is_bestseller": True, "is_new": True, "images": ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600"], "tags": ["watch", "smartwatch", "apple"], "short_description": "A brighter mind. A brighter screen.", "specifications": {}, "variants": [], "is_active": True},
    {"id": 26, "name": "Philips Hue White and Color Starter Kit", "slug": "philips-hue-starter-kit", "price": 14999, "original_price": 17999, "discount_percent": 16, "brand": "Philips", "category_id": 3, "rating": 4.7, "review_count": 2100, "stock_quantity": 45, "is_featured": False, "is_bestseller": False, "is_new": False, "images": ["https://images.unsplash.com/photo-1550524514-d02ba815152a?w=600"], "tags": ["smart home", "lighting", "philips"], "short_description": "Smart lighting for your home", "specifications": {}, "variants": [], "is_active": True},
    {"id": 27, "name": "Asus ROG Zephyrus G14", "slug": "asus-rog-g14", "price": 144990, "original_price": 164990, "discount_percent": 12, "brand": "Asus", "category_id": 1, "rating": 4.8, "review_count": 650, "stock_quantity": 10, "is_featured": True, "is_bestseller": False, "is_new": False, "images": ["https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600"], "tags": ["laptop", "gaming", "asus"], "short_description": "The world's most powerful 14-inch gaming laptop", "specifications": {}, "variants": [], "is_active": True},
    {"id": 28, "name": "North Face Recon Backpack", "slug": "north-face-recon", "price": 8499, "original_price": 9999, "discount_percent": 15, "brand": "The North Face", "category_id": 2, "rating": 4.7, "review_count": 1400, "stock_quantity": 80, "is_featured": False, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"], "tags": ["bag", "backpack", "travel"], "short_description": "Durable backpack with dedicated laptop compartment", "specifications": {}, "variants": [], "is_active": True},
    {"id": 29, "name": "Razer DeathAdder V3 Pro", "slug": "razer-deathadder-v3-pro", "price": 12999, "original_price": 14999, "discount_percent": 13, "brand": "Razer", "category_id": 1, "rating": 4.9, "review_count": 850, "stock_quantity": 30, "is_featured": False, "is_bestseller": False, "is_new": False, "images": ["https://images.unsplash.com/photo-1527814050087-3793815479db?w=600"], "tags": ["mouse", "gaming", "razer"], "short_description": "Ultra-lightweight wireless ergonomic esports mouse", "specifications": {}, "variants": [], "is_active": True},
    {"id": 30, "name": "Anker PowerCore 26800", "slug": "anker-powercore-26800", "price": 4999, "original_price": 5999, "discount_percent": 16, "brand": "Anker", "category_id": 1, "rating": 4.8, "review_count": 12400, "stock_quantity": 250, "is_featured": False, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600"], "tags": ["powerbank", "accessories", "anker"], "short_description": "Ultra-high capacity portable charger", "specifications": {}, "variants": [], "is_active": True},
    {"id": 31, "name": "JBL Flip 6", "slug": "jbl-flip-6", "price": 11999, "original_price": 13999, "discount_percent": 14, "brand": "JBL", "category_id": 1, "rating": 4.7, "review_count": 4200, "stock_quantity": 85, "is_featured": False, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1589003071515-d8bf0a012ab6?w=600"], "tags": ["speaker", "audio", "jbl"], "short_description": "Portable waterproof Bluetooth speaker", "specifications": {}, "variants": [], "is_active": True},
    {"id": 32, "name": "Moleskine Classic Notebook", "slug": "moleskine-classic", "price": 1899, "original_price": 2199, "discount_percent": 13, "brand": "Moleskine", "category_id": 3, "rating": 4.8, "review_count": 6700, "stock_quantity": 300, "is_featured": False, "is_bestseller": True, "is_new": False, "images": ["https://images.unsplash.com/photo-1531346878377-a541e4a115fc?w=600"], "tags": ["notebook", "stationery"], "short_description": "Hard cover, large, ruled notebook", "specifications": {}, "variants": [], "is_active": True},
]


def get_products(
    db: Session,
    page: int = 1,
    page_size: int = 12,
    category_id: Optional[int] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    is_featured: Optional[bool] = None,
    sort_by: str = "created_at",
    min_rating: Optional[float] = None,
    availability: Optional[str] = None,
):
    """Return paginated product list with optional filters."""
    # Return mock data — replace with DB query when PostgreSQL is connected
    products = MOCK_PRODUCTS.copy()

    if category_id:
        products = [p for p in products if p.get("category_id") == category_id]
    if search:
        q = search.lower()
        products = [
            p for p in products
            if q in p["name"].lower()
            or q in " ".join(p.get("tags", [])).lower()
            or q in (p.get("brand") or "").lower()
            or q in (p.get("short_description") or "").lower()
        ]
    if min_price is not None:
        products = [p for p in products if p["price"] >= min_price]
    if max_price is not None:
        products = [p for p in products if p["price"] <= max_price]
    if is_featured is not None:
        products = [p for p in products if p.get("is_featured") == is_featured]
    if min_rating is not None:
        products = [p for p in products if p.get("rating", 0) >= min_rating]
    if availability == "in_stock":
        products = [p for p in products if p.get("stock_quantity", 0) > 0]
    elif availability == "on_sale":
        products = [p for p in products if p.get("discount_percent", 0) > 0]

    # Sorting
    if sort_by == "price_asc":
        products.sort(key=lambda p: p["price"])
    elif sort_by == "price_desc":
        products.sort(key=lambda p: p["price"], reverse=True)
    elif sort_by == "rating":
        products.sort(key=lambda p: p.get("rating", 0), reverse=True)
    elif sort_by == "name_asc":
        products.sort(key=lambda p: p["name"].lower())
    elif sort_by == "name_desc":
        products.sort(key=lambda p: p["name"].lower(), reverse=True)
    # default: created_at order (natural list order)

    total = len(products)
    start = (page - 1) * page_size
    items = products[start: start + page_size]
    total_pages = max(1, (total + page_size - 1) // page_size)
    return {"items": items, "total": total, "page": page, "page_size": page_size, "total_pages": total_pages}


def get_product_by_id(db: Session, product_id: int):
    product = next((p for p in MOCK_PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


def get_product_by_slug(db: Session, slug: str):
    product = next((p for p in MOCK_PRODUCTS if p["slug"] == slug), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


def get_featured_products(db: Session, limit: int = 8):
    return [p for p in MOCK_PRODUCTS if p.get("is_featured")][:limit]


def get_bestseller_products(db: Session, limit: int = 8):
    return [p for p in MOCK_PRODUCTS if p.get("is_bestseller")][:limit]


def get_new_arrivals(db: Session, limit: int = 8):
    return [p for p in MOCK_PRODUCTS if p.get("is_new")][:limit]


MOCK_CATEGORIES = [
    {"id": 1, "name": "Electronics", "slug": "electronics", "icon": "💻", "image_url": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400", "description": "Gadgets, devices & tech", "is_active": True},
    {"id": 2, "name": "Fashion", "slug": "fashion", "icon": "👗", "image_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400", "description": "Clothing, shoes & accessories", "is_active": True},
    {"id": 3, "name": "Furniture", "slug": "furniture", "icon": "🛋️", "image_url": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", "description": "Home & office furniture", "is_active": True},
    {"id": 4, "name": "Toys & Gaming", "slug": "toys", "icon": "🎮", "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", "description": "Games, toys & entertainment", "is_active": True},
]


def get_categories(db: Session):
    return MOCK_CATEGORIES
