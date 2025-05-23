const express = require('express');
const router = express.Router();
const RecordingController = require('../controllers/recording.controller');
const { auth, verifyTokenForPages } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Routes API pour les enregistrements
// =================================================================

// Récupérer tous les enregistrements de l'utilisateur
router.get('/', auth, RecordingController.getAll);

// Récupérer les enregistrements partagés avec l'utilisateur
router.get('/shared', auth, RecordingController.getSharedWithMe);

// Récupérer un enregistrement spécifique
router.get('/:id', auth, RecordingController.getOne);

// Récupérer l'audio d'un enregistrement (stream)
router.get('/:id/stream', verifyTokenForPages, RecordingController.stream);

// Générer une signature pour accéder à un enregistrement partagé
router.get('/:id/signature', auth, RecordingController.generateSignature);

// Créer un nouvel enregistrement (simulé pour le moment)
router.post('/', auth, RecordingController.create);

// Mettre à jour un enregistrement
router.put('/:id', auth, RecordingController.update);

// Supprimer un enregistrement (simulé pour le moment)
router.delete('/:id', auth, RecordingController.delete);

// Partager un enregistrement (simulé pour le moment)
router.post('/:id/share', auth, RecordingController.share);

// Upload sécurisé d'un enregistrement audio
router.post('/upload', auth, upload.single('audio'), RecordingController.create);

module.exports = router; 