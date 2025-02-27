# m6-ep2

## Ejercicio Práctico: Almacenamiento y Análisis de PWA en la Web del Hospital

Este proyecto es un ejercicio práctico que permite gestionar las citas de pacientes en un hospital mediante una aplicación web que utiliza **Progressive Web App (PWA)**. La aplicación está construida con **React** y **Vite**, utilizando **IndexedDB** y **LocalStorage** para almacenamiento de datos, además de contar con un **Service Worker** que permite el acceso sin conexión.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```bash
src/
├── assets/
│   ├── img/
│   ├── css/
│   ├── equipo.json
├── components/
│   ├── AppointmentForm.tsx
│   ├── Carousel.tsx
│   ├── DoctorCard.tsx
│   ├── EquipoMedico.tsx
│   ├── Home.tsx
│   ├── InstallButton.tsx
│   ├── Navbar.tsx
│   ├── OfflineBanner.tsx
│   ├── Testimonios.tsx
├── context/
│   ├── AuthContext.tsx
├── routes/
│   ├── ProtectedRoute.tsx
├── utils/
│   ├── indexedDbUtils.ts
│   ├── localStorageUtils.ts
├── .env
├── App.tsx
├── import.meta.env
├── main.tsx
├── types.d.ts
├── vite-env.ts


## Descripción de la Aplicación

La aplicación tiene como objetivo gestionar las citas médicas de los pacientes. A través de la web, los usuarios pueden:

1. **Ver la lista de doctores del hospital**: Consultar la información de los médicos disponibles y sus especialidades.
2. **Agendar citas**: Los pacientes pueden llenar un formulario para agendar citas con los médicos. Esta información se guarda tanto en **IndexedDB** para uso offline como en **LocalStorage** para recordar las credenciales de usuario.
3. **Acceder a testimonios**: Sección donde los pacientes pueden leer testimonios de otros usuarios.
4. **Funcionalidad offline**: La aplicación se comporta como una PWA (Progressive Web App) y se puede utilizar incluso sin conexión a Internet gracias a un Service Worker que maneja la caché de los archivos.

### Tecnologías utilizadas

- **React**: Para la creación de los componentes y la interfaz de usuario.
- **Vite**: Para la construcción rápida de la aplicación.
- **PWA**: La aplicación está configurada como una Progressive Web App (PWA) con soporte offline, utilizando un Service Worker.
- **LocalStorage & IndexedDB**: Para almacenar datos de forma persistente, permitiendo la funcionalidad sin conexión.
- **Bootstrap**: Para la maquetación y los estilos, con una interfaz sencilla y moderna.

## Funcionalidades Principales

### 1. **Formulario de Cita Médica**:
El formulario permite a los pacientes llenar sus datos y elegir el médico con el que desean agendar la cita. Los datos se guardan en IndexedDB y LocalStorage.

### 2. **Autenticación de Usuarios**:
Utilizando **Context API**, la aplicación tiene un sistema de autenticación básico donde los usuarios pueden iniciar sesión para acceder a las rutas protegidas. Las credenciales del usuario se guardan en **LocalStorage**.

### 3. **Service Worker**:
Un **Service Worker** maneja la caché de los archivos de la aplicación para soportar el uso offline. Los archivos esenciales, como el índice de la aplicación, las imágenes y los datos de doctores, se almacenan en caché.

### 4. **Citas Agendadas**:
Las citas agendadas se muestran en la aplicación después de que el usuario las haya registrado, y se almacenan localmente para poder recuperarlas incluso sin conexión.

### 5. **Responsive Design**:
La aplicación está diseñada para adaptarse a dispositivos móviles y escritorios mediante **Bootstrap**.

## Instalación

### Prerrequisitos

- Tener **Node.js** instalado (si no lo tienes, descarga e instala desde [Node.js](https://nodejs.org/)).
- Tener **Vite** instalado (si no lo tienes, instálalo con el comando `npm create vite`).

### Pasos para la instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/cristiansot/m6-ep2

2. Instala dependencias:

   ```bash
   npm install

3. Ejecuta la APP:

   ```bash
   npm run dev


