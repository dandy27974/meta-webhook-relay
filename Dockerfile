# Используем Node.js как базовый образ
FROM node:18-alpine

# Создаём рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY . .

# Устанавливаем зависимости
RUN npm install

# Открываем порт
EXPOSE 3000

# Запускаем сервер
CMD ["node", "server.js"]
