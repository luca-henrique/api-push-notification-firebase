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