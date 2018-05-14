# Sobre o app

Esse app é feito para pegar as informações de localização do usuário (coordenadas) e armazena-las em um banco de dados local, e então sincroniza-las com um serviço externo.

Esse app utiliza os seguintes plugins nativos Ionic para este fim:

- Geolocation;
- SQLite;
- Camera

O metodo utilizado é:
 - pegar a geolocalização utilizando o plugin nativo que não necessita de conexão com a internet, 
 - armazenar a informação de localização junto com o horário (hora + minutos) no banco de dados local que foi criado usando SQLite, 
 - exibir as informações de localização junto com horário que já estão previamente cadastradas no banco local, 
 - usar o plugin nativo de camera para tirar uma foto quando o usuário clica no botão de sincronizar dados, 
 - pegar a imagem em formato base64 junto com as informações de localizações que estão no banco 
 - e então enviar isso como JSON para um serviço externo (nesse caso foi usado o myjson api).

## Rodando o projeto

Necessário:

node;
npm;
ionic-cli;
Android Studio (android) ou xcode (ios);

Rodar na raiz do projeto:

```
npm i
```

Adicionar alguma plataforma ao projeto (é necessário ser testado em um device/emulador pois o SQLite não funciona no browser, assim como o recurso da camera):

```
ionic cordova add platform ios 
ionic cordova add platform android
```

Rodar o projeto na plataforma desejada:

```
ionic cordova run android
ionic cordova run ios
```

Se o projeto for rodado em um emulador Android, é necessário ir na parte de Extended Controls do emulador, selecionar a parte de Location e então enviar as coordenadas, se não a função de geolocalização não irá funcionar.

Para gerar uma versão minificada e otimizada para produção, usar o comando de build:

```
ionic cordova build android
ionic cordova build ios
```

com a flag --prod

