const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { startAutoUpdate } = require('./scraper');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Bağlantısı
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maisonia';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB bağlantısı başarılı'))
.catch(err => console.error('❌ MongoDB bağlantı hatası:', err));

// ============ ŞEMALAR ============
const productSchema = new mongoose.Schema({
    id: Number,
    category: String,
    gender: String,
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
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true },
    wishlist: [Number],
    notifications: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const favoriteSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    productId: Number,
    createdAt: { type: Date, default: Date.now }
});

const analyticsSchema = new mongoose.Schema({
    productId: Number,
    clicks: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const newsletterSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Favorite = mongoose.model('Favorite', favoriteSchema);
const Analytics = mongoose.model('Analytics', analyticsSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// ============ EMAIL KONFİGÜRASYONU ============
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
});

// ============ ÜRÜN API'LERİ ============
app.get('/api/products', async (req, res) => {
    try {
        const { limit = 20, skip = 0, sort = '-lastUpdated' } = req.query;
        const products = await Product.find()
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort(sort);
        const total = await Product.countDocuments();
        res.json({ products, total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/gender/:gender', async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;
        const products = await Product.find({ gender: req.params.gender })
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort({ lastUpdated: -1 });
        const total = await Product.countDocuments({ gender: req.params.gender });
        res.json({ products, total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/:gender/:category', async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query;
        const products = await Product.find({
            gender: req.params.gender,
            category: req.params.category
        }).limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort({ lastUpdated: -1 });
        const total = await Product.countDocuments({
            gender: req.params.gender,
            category: req.params.category
        });
        res.json({ products, total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) return res.status(404).json({ message: 'Ürün bulunamadı' });
        
        product.views = (product.views || 0) + 1;
        await product.save();
        
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!product) return res.status(404).json({ message: 'Ürün bulunamadı' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.params.id });
        if (!product) return res.status(404).json({ message: 'Ürün bulunamadı' });
        res.json({ message: 'Ürün silindi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ KULLANICI API'LERİ ============
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            username
        });
        
        await user.save();
        res.status(201).json({ message: 'Kayıt başarılı', userId: user._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Hatalı şifre' });
        
        res.json({ message: 'Giriş başarılı', userId: user._id, username: user.username });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ============ FAVORILER ============
app.post('/api/favorites', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const favorite = new Favorite({ userId, productId });
        await favorite.save();
        res.status(201).json(favorite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/favorites/:userId', async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.params.userId });
        const productIds = favorites.map(f => f.productId);
        const products = await Product.find({ id: { $in: productIds } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/favorites/:userId/:productId', async (req, res) => {
    try {
        await Favorite.findOneAndDelete({
            userId: req.params.userId,
            productId: req.params.productId
        });
        res.json({ message: 'Favori silindi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ ANALİTİKS ============
app.get('/api/analytics', async (req, res) => {
    try {
        const analytics = await Analytics.aggregate([
            {
                $group: {
                    _id: '$productId',
                    totalClicks: { $sum: '$clicks' },
                    totalViews: { $sum: '$views' },
                    lastUpdate: { $max: '$date' }
                }
            },
            { $sort: { totalClicks: -1 } },
            { $limit: 10 }
        ]);
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/analytics/click', async (req, res) => {
    try {
        const { productId } = req.body;
        let analytic = await Analytics.findOne({ productId });
        
        if (analytic) {
            analytic.clicks += 1;
            await analytic.save();
        } else {
            analytic = new Analytics({ productId, clicks: 1 });
            await analytic.save();
        }
        
        res.json(analytic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ İLETİŞİM FORMU ============
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const contact = new Contact({ name, email, message });
        await contact.save();
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'MAISONIA - İletişim Formu Alındı',
            html: `
                <h2>Merhaba ${name}!</h2>
                <p>Mesajınız başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>
                <p><strong>Mesajınız:</strong> ${message}</p>
                <br>
                <p>Saygılarımızla,<br>MAISONIA Ekibi</p>
            `
        });
        
        res.status(201).json({ message: 'Mesaj gönderildi' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ============ ARAMA ============
app.get('/api/search', async (req, res) => {
    try {
        const { q, gender } = req.query;
        let query = {
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { 'expensive.brand': { $regex: q, $options: 'i' } }
            ]
        };
        
        if (gender) {
            query.gender = gender;
        }
        
        const products = await Product.find(query).limit(20);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ NEWSLETTER ============
app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        const subscriber = new Newsletter({ email });
        await subscriber.save();
        
        res.status(201).json({ message: 'Abonelik başarılı' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/newsletter/count', async (req, res) => {
    try {
        const count = await Newsletter.countDocuments();
        res.json({ subscribers: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ GÜNCELLEME STATÜSÜ ============
app.get('/api/update-status', async (req, res) => {
    try {
        const lastProduct = await Product.findOne().sort({ lastUpdated: -1 });
        res.json({
            lastUpdate: lastProduct ? lastProduct.lastUpdated : 'Hiç güncellenmedi',
            totalProducts: await Product.countDocuments(),
            totalUsers: await User.countDocuments(),
            subscribers: await Newsletter.countDocuments()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/update-now', async (req, res) => {
    const { updateProductPrices } = require('./scraper');
    try {
        updateProductPrices().then(() => {
            res.json({ message: 'Güncelleme başlatıldı' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ SAĞLIK KONTROLÜ ============
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Sunucu çalışıyor', timestamp: new Date() });
});

// ============ SITEMAP ============
app.get('/sitemap.xml', async (req, res) => {
    try {
        const products = await Product.find();
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>http://localhost:5000</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
    </url>
    ${products.map(p => `
    <url>
        <loc>http://localhost:5000/product/${p.id}</loc>
        <lastmod>${p.lastUpdated.toISOString()}</lastmod>
        <priority>0.8</priority>
    </url>
    `).join('')}
</urlset>`;
        res.header('Content-Type', 'application/xml');
        res.send(sitemap);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ============ ROBOTS.TXT ============
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Sitemap: http://localhost:5000/sitemap.xml`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
    console.log('✅ MAISONIA PRO EDITION');
    console.log('📊 Features: Users, Favorites, Analytics, Newsletter, Email, Search, SEO');
    console.log('🔄 Otomatik güncelleme sistemi başlatılıyor...');
    
    startAutoUpdate();
});