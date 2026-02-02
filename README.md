
# Jei Surveys API

API para la gestión de encuestas, preguntas y respuestas, construida con NestJS, TypeORM y PostgreSQL.

## Características principales

- Registro y autenticación de usuarios (JWT)
- CRUD de encuestas, preguntas y respuestas
- Validación de datos con DTOs y class-validator
- Arquitectura limpia: módulos, casos de uso, repositorios, entidades de dominio
- Documentación interactiva con Swagger (`/docs`)
- Pruebas unitarias y e2e
- Soporte para Docker

## Instalación

```bash
git clone <repo-url>
cd jei-surveys
npm install
```

## Variables de entorno

Crea un archivo `.env` basado en `.env.example` y configura:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=jei_surveys
JWT_SECRET=your_secret
```

## Uso con Docker

```bash
docker-compose up --build
```

Esto levanta la base de datos y la API.

## Scripts útiles

```bash
npm run start         # Modo producción
npm run start:dev     # Modo desarrollo con hot reload
npm run test          # Pruebas unitarias
npm run test:e2e      # Pruebas end-to-end
npm run test:cov      # Cobertura de tests
```

## Documentación Swagger

Accede a la documentación interactiva en:  
[http://localhost:3000/docs](http://localhost:3000/docs)

## Arquitectura y módulos

- **src/modules/auth**: Autenticación y usuarios
- **src/modules/survey**: Encuestas, preguntas y respuestas
  - **application**: Casos de uso, DTOs
  - **domain**: Entidades y repositorios
  - **infraestructure**: Controladores, mapeadores, repositorios TypeORM
- **src/shared**: Módulos y utilidades compartidas (ej: guards, database)

## Principales entidades

- **Survey**: Encuesta
- **Question**: Pregunta de encuesta
- **SurveyResponse**: Respuesta a encuesta
- **User**: Usuario autenticado

## Pruebas

```bash
npm run test
npm run test:e2e
```

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios
4. Haz push a tu rama
5. Abre un Pull Request

