Конфигурация сервиса Account

| Переменная окружения     | Назначение                                                        | По умолчанию                          |
| ------------------------ | ----------------------------------------------------------------- | ------------------------------------- |
| SERVICE_NAME             | Название сервиса                                                  | Account                               |
| NODE_ENV                 | Окружение                                                         | local                                 |
| HTTP_PORT                | Порт, на котором слушает приложение                               | 9000                                  |
| HTTP_HOST                | Хост, на котором поднято приложение                               | localhost                             |
| HTTP_PREFIX              | Префикс http для приложения                                       | /api/account                          |
| HTTP_VERSION             | Версия http приложения                                            | 1                                     |
| DB_TYPE                  | Тип СУБД                                                          | postgres                              |
| DB_HOST                  | Хост для подключения к БД                                         | localhost                             |
| DB_PORT                  | Порт для подключения к БД                                         | 5132                                  |
| DB_DATABASE              | Название БД                                                       | account-db                            |
| DB_PASSWORD              | Имя пользователя для БД                                           | postgres                              |
| DB_PASSWORD              | Пароль для БД                                                     | -                                     |
| DB_LOGGING               | Включено ли логирование                                           | false                                 |
| DB_ENTITIES              | Схемы сущностей                                                   | dist/\*\*/\_.entity.js                |
| DB_MIGRATIONS            | Миграции, необходимые загрузить                                   | dist/module/database/migrations/\*.js |
| DB_MIGRATIONS_RUN        | Следует ли автоматически запускать миграции при старте приложении | true                                  |
| DB_MIGRATIONS_TABLE_NAME | Имя таблицы в БД с метаданными базы                               | database_migrations                   |
