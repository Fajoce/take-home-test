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
<img width="1344" height="687" alt="image" src="https://github.com/user-attachments/assets/581bcec0-68e1-4cee-b8cc-93a5081077cb" />


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
 ### Angular:
 # Lo trabaje dentro del mismo repositorio (frontend)
  <img width="704" height="544" alt="image" src="https://github.com/user-attachments/assets/0a04b42c-f582-48a8-bb4f-14cf3fe4524b" /> 
  
 # user: admin
 # password: 123456
<img width="1339" height="672" alt="image" src="https://github.com/user-attachments/assets/46999fb4-d2cd-44b3-bd36-36dea238575a" />
<img width="1341" height="677" alt="image" src="https://github.com/user-attachments/assets/9edb1059-a2a4-4ad2-af06-a708609ad022" />
<img width="1336" height="674" alt="image" src="https://github.com/user-attachments/assets/e2289ea7-c1f4-4d15-bf4e-ced01a4088c8" />
<img width="1362" height="674" alt="image" src="https://github.com/user-attachments/assets/6e31db60-4b51-40ad-a679-78f3fbb32a85" />

# Autor
Fabio Ortiz Charris

# Informacion Adicional: 
Con mas tiempo hubiese adicionado:
- Todas las entidades relacionadas con el core bancario
- Patron  diseño Result
- Agregar bibliotecas de clases para las capas  de dominio, Aplicacion, Infraestructura.(clean Arhitecture)
- Patron  diseño CQRS (Separar operaciones Lecturas/Esritura)
- Enfoque DDD
- Event Driven
- Patron  diseño Outbox
- Patron  diseño Polly + Retry
- Fluent Validations
- RabbitMQ
  
En el front:
- Control  de estado NGRX
- CRUD
- Formularios Reactivos



