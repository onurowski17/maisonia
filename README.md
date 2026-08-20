# MAISONIA 🛍️

Pahalı markaların ucuz muadillerini bulan e-ticaret karşılaştırma sitesi.

## Özellikler

✅ **10+ Ürün** - Gucci, Prada, Valentino vs. lüks markaların ucuz alternatifleri
✅ **Dinamik API** - Node.js + Express + MongoDB
✅ **Filtreleme Sistemi** - Kategori ve mağazaya göre filtrele
✅ **Responsive Design** - Mobil uyumlu tasarım
✅ **Doğrudan Linkler** - Trendyol, H&M, Zara, Hepsiburada ve daha fazlası

## Teknoloji Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Netlify (Frontend), Heroku/Railway (Backend)

## Kurulum

### 1. Repository'i klonla
```bash
git clone https://github.com/onurowski17/maisonia.git
cd maisonia
```

### 2. Dependencies'i yükle
```bash
npm install
```

### 3. Environment dosyası oluştur
```bash
cp .env.example .env
```

`.env` dosyasını düzenle:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/maisonia
NODE_ENV=development
```

### 4. Veritabanını hazırla
MongoDB'yi çalıştır ve verileri yükle:
```bash
node seedData.js
```

### 5. Sunucuyu başlat
```bash
npm start
```

Tarayıcıda açın: `http://localhost:5000`

## API Endpoints

### Ürünleri Getir
```
GET /api/products
```

### Kategoriye Göre Filtrele
```
GET /api/products/category/:category
```

### Tek Ürün Getir
```
GET /api/products/:id
```

### Yeni Ürün Ekle
```
POST /api/products
Content-Type: application/json

{
  "id": 11,
  "category": "dress",
  "name": "Siyah Elbise",
  "description": "Şık siyah elbise",
  "expensive": {
    "brand": "Dolce & Gabbana",
    "platform": "Beymen",
    "price": "8.000 TL",
    "link": "https://www.beymen.com",
    "color": "#d32f2f"
  },
  "cheap": [...]
}
```

### Ürün Güncelle
```
PUT /api/products/:id
```

### Ürün Sil
```
DELETE /api/products/:id
```

## Deployment

### Frontend - Netlify
1. GitHub'a push et
2. Netlify'a bağlan
3. Build command: `npm install`
4. Publish directory: `public`

### Backend - Heroku/Railway
```bash
git push heroku main
```

## Veritabanı Yapısı

```javascript
{
  id: Number,
  category: String, // blazer, dress, pants, shoes
  name: String,
  description: String,
  image: String,
  expensive: {
    brand: String,
    platform: String,
    price: String,
    link: String,
    color: String
  },
  cheap: [
    {
      brand: String,
      store: String,
      price: String,
      oldPrice: String,
      discount: String,
      link: String
    }
  ],
  createdAt: Date
}
```

## Mağazalar

- 🏬 Beymen
- 🛒 Trendyol
- 📦 Hepsiburada
- 👗 Zara
- 👔 H&M
- 🏪 Koton
- 🌺 LC Waikiki
- 🎨 Defacto
- 👠 ASOS
- 🎀 Reserved

## Lisans

MIT License - Özgürce kullanabilirsin!

## İletişim

📧 Email: onurgl2003@gmail.com
💻 GitHub: @onurowski17

---

**MAISONIA** © 2026 - Tüm Hakları Saklıdır
