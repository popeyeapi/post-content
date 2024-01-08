"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const fetch = require('node-fetch');
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.json(user);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            console.log("test", response);
            throw new Error('Failed to fetch data');
        }
        const users = yield response.json();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const userData = {
        name: '',
        username: '',
        email: '',
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        lat: '',
        lng: '',
        phone: '',
        website: '',
        companyName: '',
        catchPhrase: '',
        bs: ''
    };
    if (name)
        userData.name = name;
    if (email)
        userData.email = email;
    try {
        const newUser = yield prisma.user.create({
            data: userData
        });
        res.json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    const userData = {};
    if (name)
        userData.name = name;
    if (email)
        userData.email = email;
    try {
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: userData, // Pass the constructed object here
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    try {
        const patchedUser = yield prisma.user.update({
            where: { id: userId },
            data: {
                name,
                email,
            },
        });
        res.json(patchedUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to patch user' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id, 10);
    try {
        yield prisma.user.delete({ where: { id: userId } });
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.query;
        const users = yield prisma.user.findMany({
            where: Object.assign(Object.assign({}, (name && { name: { contains: name.toString() } })), (email && { email: { contains: email.toString() } })),
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}));
exports.default = router;
