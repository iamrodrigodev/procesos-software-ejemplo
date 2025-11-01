# API de Gestión de Direcciones

API RESTful desarrollada con NestJS para la gestión de direcciones geográficas con funcionalidad de autocompletado.

## Tecnologías

- NestJS 11
- TypeORM
- SQLite3
- TypeScript
- Class Validator

## Modelo de Datos

### Entidad: Direccion

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| id_direccion | number | Identificador único | Primary Key, Auto-increment |
| direccion_completa | string | Dirección completa | Requerido |
| referencia | string | Referencia o punto de ubicación | Opcional |
| latitud | number | Coordenada de latitud | Requerido, Rango: -90 a 90 |
| longitud | number | Coordenada de longitud | Requerido, Rango: -180 a 180 |
| fecha_registro | Date | Fecha y hora de creación | Auto-generado |

## Instalación

```bash
# Instalar dependencias
npm install

# Compilar el proyecto
npm run build

# Iniciar en modo desarrollo
npm run start:dev

# Iniciar en modo producción
npm run start:prod
```

La aplicación inicia en `http://localhost:3000`

## Base de Datos

La aplicación utiliza SQLite3 y crea automáticamente:
- Archivo de base de datos: `database.sqlite`
- 10 direcciones de ejemplo al iniciar por primera vez

## Endpoints

### 1. Crear Dirección

Crea una nueva dirección en el sistema.

**Endpoint:** `POST /direccion`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "direccion_completa": "Av. Javier Prado Este 4200, Santiago de Surco, Lima",
  "referencia": "Frente al centro comercial Jockey Plaza",
  "latitud": -12.0897,
  "longitud": -76.9789
}
```

**Respuesta Exitosa (201):**
```json
{
  "id_direccion": 11,
  "direccion_completa": "Av. Javier Prado Este 4200, Santiago de Surco, Lima",
  "referencia": "Frente al centro comercial Jockey Plaza",
  "latitud": -12.0897,
  "longitud": -76.9789,
  "fecha_registro": "2025-10-31T20:30:15.000Z"
}
```

**Validaciones:**
- `direccion_completa`: Requerido, tipo string
- `referencia`: Opcional, tipo string
- `latitud`: Requerido, número entre -90 y 90
- `longitud`: Requerido, número entre -180 y 180

---

### 2. Listar Todas las Direcciones

Obtiene todas las direcciones registradas.

**Endpoint:** `GET /direccion`

**Respuesta Exitosa (200):**
```json
[
  {
    "id_direccion": 1,
    "direccion_completa": "Av. Javier Prado Este 123, San Isidro, Lima",
    "referencia": "Entre banco BCP y farmacia Inkafarma",
    "latitud": -12.0956,
    "longitud": -77.0362,
    "fecha_registro": "2025-10-31T19:18:30.000Z"
  },
  {
    "id_direccion": 2,
    "direccion_completa": "Calle Las Begonias 456, San Isidro, Lima",
    "referencia": "Frente al parque central",
    "latitud": -12.0964,
    "longitud": -77.0378,
    "fecha_registro": "2025-10-31T19:18:30.000Z"
  }
]
```

---

### 3. Obtener Dirección por ID

Obtiene una dirección específica por su identificador.

**Endpoint:** `GET /direccion/:id`

**Parámetros:**
- `id` (path): ID de la dirección

**Ejemplo:** `GET /direccion/1`

**Respuesta Exitosa (200):**
```json
{
  "id_direccion": 1,
  "direccion_completa": "Av. Javier Prado Este 123, San Isidro, Lima",
  "referencia": "Entre banco BCP y farmacia Inkafarma",
  "latitud": -12.0956,
  "longitud": -77.0362,
  "fecha_registro": "2025-10-31T19:18:30.000Z"
}
```

**Respuesta Error (404):**
```json
{
  "statusCode": 404,
  "message": "Dirección con ID 999 no fue encontrada",
  "error": "Not Found"
}
```

---

### 4. Autocompletar Dirección

Busca direcciones que coincidan parcialmente con el texto ingresado. Retorna máximo 10 resultados.

**Endpoint:** `GET /direccion/autocomplete`

**Query Parameters:**
- `parcial` (string): Texto a buscar en la dirección completa

**Ejemplo:** `GET /direccion/autocomplete?parcial=Miraflores`

**Respuesta Exitosa (200):**
```json
[
  {
    "id_direccion": 3,
    "direccion_completa": "Av. Arequipa 789, Miraflores, Lima",
    "referencia": "Al lado del centro comercial Larcomar",
    "latitud": -12.1205,
    "longitud": -77.0282,
    "fecha_registro": "2025-10-31T19:18:30.000Z"
  },
  {
    "id_direccion": 6,
    "direccion_completa": "Calle Schell 890, Miraflores, Lima",
    "referencia": "Entre óvalo Gutiérrez y parque Kennedy",
    "latitud": -12.1216,
    "longitud": -77.0301,
    "fecha_registro": "2025-10-31T19:18:30.000Z"
  }
]
```

**Notas:**
- La búsqueda es case-insensitive
- Solo busca en el campo `direccion_completa`
- Retorna array vacío si no hay coincidencias o el parámetro está vacío

---

### 5. Actualizar Dirección

Actualiza parcial o totalmente una dirección existente.

**Endpoint:** `PUT /direccion/:id`

**Parámetros:**
- `id` (path): ID de la dirección a actualizar

**Headers:**
```
Content-Type: application/json
```

**Body (todos los campos son opcionales):**
```json
{
  "direccion_completa": "Av. Javier Prado Este 4200, Santiago de Surco, Lima",
  "referencia": "Nueva referencia actualizada",
  "latitud": -12.0897,
  "longitud": -76.9789
}
```

**Ejemplo:** `PUT /direccion/1`

**Respuesta Exitosa (200):**
```json
{
  "id_direccion": 1,
  "direccion_completa": "Av. Javier Prado Este 4200, Santiago de Surco, Lima",
  "referencia": "Nueva referencia actualizada",
  "latitud": -12.0897,
  "longitud": -76.9789,
  "fecha_registro": "2025-10-31T19:18:30.000Z"
}
```

---

### 6. Eliminar Dirección

Elimina una dirección del sistema.

**Endpoint:** `DELETE /direccion/:id`

**Parámetros:**
- `id` (path): ID de la dirección a eliminar

**Ejemplo:** `DELETE /direccion/1`

**Respuesta Exitosa (200):**
Sin contenido en el body

---

## Uso en Postman

### Configuración Inicial

1. Crear nueva colección llamada "API Direcciones"
2. Configurar variable de entorno `base_url` con valor `http://localhost:3000`

