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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express.Router();
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsId = parseInt(req.params.id, 10);
        const posts = yield prisma.post.findUnique({ where: { id: postsId } });
        if (!posts) {
            res.status(404).json({ error: 'Post not found' });
        }
        else {
            res.json(posts);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany();
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, userId } = req.body;
    try {
        const newPost = yield prisma.post.create({
            data: {
                title,
                content,
                userId
            },
        });
        res.json(newPost);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create posts' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postsId = parseInt(req.params.id, 10);
    const { title, content, userId } = req.body;
    try {
        const updatedPost = yield prisma.post.update({
            where: { id: postsId },
            data: {
                title,
                content,
                userId
            },
        });
        res.json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update posts' });
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postsId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    try {
        const patchedPost = yield prisma.post.update({
            where: { id: postsId },
            data: {
                title,
                content,
            },
        });
        res.json(patchedPost);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to patch posts' });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postsId = parseInt(req.params.id, 10);
    try {
        yield prisma.post.delete({ where: { id: postsId } });
        res.json({ message: 'Post deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete posts' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.query;
        const posts = yield prisma.post.findMany({
            where: Object.assign(Object.assign({}, (title && { title: { contains: title.toString() } })), (content && { content: { contains: content.toString() } })),
        });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}));
exports.default = router;
