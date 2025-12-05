import { Router } from "express";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         cpf:
 *           type: string
 *         telefone:
 *           type: string
 *         email:
 *           type: string
 *         plano:
 *           type: string
 *         perfil:
 *           type: string
 *     ClienteInput:
 *       type: object
 *       required:
 *         - nome
 *         - cpf
 *       properties:
 *         nome:
 *           type: string
 *         cpf:
 *           type: string
 *         telefone:
 *           type: string
 *         email:
 *           type: string
 *         plano:
 *           type: string
 *         perfil:
 *           type: string
 */

/**
 * @swagger
 * /v1/clientes:
 *   get:
 *     summary: Lista todos clientes
 *     tags: [Clientes]
 *   post:
 *     summary: Cria novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *   put:
 *     summary: Atualiza cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/ClienteInput'
 *               - type: object
 *                 properties:
 *                   id:
 *                     type: integer
 */

/**
 * @swagger
 * /v1/clientes/{id}:
 *   get:
 *     summary: Busca cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */

let clientes = [];

router.get("/", (req, res) => {
  res.json(clientes);
});

router.get("/:id", (req, res) => {
  const cliente = clientes.find(c => c.id == req.params.id);
  if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
  res.json(cliente);
});

router.post("/", (req, res) => {
  const novo = { id: clientes.length + 1, ...req.body };
  clientes.push(novo);
  res.status(201).json(novo);
});

router.put("/", (req, res) => {
  const cliente = clientes.find(c => c.id == req.body.id);
  if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

  Object.assign(cliente, req.body);
  res.json(cliente);
});

export default router;
