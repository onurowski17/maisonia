const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maisonia';

const productSchema = new mongoose.Schema({
    id: Number,
    category: String,
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
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

const products = [
    {
        id: 1,
        category: 'blazer',
        name: 'Oversized Wool Blazer',
        description: 'Klasik ve şık oversized yün ceket',
        image: 'https://via.placeholder.com/300?text=Gucci+Blazer',
        expensive: {
            brand: 'Gucci',
            platform: 'Beymen',
            price: '12.500 TL',
            link: 'https://www.beymen.com',
            color: '#d32f2f'
        },
        cheap: [
            {
                brand: 'Mango',
                store: 'Trendyol',
                price: '599 TL',
                oldPrice: '899 TL',
                discount: '%33 İndirim',
                link: 'https://www.trendyol.com/mango'
            },
            {
                brand: 'Reserved',
                store: 'Hepsiburada',
                price: '549 TL',
                oldPrice: '799 TL',
                discount: '%31 İndirim',
                link: 'https://www.hepsiburada.com'
            }
        ]
    },
    {
        id: 2,
        category: 'dress',
        name: 'Black Satin Midi Dress',
        description: 'Siyah saten midi elbise, parti ve gece için ideal',
        image: 'https://via.placeholder.com/300?text=Zara+Dress',
        expensive: {
            brand: 'Zara',
            platform: 'Beymen',
            price: '1.299 TL',
            link: 'https://www.beymen.com',
            color: '#ff6f00'
        },
        cheap: [
            {
                brand: 'ASOS Design',
                store: 'Trendyol',
                price: '359 TL',
                oldPrice: '599 TL',
                discount: '%40 İndirim',
                link: 'https://www.trendyol.com'
            },
            {
                brand: 'Defacto',
                store: 'Defacto',
                price: '279 TL',
                oldPrice: '499 TL',
                discount: '%44 İndirim',
                link: 'https://www.defacto.com.tr'
            }
        ]
    },
    {
        id: 3,
        category: 'pants',
        name: 'High-Waist Wide Leg Pants',
        description: 'Yüksek bel geniş paça pantolon, ofis ve günlük kullanıma uygun',
        image: 'https://via.placeholder.com/300?text=Valentino+Pants',
        expensive: {
            brand: 'Valentino',
            platform: 'Beymen',
            price: '8.500 TL',
            link: 'https://www.beymen.com',
            color: '#d32f2f'
        },
        cheap: [
            {
                brand: 'H&M',
                store: 'H&M Online',
                price: '229 TL',
                oldPrice: '399 TL',
                discount: '%43 İndirim',
                link: 'https://www.hm.com/tr'
            },
            {
                brand: 'Zara',
                store: 'Zara Online',
                price: '279 TL',
                oldPrice: '499 TL',
                discount: '%44 İndirim',
                link: 'https://www.zara.com'
            }
        ]
    },
    {
        id: 4,
        category: 'blazer',
        name: 'Tailored Beige Blazer',
        description: 'Bej rengi kesimi yapılmış klasik ceket',
        image: 'https://via.placeholder.com/300?text=Prada+Blazer',
        expensive: {
            brand: 'Prada',
            platform: 'Beymen',
            price: '15.000 TL',
            link: 'https://www.beymen.com',
            color: '#d32f2f'
        },
        cheap: [
            {
                brand: 'Mango',
                store: 'Trendyol',
                price: '649 TL',
                oldPrice: '999 TL',
                discount: '%35 İndirim',
                link: 'https://www.trendyol.com/mango'
            },
            {
                brand: 'C&A',
                store: 'Hepsiburada',
                price: '449 TL',
                oldPrice: '699 TL',
                discount: '%36 İndirim',
                link: 'https://www.hepsiburada.com'
            }
        ]
    },
    {
        id: 5,
        category: 'shoes',
        name: 'White Leather Sneakers',
        description: 'Beyaz deri sneaker ayakkabı, her kombinle uyumlu',
        image: 'https://via.placeholder.com/300?text=Alexander+McQueen+Shoes',
        expensive: {
            brand: 'Alexander McQueen',
            platform: 'Beymen',
            price: '3.500 TL',
            link: 'https://www.beymen.com',
            color: '#d32f2f'
        },
        cheap: [
            {
                brand: 'Reebok',
                store: 'Trendyol',
                price: '299 TL',
                oldPrice: '499 TL',
                discount: '%40 İndirim',
                link: 'https://www.trendyol.com'
            },
            {
                brand: 'Nike',
                store: 'Hepsiburada',
                price: '349 TL',
                oldPrice: '649 TL',
                discount: '%46 İndirim',
                link: 'https://www.hepsiburada.com'
            }
        ]
    },
    {
        id: 6,
        category: 'dress',
        name: 'Floral Print Sundress',
        description: 'Çiçek desenli yazlık elbise',
        image: 'https://via.placeholder.com/300?text=Oscar+de+la+Renta+Dress',
        expensive: {
            brand: 'Oscar de la Renta',
            platform: 'Beymen',
            price: '5.999 TL',
            link: 'https://www.beymen.com',
            color: '#d32f2f'
        },
        cheap: [
            {
                brand: 'Koton',
                store: 'Koton',
                price: '199 TL',
                oldPrice: '399 TL',
                discount: '%50 İndirim',
                link: 'https://www.koton.com'
            },
            {
                brand: 'LC Waikiki',
                store: 'LC Waikiki',
                price: '149 TL',
                oldPrice: '299 TL',
                discount: '%50 İndirim',
                link: 'https://www.lcwaikiki.com/tr-TR/'
            }
        ]
    },
    {
        id: 7,
        category: 'blazer',
        name: 'Burgundy Velvet Blazer',
        description: 'Bordo kadife ceket, özel davetler için',
        image: 'https://via.placeholder.com/300?text=Burberry+Blazer',
        expensive: {
            brand: 'Burberry',
            platform: 'Beymen',
            price: '9.800 TL',
            link: 'https://www.beymen.com',
            color: '#d32f2f'
        },
        cheap: [
            {
                brand: 'Mango',
                store: 'Trendyol',
                price: '429 TL',
                oldPrice: '799 TL',
                discount: '%46 İndirim',
                link: 'https://www.trendyol.com'
            },
            {
                brand: 'Reserved',
                store: 'Hepsiburada',
                price: '399 TL',
                oldPrice: '699 TL',
                discount: '%43 İndirim',
                link: 'https://www.hepsiburada.com'
            }
        ]
    },
    {
        id: 8,
        category: 'pants',
        name: 'Cream Linen Trousers',
        description: 'Krem rengi keten pantolon, yaz için ideal',
        image: 'https://via.placeholder.com/300?text=Brunello+Cucinelli+Pants',
        expensive: {
            brand: 'Brunello Cucinelli',
            platform: 'Beymen',
            price: '7.200 TL',
            link: 'https://www.beymen.com',
            color: '#d32f2f'
        },
        cheap: [
            {
                brand: 'H&M',
                store: 'H&M Online',
                price: '249 TL',
                oldPrice: '449 TL',
                discount: '%44 İndirim',
                link: 'https://www.hm.com/tr'
            },
            {
                brand: 'Defacto',
                store: 'Defacto',
                price: '199 TL',
                oldPrice: '399 TL',
                discount: '%50 İndirim',
                link: 'https://www.defacto.com.tr'
            }
        ]
    },
    {
        id: 9,
        category: 'shoes',
        name: 'Black Patent Heels',
        description: 'Siyah patent deri topuk ayakkabı, ofis ve gece için',
        image: 'https://via.placeholder.com/300?text=Jimmy+Choo+Heels',
        expensive: {
            brand: 'Jimmy Choo',
            platform: 'Beymen',
            price: '4.500 TL',
            link: 'https://www.beymen.com',
            color: '#d32f2f'
        },
        cheap: [
            {
                brand: 'Aldo',
                store: 'Trendyol',
                price: '399 TL',
                oldPrice: '699 TL',
                discount: '%43 İndirim',
                link: 'https://www.trendyol.com'
            },
            {
                brand: 'Nine West',
                store: 'Hepsiburada',
                price: '349 TL',
                oldPrice: '649 TL',
                discount: '%46 İndirim',
                link: 'https://www.hepsiburada.com'
            }
        ]
    },
    {
        id: 10,
        category: 'dress',
        name: 'Striped Cotton Dress',
        description: 'Çizgili pamuk elbise, rahat ve şık',
        image: 'https://via.placeholder.com/300?text=Miu+Miu+Dress',
        expensive: {
            brand: 'Miu Miu',
            platform: 'Beymen',
            price: '6.500 TL',
            link: 'https://www.beymen.com',
            color: '#d32f2f'
        },
        cheap: [
            {
                brand: 'Koton',
                store: 'Koton',
                price: '159 TL',
                oldPrice: '349 TL',
                discount: '%54 İndirim',
                link: 'https://www.koton.com'
            },
            {
                brand: 'LC Waikiki',
                store: 'LC Waikiki',
                price: '129 TL',
                oldPrice: '279 TL',
                discount: '%54 İndirim',
                link: 'https://www.lcwaikiki.com/tr-TR/'
            }
        ]
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ MongoDB bağlantısı başarılı');
        
        // Eski verileri sil
        await Product.deleteMany({});
        console.log('🗑️  Eski veriler silindi');
        
        // Yeni verileri ekle
        const result = await Product.insertMany(products);
        console.log(`✅ ${result.length} ürün eklendi!`);
        
        await mongoose.disconnect();
        console.log('🔌 MongoDB bağlantısı kapatıldı');
        process.exit(0);
    } catch (error) {
        console.error('❌ Hata:', error);
        process.exit(1);
    }
};

seedDatabase();
