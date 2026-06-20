## Running the Backend
# Loan Management System

Aplicación para la gestión de préstamos desarrollada con ASP.NET Core 6, Entity Framework Core, SQL Server, Angular y Docker.

## Tecnologías utilizadas

### Backend

* ASP.NET Core 6
* Entity Framework Core
* SQL Server
* Swagger/OpenAPI
* xUnit

### Frontend

* Angular
* Angular Material
* TypeScript

### DevOps

* Docker
* Docker Compose
* GitHub Actions

---

# Configuración del proyecto

## Clonar repositorio

```bash
git clone <repository-url>
cd take-home-test
```

---

# Backend

Ubicarse en:

```bash
cd backend/src/Fundo.Applications.WebApi
```

### Restaurar dependencias

```bash
dotnet restore
```

### Ejecutar aplicación

```bash
dotnet run
```

Swagger:

```text
http://localhost:5000/swagger
```

---

# Base de datos

La aplicación utiliza SQL Server.

Cadena de conexión:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=sqlserver;Database=LoanDb;User Id=sa;Password=YourStrong@Pass123;TrustServerCertificate=True"
  }
}
```

---

# Docker

## Construir imágenes

Desde la carpeta donde se encuentra el archivo docker-compose.yml:

```bash
docker compose build
```

## Levantar contenedores

```bash
docker compose up -d
```

## Verificar contenedores

```bash
docker ps
```

## Detener contenedores

```bash
docker compose down
```

---

# Frontend Angular

Ubicarse en:

```bash
cd frontend
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar aplicación

```bash
ng serve
```

Aplicación disponible en:

```text
http://localhost:4200
```

---

# Pruebas

Ejecutar pruebas unitarias:

```bash
dotnet test
```

---

# Integración continua

El proyecto incluye una canalización GitHub Actions:

```text
.github/workflows/backend.yml
```

La canalización realiza:

* Restauración de dependencias
* Compilación del backend
* Ejecución de pruebas unitarias
* Validación de construcción Docker

---

# Funcionalidades

* Consulta de préstamos
* Visualización de saldo actual
* Estado del préstamo (Activo / Pagado)
* API REST documentada con Swagger
* Persistencia en SQL Server
* Contenerización mediante Docker

---

# Autor

Fabio Ortiz



