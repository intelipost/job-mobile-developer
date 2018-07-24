# Sobre o APP

Este APP foi desenvolvido para realizar o cadastro de usuários, autenticação e captura de localização do usuário para armazenamento em um banco de dados local e eventualmente sincronizar as informações à um serviço externo, via protocolo REST.

Plugins utilizados:

- SQLite;
- Geolocation;
- Camera
- Toast

Os métodos utilizados:
 - cadastro de usuário no banco de dados usando o SQLite para armazenamento;
 - autenticação de usuário;
 - pegar a geolocalização utilizando o plugin nativo que não necessita de conexão com a internet;
 - armazenar a informação de localização junto com o horário (hora + minutos) no banco de dados local que foi criado usando SQLite;
 - exibir um log com as localizações capturadas;
 - usar o plugin nativo de camera para tirar uma foto quando o usuário clica no botão de sincronizar dados; 
 - tira uma foto com a imagem em formato base64 junto com as informações de localizações que estão no banco;
 - envia um JSON para um serviço externo (nesse caso foi usado o myjson api);

## Exeuctando o APP

Requerimentos para rordar o APP:

node;
npm;
ionic-cli;
Android Studio (android) ou xcode (ios);

Rodar na raiz do projeto:

```
npm i
```

Adicionar ao menos uma plataforma ao projeto (é necessário um device para testes):

```
ionic cordova add platform ios 
ionic cordova add platform android
```

Rodar o projeto na plataforma desejada:

```
ionic cordova run android
ionic cordova run ios
```

## Notas
Ao instalar o APP, será gerado um usuário default com os seguintes dados:
E-mail: admin@myroute.com
Senha: 12345
