import { Router } from "express";
const router = Router();

let usuarios = [
  {
    id: 1,
    nome: "João Silva",
    login: "joao.silva",
    senha: "123456",
    celular: "(61) 99999-0001",
    email: "joao@empresa.com",
    status: "A",
    role: "Supervisor",
  }
];

/**
 * @swagger
 * /v1/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/", (req, res) => res.json(usuarios));

/**
 * @swagger
 * /v1/usuarios/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Usuário encontrado
 */
router.get("/:id", (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(usuario);
});

/**
 * @swagger
 * /v1/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 */
router.post("/", (req, res) => {
  const novo = { id: usuarios.length + 1, ...req.body };
  usuarios.push(novo);
  res.status(201).json(novo);
});

/**
 * @swagger
 * /v1/usuarios:
 *   put:
 *     summary: Atualiza um usuário existente
 */
router.put("/", (req, res) => {
  const usuario = usuarios.find(u => u.id == req.body.id);
  if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

  Object.assign(usuario, req.body);
  res.json(usuario);
});

export default router;
