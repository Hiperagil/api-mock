import { Router } from "express";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         login:
 *           type: string
 *         senha:
 *           type: string
 *         celular:
 *           type: string
 *         email:
 *           type: string
 *         status:
 *           type: string
 *         role:
 *           type: string
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - nome
 *         - login
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *         login:
 *           type: string
 *         senha:
 *           type: string
 *         celular:
 *           type: string
 *         email:
 *           type: string
 *         status:
 *           type: string
 *         role:
 *           type: string
 */

/**
 * @swagger
 * /v1/usuarios:
 *   get:
 *     summary: Lista todos usuários
 *     tags: [Usuários]
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/UsuarioInput'
 *               - type: object
 *                 properties:
 *                   id:
 *                     type: integer
 */

/**
 * @swagger
 * /v1/usuarios/{id}:
 *   get:
 *     summary: Busca por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */

let usuarios = [];

router.get("/", (req, res) => {
  res.json(usuarios);
});

router.get("/:id", (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(usuario);
});

router.post("/", (req, res) => {
  const novo = { id: usuarios.length + 1, ...req.body };
  usuarios.push(novo);
  res.status(201).json(novo);
});

router.put("/", (req, res) => {
  const usuario = usuarios.find(u => u.id == req.body.id);
  if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

  Object.assign(usuario, req.body);
  res.json(usuario);
});

export default router;
