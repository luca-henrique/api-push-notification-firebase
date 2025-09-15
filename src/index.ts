import express, { Request, Response } from "express";
import * as admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

// Carrega variáveis de ambiente do .env
dotenv.config();

// Valida se a variável de ambiente para a chave da conta de serviço foi definida
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
if (!serviceAccountPath) {
  console.error("Erro: FIREBASE_SERVICE_ACCOUNT_PATH não definida no .env");
  process.exit(1); // Sai do processo se a chave não estiver configurada
}

// Inicializa o SDK Admin do Firebase usando a chave da conta de serviço
// O path.resolve garante que o caminho seja absoluto e correto
try {
  const serviceAccount = require(path.resolve(serviceAccountPath));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK inicializado com sucesso.");
} catch (error) {
  console.error("Erro ao inicializar Firebase Admin SDK:", error);
  console.error("Verifique o caminho do arquivo JSON da conta de serviço.");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// --- Definições de Tipos ---
interface PushNotificationRequestBody {
  token: string;
  title: string;
  body: string;
  data?: { [key: string]: string }; // Dados opcionais, chaves e valores como strings
}

interface TopicNotificationRequestBody {
  topic: string; // O nome do tópico para o qual enviar
  title: string;
  body: string;
  data?: { [key: string]: string };
}

interface ApiResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// --- Rota da API para Enviar Push Notification ---
app.post("/send-push-notification", async (req: any, res: any) => {
  const { token, title, body, data } = req.body;

  // Validação dos dados da requisição
  if (!token || !title || !body) {
    return res
      .status(400)
      .json({
        success: false,
        error: 'Dados ausentes: "token", "title" e "body" são obrigatórios.',
      });
  }

  const message: admin.messaging.Message = {
    token: token,
    notification: {
      title: title,
      body: body,
    },
    data: data || {}, // Usa um objeto vazio se 'data' não for fornecido
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notificação enviada com sucesso:", response);
    return res.status(200).json({ success: true, messageId: response });
  } catch (error: any) {
    console.error("Erro ao enviar notificação:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: error.message || "Erro desconhecido ao enviar notificação.",
      });
  }
});

// --- NOVA ROTA: Enviar Push Notification por Tópico ---
app.post("/send-topic-notification", async (req: any, res: any) => {
  const { topic, title, body, data } = req.body as TopicNotificationRequestBody;

  // Validação dos dados da requisição para tópico
  if (!topic || !title || !body) {
    return res
      .status(400)
      .json({
        success: false,
        error: 'Dados ausentes: "topic", "title" e "body" são obrigatórios.',
      });
  }

  const message: admin.messaging.Message = {
    topic: topic, // Agora usamos 'topic' em vez de 'token'
    notification: {
      title: title,
      body: body,
    },
    data: data || {},
  };

  try {
    const response = await admin.messaging().send(message);
    console.log(
      `Notificação para o tópico '${topic}' enviada com sucesso:`,
      response
    );
    return res.status(200).json({ success: true, messageId: response });
  } catch (error: any) {
    console.error(
      `Erro ao enviar notificação para o tópico '${topic}':`,
      error
    );
    return res
      .status(500)
      .json({
        success: false,
        error:
          error.message ||
          "Erro desconhecido ao enviar notificação para o tópico.",
      });
  }
});

// --- NOVA ROTA: Enviar Push Notification por Tópico ---
//@ts-ignore
app.post("/sub-app", async (req: any, res: any) => {
  try {
    const { topic = "geral-app", token } = req.body;
    await admin.messaging().subscribeToTopic(token, topic);
    return {
      success: true,
      message: `Dispositivo inscrito no tópico ${topic}`,
    };
  } catch (error) {
    console.error("Erro ao inscrever no tópico:", error);
    return { success: false, error };
  }
});


app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
  console.log(
    `Endpoint para enviar por token: POST http://localhost:${port}/send-push-notification`
  );
  console.log(
    `Endpoint para enviar por tópico: POST http://localhost:${port}/send-topic-notification`
  );
});
