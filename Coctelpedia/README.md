# Descripción del proyecto

_Este proyecto contiene la aplicación Android/iOS Coctelpedia, una aplicación para usar con amigos y jugar a juegos, o para aprender a hacer los mejores cócteles."_

# Requisitos

_Node y npm instalados_

*Ubuntu*

```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

*Windows*

[Node](https://nodejs.org/es/download/)

_La aplicación "Expo Client" instalada en el dispositivo móvil_

*Android*

[Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=es)

*iOS*

[App Store ](https://apps.apple.com/es/app/expo-client/id982107779)

_Librerías_

*expo-cli: instalar con ```npm install -g expo-cli``` en cualquier parte del sistema
*react-native-easy-toast: instalar con ```npm i react-native-easy-toast --save``` en el directorio principal del proyecto. Usada para simular los `toast` de Android tanto en iOS como en Android.
*react-native-extended-stylesheet: instalar con ```npm i react-native-extended-stylesheet --save``` en el directorio principal del proyecto. Usada para tener hojas de estilos avanzadas, especialmente por poder utilizar la medida 'rem'.
*react-native-check-box: instalar con ```npm i react-native-check-box --save```. Include `checkbox` al estilo Android.
*react-native-gesture-handler: viene por defecto. Se ha usado el ScrollView de esta librería.
*expo-mail-composer: instalar con ```expo install expo-mail-composer```. Se usa para abrir el editor de correo electrónico para enviar un mensaje al desarrollador si es necesario.
*react-navigation-tabs: instalar con ```npm i react-navigation-tabs```, utilizada para crear el menú de navegación en la zona inferior de la aplicación.

# Ejecución

En el directorio del proyecto, ejecutar ```expo start```. Después de unos segundos, el proyecto cargará y estará disponible en los dispositivos por ADB. Si no está disponible, o se quiere hacer vía inalámbrica, hay dos opciones:

-Loguearse en la aplicación móvil y en la cmd (presionando la tecla "e" cuando esté ejecutándose el proyecto). Automáticamente el proyecto saldrá en la página principal de la aplicación "Expo client" para su prueba. Esta es la opción más recomendable y sencilla para desarrollar, a mi parecer.

-Usar el código QR desde el dispositivo móvil en la aplicación "Expo client" para que se ejecute automáticamente. Suele funcionar mejor si se usa ```expo start --tunnel``` (a veces hay que parar la ejecución y volverla a iniciar varias veces).

# Ejecución para producción

En la consola, en el directorio del proyecto, ejecutar ```expo build:android``` o ```expo build:ios``` según conveniencia. Tardará posiblemente un par de horas (realmente a los minutos se puede ya cerrar la consola, el trabajo se realiza en los servidores de Expo). Instalar en el dispositivo Android con los orígenes desconocidos activados, y para iOS se necesita una cuenta Apple Developer, y a posteriori instalar el IPA. 

# Autores

Urko Urbieta, desarrollo completo.