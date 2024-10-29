const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const User = require("./models/data");
const Produit = require("./models/pruduit");
const PrestationsAvicoles = require("./models/PrestationsAvicoles");
const PrestationsViticoles = require("./models/PrestationsViticoles");
const DératisationDésinsectisation = require("./models/Dératisation_Désinsectisation");
const NettoyageEtDésinfection = require("./models/Nettoyage_et_Désinfection");
const RamassageDeVolailles = require("./models/Ramassage_de_volailles");
const TravauxManuels = require("./models/Travaux_manuels");
const VaccinationDeVolailles = require("./models/Vaccination_de_Volailles");
const Vendanges = require("./models/Vendanges");
const TravauxMécaniques = require("./models/Travaux_mécaniques");
const TailleDesVignes = require("./models/Taille_des_vignes");
const Panier = require("./models/panier");

const app = express();
const port = 3000||process.env.PORT;

const compression=require("compression");
app.use(compression());

// Middleware
app.use(cors({
  origin: '*', // هذا سيسمح بجميع النطاقات
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://bringa609:iW3bdAzeOggOBoGM@cluster0.338ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Route to add a user with image upload
app.post("/users", upload.single('img'), (req, res) => {
  const { selectCategory, email } = req.body;
  const img = req.file ? req.file.buffer.toString('base64') : null;

  let targetCollection;

  // Determine target collection based on the selected category
  switch (selectCategory) {
    case 'Ramassage de volailles':
    case 'Vaccination de Volailles':
    case 'Nettoyage et Désinfection de bâtiments':
    case 'Dératisation Désinsectisation':
      targetCollection = PrestationsAvicoles;
      break;
    case 'Chargement':
    case 'Déchargement':
    case 'Mise en place et transfert de poulettes':
      targetCollection = RamassageDeVolailles;
      break;
    case 'Vaccination (simple et double)':
    case 'Seringues de différents dosage':
      targetCollection = VaccinationDeVolailles;
      break;
    case 'Nettoyage':
    case 'Désinfection':
    case 'Dépoussiérage':
    case 'Hrattage':
    case 'Balayage':
    case 'Soufflage':
      targetCollection = NettoyageEtDésinfection;
      break;
    case 'Lutte anti-rongeur':
    case 'Lutte anti-insectes':
    case 'Lutte anti-bactéries, virus et champignons':
      targetCollection = DératisationDésinsectisation;
      break;
    case 'Travaux manuels':
    case 'Travaux mécaniques':
    case 'Taille des vignes':
    case 'Vendanges':
      targetCollection = PrestationsViticoles;
      break;
    case 'Instalation des parcelles viticoles':
    case 'Cisaillage des plantations et entre plantation':
    case 'Taille des vignes1':
    case 'Liage des bois':
    case 'Ebourgeonnage des vignes':
      targetCollection = TravauxManuels;
      break;
    case 'Rognage et effeuillage mécanique des vignes':
    case 'Ramassage des pierres dans les parcelles':
    case 'Broyage des bois de taille':
    case 'Épandage d engrais':
    case 'Tontes':
      targetCollection = TravauxMécaniques;
      break;
    case 'Taille des vignes description':
      targetCollection = TailleDesVignes;
      break;
    case 'Effeuillage':
    case 'Cueillette':
    case 'Cueillette et débardage':
    case 'Livraison à un centre de pressurage':
    case 'Fourniture de caisses':
      targetCollection = Vendanges;
      break;
    default:
      return res.status(400).send("Invalid category");
  }

  const newUser = new targetCollection({ selectCategory, email, img });
  newUser.save()
    .then(() => res.status(201).send("User created"))
    .catch((err) => {
      console.error("Error saving user:", err);
      res.status(500).send("An error occurred while saving the user: " + err.message);
    });
});

// Route to add a product with image upload
app.post('/produits', upload.single('img'), (req, res) => {
  const { titre, prix } = req.body;

  const newProduit = new Produit({
    titre,
    prix,
    img: req.file ? req.file.buffer.toString('base64') : '',
  });

  newProduit.save()
    .then(() => res.status(201).send("Produit created"))
    .catch((err) => {
      console.error("Error saving product:", err);
      res.status(500).send("An error occurred while saving the product: " + err.message);
    });
});

// Endpoint to save product IDs
app.post('/panier', async (req, res) => {
  try {
    const { name, email, phone, items } = req.body; // استلام الاسم، البريد، رقم الهاتف والعناصر

    // إنشاء سجل جديد يتضمن الحقول الجديدة
    const panierRecord = new Panier({ 
      name, 
      email, 
      phone, 
      items // تخزين العناصر هنا بدلاً من المعرفات فقط
    });

    await panierRecord.save(); // حفظ السجل في قاعدة البيانات

    console.log('Received products:', items, 'with name:', name, 'email:', email, 'phone:', phone); // سجل المعلومات في وحدة التحكم
    res.status(201).send({ message: 'تم حفظ معرفات المنتجات بنجاح' }); // إرسال رسالة النجاح
  } catch (error) {
    console.error("حدث خطأ:", error); // سجل الخطأ في وحدة التحكم
    res.status(500).send({ error: 'حدث خطأ أثناء حفظ البيانات: ' + error.message }); // إرسال رسالة الخطأ
  }
});

// Endpoint to get the first product for each person
app.get("/panier/produits", async (req, res) => {
  try {
    const paniers = await Panier.find();
    const productIds = paniers.flatMap(p => p.items.map(item => item.id)); // استخرج كل معرفات المنتجات

    const products = await Produit.find({ _id: { $in: productIds } }); // استرجع المنتجات باستخدام المعرفات

    const filteredOrders = paniers.map(p => {
      const firstProduct = p.items[0]; // الحصول على أول منتج
      const product = products.find(prod => prod._id.toString() === firstProduct.id); // العثور على المنتج

      return product ? {
        personId: p._id,
        personName: p.name,
        productId: product._id,
        productImage: product.img // تأكد أن الصورة موجودة في الـ product
      } : null;
    }).filter(order => order !== null);

    res.status(200).json(filteredOrders);
  } catch (error) {
    console.error("حدث خطأ:", error);
    res.status(500).send({ error: 'حدث خطأ أثناء جلب البيانات: ' + error.message });
  }
});




// نقطة النهاية لحذف المنتج
app.delete('/produits/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedProduct = await Produit.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Fetch person details including email and phone based on personId
app.get('/person/:personId', async (req, res) => {
  const personId = req.params.personId;

  try {
      const person = await Panier.findById(personId);

      if (!person) {
          return res.status(404).send("No person found for this personId");
      }

      // إعادة بيانات الشخص بما في ذلك الاسم والبريد الإلكتروني ورقم الهاتف
      res.json({
          name: person.name,
          email: person.email,
          phone: person.phone
      });
  } catch (error) {
      console.error("Error fetching person:", error);
      res.status(500).send("Error fetching person: " + error.message);
  }
});




// Fetch products based on personId
app.get('/panier/products/:personId', async (req, res) => {
  const personId = req.params.personId;

  try {
      const panier = await Panier.findById(personId);

      if (!panier) {
          return res.status(404).send("No panier found for this personId");
      }

      // استخراج المعرفات والكميات من items
      const products = panier.items.map(item => ({
          id: item.id,
          quantity: item.quantity
      }));

      // جلب تفاصيل المنتجات بناءً على المعرفات
      const productDetails = await Produit.find({ _id: { $in: products.map(p => p.id) } });

      // إرجاع تفاصيل الشخص والمنتجات مع الكميات
      res.json({
          name: panier.name,
          email: panier.email,
          phone: panier.phone,
          products: products.map(product => ({
              ...product,
              details: productDetails.find(p => p._id.toString() === product.id)
          }))
      });
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Error fetching products: " + error.message);
  }
});


// Fetch all users
app.get("/users", (req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching users:", err);
      res.status(500).send("Error fetching users: " + err.message);
    });
});

// نقطة النهاية لحذف الطلب
// نقطة النهاية لحذف الطلب


// Fetch all products
app.get("/produits", (req, res) => {
  Produit.find()
    .then(produits => res.status(200).json(produits))
    .catch(err => {
      console.error("Error fetching produits:", err);
      res.status(500).send("Error fetching produits: " + err.message);
    });
});

// Fetch all prestations avicoles
app.get("/prestations-avicoles", (req, res) => {
  PrestationsAvicoles.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching prestations avicoles:", err);
      res.status(500).send("Error fetching prestations avicoles: " + err.message);
    });
});