### Ejemplo: Crear Dirección

1. Crear nuevo request tipo POST
2. URL: `{{base_url}}/direccion`
3. Ir a pestaña "Headers"
   - Key: `Content-Type`
   - Value: `application/json`
4. Ir a pestaña "Body"
   - Seleccionar "raw"
   - Seleccionar "JSON" en el dropdown
   - Pegar el JSON del body
5. Click en "Send"

### Ejemplo: Autocompletar

1. Crear nuevo request tipo GET
2. URL: `{{base_url}}/direccion/autocomplete`
3. Ir a pestaña "Params"
   - Key: `parcial`
   - Value: `Miraflores`
4. Click en "Send"

### Ejemplo: Actualizar Dirección

1. Crear nuevo request tipo PUT
2. URL: `{{base_url}}/direccion/1`
3. Configurar Headers y Body como en el ejemplo de crear
4. Incluir solo los campos que deseas actualizar
5. Click en "Send"

### Ejemplo: Eliminar Dirección

1. Crear nuevo request tipo DELETE
2. URL: `{{base_url}}/direccion/1`
3. Click en "Send"

## Errores Comunes

### Error 400 - Bad Request

Ocurre cuando la validación de datos falla.

**Ejemplo:**
```json
{
  "statusCode": 400,
  "message": [
    "latitud must not be greater than 90",
    "direccion_completa should not be empty"
  ],
  "error": "Bad Request"
}
```

**Solución:** Verificar que todos los campos cumplan con las validaciones especificadas.

### Error 404 - Not Found

Ocurre cuando se intenta acceder a una dirección que no existe.

**Solución:** Verificar que el ID de la dirección sea correcto.

## Estructura del Proyecto

```
src/
├── direccion/
│   ├── dto/
│   │   ├── create-direccion.dto.ts
│   │   └── update-direccion.dto.ts
│   ├── entities/
│   │   └── direccion.entity.ts
│   ├── direccion.controller.ts
│   ├── direccion.module.ts
│   ├── direccion.service.ts
│   └── direccion.seed.ts
├── app.module.ts
└── main.ts
```

## Datos de Ejemplo

Al iniciar la aplicación por primera vez, se cargan automáticamente 10 direcciones de ejemplo de Lima, Perú:

1. Av. Javier Prado Este - San Isidro
2. Calle Las Begonias - San Isidro
3. Av. Arequipa - Miraflores
4. Jr. de la Unión - Cercado de Lima
5. Av. La Marina - San Miguel
6. Calle Schell - Miraflores
7. Av. Universitaria - Los Olivos
8. Av. Aviación - San Borja
9. Calle Libertad - Barranco
10. Av. Brasil - Breña

## Licencia

UNLICENSED
