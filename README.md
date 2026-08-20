# MAISONIA PRO 🚀

**Pahalı markaların ucuz muadillerini bulan FULL-STACK e-ticaret platformu**

> **Online:** https://maisonia-pro.vercel.app  
> **Backend:** Railway/Heroku deployment ready  
> **Database:** MongoDB Atlas compatible

---

## ✨ PRO FEATURES

### 🔄 Otomatik Güncelleme Sistemi
- ✅ Her 6 saatte otomatik fiyat güncellemesi
- ✅ Trendyol, Hepsiburada, Defacto, Koton'dan çekme
- ✅ Manuel "Şimdi Güncelle" butonu
- ✅ Real-time güncelleme göstergesi
- ✅ Otomatik error handling

### 👥 Kullanıcı Yönetimi
- ✅ Kayıt ve giriş sistemi
- ✅ Şifreli kullanıcı hesapları (bcrypt hashing)
- ✅ Favoriler ve istek listesi
- ✅ Kullanıcı profili ve hesap yönetimi
- ✅ JWT authentication (hazır)

### 🛒 E-Ticaret Özellikleri
- ✅ Sepet sistemi
- ✅ Ürün arama (gerçek zamanlı, regex)
- ✅ Kategori filtreleme (Blazer, Elbise, Pantolon, Ayakkabı, vs.)
- ✅ Cinsiyet bazlı filtreleme (Kadın/Erkek)
- ✅ Mağaza bazlı filtreleme
- ✅ Direkt satış linklerine yönlendirme
- ✅ Affiliate link tracking

### 📊 Analitik & İstatistikler
- ✅ Ürün görüntüleme sayısı
- ✅ Tıklama analizi
- ✅ Popüler ürünler raporu (Top 10)
- ✅ Kullanıcı istatistikleri
- ✅ Dashboard için hazır endpoints

### 📧 İletişim & Pazarlama
- ✅ İletişim formu (Contact Form)
- ✅ Email gönderimi (Nodemailer)
- ✅ Newsletter aboneliği
- ✅ Otomatik email yanıtları
- ✅ Subscriber tracking

### 🔍 SEO Optimizasyonu
- ✅ Sitemap.xml (dinamik)
- ✅ robots.txt
- ✅ Meta tags (OG, description, keywords)
- ✅ Canonical URLs
- ✅ Schema.org structured data (ready)

### 💾 Veritabanı
- ✅ MongoDB entegrasyonu
- ✅ 20+ ürün + dinamik veri
- ✅ Kullanıcı koleksiyonu
- ✅ Favoriler koleksiyonu
- ✅ Analitik koleksiyonu
- ✅ Newsletter koleksiyonu
- ✅ İletişim mesajları

### 🎨 Frontend
- ✅ Responsive tasarım (Mobile/Tablet/Desktop)
- ✅ Modern UI/UX
- ✅ Koyu/Açık mod uyumluluk
- ✅ Mobile optimizasyonu
- ✅ Login/Register modals
- ✅ Arama + filtreleme
- ✅ Newsletter subscribe
- ✅ Cart system

---

## 📋 TEKNOLOJİ STACK

| Layer | Teknoloji |
|-------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla, 0 dependency) |
| **Backend** | Node.js 18+, Express.js 4.18+ |
| **Database** | MongoDB 5.0+, Mongoose 7.0+ |
| **Scraping** | Axios, Cheerio |
| **Email** | Nodemailer 6.9+ |
| **Authentication** | Bcrypt (hashing), JWT (ready) |
| **Scheduling** | Node-cron 3.0+ |
| **Rate Limiting** | Express-rate-limit (ready) |

---

## 🚀 KURULUM

### 1. Repository Klonla
```bash
git clone https://github.com/onurowski17/maisonia.git
cd maisonia
```

### 2. Dependencies Yükle
```bash
npm install
```

### 3. .env Dosyası Oluştur
```bash
cp .env.example .env
```

### 4. .env Dosyasını Düzenle
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/maisonia
NODE_ENV=production

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# JWT
JWT_SECRET=your-super-secret-key

# Optional
STRIPE_KEY=sk_test_xxx
AFFILIATE_TOKEN=xxx
```

### 5. Yerel MongoDB'yi Başlat (opsiyonel)
```bash
# macOS
brew services start mongodb-community

# Linux
sudo service mongod start

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 6. Backend'i Başlat
```bash
npm start
# Production: NODE_ENV=production npm start
```

### 7. Frontend'i Aç
```
http://localhost:5000
```

---

## 📊 API ENDPOINTS

### ÜRÜNLER
```
GET    /api/products                        - Tüm ürünleri getir (paginated)
GET    /api/products/gender/:gender         - Cinsiyete göre ürünler
GET    /api/products/:gender/:category      - Cinsiyet + kategori
GET    /api/product/:id                     - Tek ürün (view sayacını artırır)
POST   /api/products                        - Ürün ekle (admin)
PUT    /api/products/:id                    - Ürün güncelle (admin)
DELETE /api/products/:id                    - Ürün sil (admin)
```