// Fetch all Ramassage de volailles
app.get("/ramassage-de-volailles", (req, res) => {
  RamassageDeVolailles.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching ramassage de volailles:", err);
      res.status(500).send("Error fetching ramassage de volailles: " + err.message);
    });
});

// Fetch all Prestations Viticoles
app.get("/prestations-viticoles", (req, res) => {
  PrestationsViticoles.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching prestations viticoles:", err);
      res.status(500).send("Error fetching prestations viticoles: " + err.message);
    });
});

// Fetch all Dératisation Désinsectisation
app.get("/deratisation-desinsectisation", (req, res) => {
  DératisationDésinsectisation.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching dératisation désinsectisation:", err);
      res.status(500).send("Error fetching dératisation désinsectisation: " + err.message);
    });
});

// Fetch all Nettoyage et Désinfection
app.get("/nettoyage-et-desinfection", (req, res) => {
  NettoyageEtDésinfection.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching nettoyage et désinfection:", err);
      res.status(500).send("Error fetching nettoyage et désinfection: " + err.message);
    });
});

// Fetch all Travaux Manuels
app.get("/travaux-manuels", (req, res) => {
  TravauxManuels.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching travaux manuels:", err);
      res.status(500).send("Error fetching travaux manuels: " + err.message);
    });
});

// Fetch all Vaccination de Volailles
app.get("/vaccination-de-volailles", (req, res) => {
  VaccinationDeVolailles.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching vaccination de volailles:", err);
      res.status(500).send("Error fetching vaccination de volailles: " + err.message);
    });
});

// Fetch all Vendanges
app.get("/vendanges", (req, res) => {
  Vendanges.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching vendanges:", err);
      res.status(500).send("Error fetching vendanges: " + err.message);
    });
});

// Fetch all Travaux Mécaniques
app.get("/travaux-mecaniques", (req, res) => {
  TravauxMécaniques.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching travaux mécaniques:", err);
      res.status(500).send("Error fetching travaux mécaniques: " + err.message);
    });
});

// Fetch all Taille des Vignes
app.get("/taille-des-vignes", (req, res) => {
  TailleDesVignes.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error("Error fetching taille des vignes:", err);
      res.status(500).send("Error fetching taille des vignes: " + err.message);
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
