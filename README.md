# Intelipost: Teste prático para Desenvolvedor Mobile

## Como rodar

* Instalar as dependências
```
npm install
```

* Rodar no navegador
```
ionic serve
```

* Rodar no device
```
ionic cordova run android
```

## Como Funciona

### Localização
* Ao iniciar o aplicativo é obtida a primeira localização do usuário e iniciado o processo que busca as cooredenadas a cada 3 minutps
* A localização obtida é armazenada no banco de dados interno (SQLite)
* Toda nova localização obtida notifica a tela de listagem de últimas localizações para atualização (via Events)
* A sincronização de registros de localização captura uma image em base64 e envia junto as localizações ainda não sincronizadas para o endereço http://requestbin.fullcontact.com/160n5jh1.
* Após o sucesso da sincronização, os dados enviados são marcados como já sincronizados

### Notícias
* Obtém uma lista de dados aleatórios via HTTP GET no endereço https://jsonplaceholder.typicode.com/albums/1/photos

