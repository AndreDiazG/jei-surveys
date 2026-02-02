
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
git clone https://github.com/AndreDiazG/jei-surveys.git
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

El proyecto sigue una arquitectura modular y por capas, inspirada en Clean Architecture. Cada módulo agrupa su lógica de dominio, aplicación e infraestructura.

### Estructura de módulos principales

- **auth**: Todo lo relacionado con autenticación y usuarios.
  - **application**: Lógica de aplicación (casos de uso, DTOs, servicios, interfaces).
    - `dtos/`: Data Transfer Objects para login y otros flujos.
    - `interfaces/`: Contratos para el contexto de usuario y autenticación.
    - `services/`: Servicios de aplicación (ej: AuthService, UserSeederService).
  - **infraestructure**: Adaptadores externos (controladores, persistencia, estrategias).
    - `controllers/`: Controlador de autenticación (`auth.controller.ts`).
    - `persistence/`: Entidades ORM para usuarios.
    - `strategies/`: Estrategias de autenticación (ej: JWT).
  - `auth.module.ts`: Módulo principal de autenticación.

- **survey**: Gestión de encuestas, preguntas y respuestas.
  - **application**: Lógica de aplicación.
    - `dtos/`: DTOs para encuestas, preguntas, respuestas.
    - `use-cases/`: Casos de uso (crear, obtener, actualizar, eliminar encuestas, etc).
  - **domain**: Lógica de dominio.
    - `entities/`: Entidades de dominio (Survey, Question, SurveyResponse).
    - `repositories/`: Interfaces de repositorios.
    - `types/`: Tipos y enums de dominio.
  - **infraestructure**: Adaptadores externos.
    - `controllers/`: Controladores HTTP para encuestas, preguntas y respuestas.
    - `mappers/`: Mapeadores entre entidades ORM y de dominio.
    - `persistence/`: Repositorios TypeORM y entidades ORM.
  - `survey.module.ts`: Módulo principal de encuestas.

- **shared**: Código reutilizable y utilidades comunes.
  - `database/`: Configuración y módulo de base de datos.
  - `guards/`, `decorators/`: Guards y decoradores personalizados.

### Flujo típico de una petición

1. **Controller** (infraestructure): Recibe la petición HTTP y valida el body con DTOs.
2. **Use Case** (application): Ejecuta la lógica de negocio específica.
3. **Repository** (domain/infraestructure): Accede a la base de datos a través de interfaces y repositorios concretos.
4. **Entity** (domain): Representa el modelo de negocio.
5. **Mapper** (infraestructure): Convierte entre entidades de dominio y ORM.

### Ventajas de esta arquitectura

- Separación clara de responsabilidades.
- Fácil de testear y mantener.
- Permite cambiar la infraestructura (ej: base de datos) sin afectar la lógica de negocio.
- Escalable para agregar nuevos módulos o funcionalidades.

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

