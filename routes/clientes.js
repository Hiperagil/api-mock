import { Router } from "express";
const router = Router();

let clientes = [
  {
    id: 1,
    nome: "João da Silva",
    cpf: "123.456.789-00",
    telefone: "(61) 99999-0000",
    email: "joao@email.com",
    plano: "Plano Família",
    perfil: "Conservador"
  }
];

/**
 * @swagger
 * /v1/clientes:
 *   get:
 *     summary: Lista todos os clientes
 */
router.get("/", (req, res) => res.json(clientes));

/**
 * @swagger
 * /v1/clientes/{id}:
 *   get:
 *     summary: Obtém cliente por ID
 */
router.get("/:id", (req, res) => {
  const cliente = clientes.find(c => c.id == req.params.id);
  if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
  res.json(cliente);
});

/**
 * @swagger
 * /v1/clientes:
 *   post:
 *     summary: Cria novo cliente
 */
router.post("/", (req, res) => {
  const novo = { id: clientes.length + 1, ...req.body };
  clientes.push(novo);
  res.status(201).json(novo);
});

/**
 * @swagger
 * /v1/clientes:
 *   put:
 *     summary: Atualiza cliente existente
 */
router.put("/", (req, res) => {
  const cliente = clientes.find(c => c.id == req.body.id);
  if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

  Object.assign(cliente, req.body);
  res.json(cliente);
});

export default router;