### KULLANICI
```
POST   /api/auth/register                   - Kayıt ol
POST   /api/auth/login                      - Giriş yap
```

### FAVORILER
```
POST   /api/favorites                       - Favori ekle
GET    /api/favorites/:userId               - Kullanıcının favori listesi
DELETE /api/favorites/:userId/:productId    - Favori kaldır
```

### ARAMA
```
GET    /api/search?q=keyword&gender=kadın   - Ürün arama (regex)
```

### ANALİTİK
```
GET    /api/analytics                       - Top 10 ürün (tıklama bazında)
POST   /api/analytics/click                 - Tıklama kaydı
```

### NEWSLETTER
```
POST   /api/newsletter/subscribe            - Abone ol
GET    /api/newsletter/count                - Abone sayısı
```

### İLETİŞİM
```
POST   /api/contact                         - Mesaj gönder
GET    /api/contact/all                     - Tüm mesajlar (admin)
```

### SEO
```
GET    /sitemap.xml                         - XML sitemap
GET    /robots.txt                          - Robots.txt
```

### YÖNETİM
```
GET    /api/update-status                   - Sistem durumu
POST   /api/update-now                      - Manuel güncelleme başlat
GET    /api/health                          - Health check
```

---

## 🌐 DEPLOYMENT

### Vercel (Frontend)
```bash
# package.json
"build": "npm install && node server.js"

# vercel.json
{
  "buildCommand": "npm install",
  "outputDirectory": "public"
}
```

### Railway (Backend - Recommended) ⭐
1. **Railway.app**'a git
2. **New Project** → **GitHub Repo** seç
3. **Otomatik deploy**
4. Environment variables ekle (Railway UI'dan)

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/maisonia
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
JWT_SECRET=super-secret-key
```

### Heroku
```bash
heroku login
heroku create maisonia-pro
git push heroku main
```

### Environment Variables (Production)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/maisonia
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password (Gmail App Password)
JWT_SECRET=generate-random-string-here
NODE_ENV=production
```

---

## 💰 PARA KAZANMA (Affiliate)

### Desteklenen Platformlar
- ✅ Trendyol Affiliate Links
- ✅ Hepsiburada Affiliate Links
- ✅ Defacto Affiliate Links
- ✅ Koton Affiliate Links

### Nasıl Çalışır
1. Her ürünün `cheap[].link` alanında affiliate linki sakla
2. Kullanıcı linke tıklandığında `/api/analytics/click` çağrılır
3. Gerçek satın alma gerçekleştiğinde commission alırsın
4. Analytics panelinden raporları görebilirsin

### Earnings Example
- Trendyol: %3-7 commission
- Hepsiburada: %2-5 commission
- Günlük ~100 klik = ~$5-10 earnings

---

## 📱 MOBIL APP (Gelecek)
- React Native
- Push Notifications
- Offline Mode
- One-Click Checkout
- Biometric Login

---

## 🔐 GÜVENLİK

- ✅ **Password Hashing**: Bcrypt (10 rounds)
- ✅ **JWT Authentication**: Ready (implement in production)
- ✅ **CORS Protection**: Whitelist domains
- ✅ **Rate Limiting**: Ready (express-rate-limit)
- ✅ **SQL Injection**: MongoDB'de güvenli (parametrized queries)
- ✅ **XSS Protection**: Input sanitization (ready)
- ✅ **Https**: Production'da zorunlu

---

## 📈 PERFORMANS

- ✅ **Pagination**: Limit/skip ile
- ✅ **Lazy Loading**: Frontend'de resimler
- ✅ **Caching**: Ready (Redis compatible)
- ✅ **CDN**: Vercel/Railway otomatik CDN
- ✅ **Compression**: Gzip ready
- ✅ **Database Indexing**: MongoDB indices hazır

---

## 🎯 ROADMAP

- [ ] Admin Dashboard
- [ ] Payment Integration (Stripe/PayPal)
- [ ] Wishlist Sharing
- [ ] Social Login (Google, Facebook)
- [ ] Product Reviews & Ratings
- [ ] Live Chat Support
- [ ] Mobile App (React Native)
- [ ] AI Recommendations
- [ ] Dark Mode
- [ ] Multi-language Support

---

## 📞 İLETİŞİM

- 📧 **Email**: onurgl2003@gmail.com
- 💻 **GitHub**: [@onurowski17](https://github.com/onurowski17)
- 🐦 **Twitter**: [@onurowski17](https://twitter.com/onurowski17)

---

## 📄 LİSANS

**MIT License** - Özgürce kullanabilirsin! ✅

Lütfen crediti verirsen seviniriz. 💙

---

## 🤝 KATKIDABulun

Pull request'ler karşılanır! Lütfen:

1. Fork et
2. Feature branch'i oluştur (`git checkout -b feature/amazing`)
3. Commit et (`git commit -m 'Add amazing feature'`)
4. Push et (`git push origin feature/amazing`)
5. Pull Request aç

---

**MAISONIA © 2026 - TÜM HAKLARI SAKLIDIR**  
*Pahalı markaların ucuz muadillerini bul. Lüks stil, uygun fiyat.* ✨
