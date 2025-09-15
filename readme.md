# API de Notificações Push com Firebase Cloud Messaging (FCM)

Esta API permite o envio de notificações push para dispositivos móveis (Android e iOS) utilizando o Firebase Cloud Messaging (FCM). Ela oferece endpoints para enviar notificações para tokens de dispositivos específicos e para tópicos.

## Tecnologias Utilizadas

*   **Node.js**: Ambiente de execução JavaScript.
*   **Express.js**: Framework web para Node.js.
*   **Firebase Admin SDK**: Biblioteca para interagir com os serviços do Firebase a partir de um ambiente de servidor.

## Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/api-push-notification-ponto-resultados.git
cd api-push-notification-ponto-resultados
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure o Firebase Admin SDK

1.  **Crie um Projeto Firebase**: Se você ainda não tem um, crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2.  **Gere uma Chave de Conta de Serviço**:
    *   No Firebase Console, vá em `Configurações do Projeto` (ícone de engrenagem) > `Contas de Serviço`.
    *   Clique em `Gerar nova chave privada`. Isso fará o download de um arquivo JSON.
3.  **Renomeie e Mova o Arquivo**: Renomeie o arquivo JSON baixado para `serviceAccountKey.json` e coloque-o na raiz do seu projeto (na mesma pasta onde está `app.js` ou `index.js`).

### 4. Variáveis de Ambiente (Opcional, mas recomendado)

Para gerenciar configurações sensíveis, você pode usar um arquivo `.env`. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```
PORT=3000
```

Se você não usar um arquivo `.env`, a porta padrão será 3000.

## Como Executar

```bash
npm start


curl -X POST \
  http://localhost:3000/send-push-notification \
  -H 'Content-Type: application/json' \
  -d '{
        "token": "f3zRbS8hQeOTBBRrI55WzW:APA91bFpFO75r6htlCCPL_6Ijl2JU6uj_G1W771e5Ue3RIkFhaz7v9KM_sD2uGQi-jHCtfeL2kcxeHqcXgKFDi_8sCo3l8
 LOG  f3zRbS8hQeOTBBRrI55WzW:APA91bFpFO75r6htlCCPL_6Ijl2JU6uj_G1W771e5Ue3RIkFhaz7v9KM_sD2uGQi-jHCtfeL2kcxeHqcXgKFDi_8sCo3lrDat2-reV9-p7vNBShOWdsK4P8",
        "title": "Mensagem do Express",
        "body": "Olá do seu backend Express.js!"
      }'


curl -X POST \
  http://http://localhost:3000/send-topic-notification \
  -H 'Content-Type: application/json' \
  -d '{
        "topic": "test_topic",  // Use o mesmo nome de tópico que seu app se inscreveu
        "title": "Notícia Urgente!",
        "body": "Uma nova atualização para você."
      }'