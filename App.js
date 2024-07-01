const { MongoClient } = require('mongodb');
require('dotenv').config();

// Assurez-vous que l'URL de connexion MongoDB est définie dans les variables d'environnement
const mongoUrl = process.env.MONGO_URL; // Vérifiez que la variable d'environnement est bien définie
if (!mongoUrl) {
  console.error('La variable d\'environnement MONGO_URL n\'est pas définie.');
  process.exit(1); // Arrête le processus si l'URL n'est pas définie
}

const client = new MongoClient(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    // Se connecter au client MongoDB
    await client.connect();
    console.log('Connexion réussie à MongoDB!');

    // Sélectionner la base de données et la collection
    const db = client.db('myTask');
    const collection = db.collection('documents');

    // Exemple d'opération : insérer un document dans la collection
    const result = await collection.insertOne({ name: 'Alice', age: 25 });
    console.log(`Document inséré avec l'ID : ${result.insertedId}`);

    return 'Opération terminée avec succès!';
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB:', error);
    throw error; // Propager l'erreur pour la gestion ultérieure
  }
}

// Exécuter la fonction principale et gérer les promesses
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
