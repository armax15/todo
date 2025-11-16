# Task Manager Backend API

REST API для управления задачами, написанный на Go.

## Технологии

- Go 1.21+
- gorilla/mux - роутинг
- google/uuid - генерация UUID
- CORS middleware

## Структура

```
backend/
├── main.go              # Точка входа приложения
├── handlers/            # HTTP обработчики
│   └── tasks.go        # Обработчики для задач
├── models/             # Модели данных
│   └── task.go        # Модель задачи
├── db/                # База данных
│   └── database.go   # In-memory database
└── middleware/       # Middleware
    └── cors.go      # CORS middleware
```

## API Endpoints

### Tasks

**GET /api/tasks**
Получить все задачи

Ответ:
```json
[
  {
    "id": "uuid",
    "title": "Task title",
    "description": "Task description",
    "status": "todo",
    "completed": false,
    "priority": "high",
    "dueDate": "2024-01-01T00:00:00Z",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "userId": "user-id"
  }
]
```

**POST /api/tasks**
Создать новую задачу

Запрос:
```json
{
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-01-01T00:00:00Z"
}
```

**GET /api/tasks/:id**
Получить задачу по ID

**PUT /api/tasks/:id**
Обновить задачу

Запрос:
```json
{
  "title": "Updated title",
  "completed": true
}
```

**DELETE /api/tasks/:id**
Удалить задачу

### Health

**GET /health**
Проверка состояния сервера

Ответ:
```json
{
  "status": "healthy"
}
```

## Запуск

### Разработка

```bash
go run main.go
```

Сервер запустится на `http://localhost:8080`

### Продакшен

```bash
# Сборка
go build -o task-backend

# Запуск
./task-backend
```

## Переменные окружения

- `PORT` - порт сервера (по умолчанию 8080)

## База данных

В текущей версии используется in-memory хранилище для простоты разработки.
В будущем можно легко заменить на PostgreSQL, MySQL или другую БД.

## Особенности

- CORS настроен для работы с любым origin (для разработки)
- Автоматическая синхронизация полей `status` и `completed`
- UUID для идентификаторов задач
- RESTful API дизайн

## TODO

- [ ] Добавить PostgreSQL
- [ ] Добавить аутентификацию JWT
- [ ] Добавить валидацию входных данных
- [ ] Добавить unit тесты
- [ ] Добавить middleware для логирования
- [ ] Добавить пагинацию для списка задач
- [ ] Добавить фильтрацию и сортировку
