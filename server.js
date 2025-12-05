import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import usuariosRoutes from "./routes/usuarios.js";
import clientesRoutes from "./routes/clientes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Simples",
      version: "1.0.0",
      description: "Documentação da API Simples com Swagger"
    }
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/v1/usuarios", usuariosRoutes);
app.use("/v1/clientes", clientesRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
