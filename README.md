# co-store-yamaha-front

# 🛍️ E-Commerce con React.js y ePayco

Este Backend de una aplica

## 🚀 Características

- **Pagos con ePayco:** Soporte para pagos con Nequi, PSE y Efecty.
- **Interfaz moderna:** Construida con React.js y estilizada con CSS/Sass.
- **Backend con Node.js y PostgreSQL:** Manejo eficiente de productos, categorías y pagos.

---

## 📌 Requisitos y Configuración

### **1️⃣ Backend (Obligatorio)**

Este proyecto funciona junto con un **backend** en Node.js, alojado en el siguiente repositorio:
🔗 [co-yamaha-back](https://github.com/johan9846/co-yamaha-back.git)

Para configurarlo, sigue estos pasos:

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/johan9846/co-yamaha-back.git
   cd co-yamaha-back
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Levantar la base de datos en Docker**

   ```bash
   docker compose up -d
   ```

4. **Ejecutar la semilla de datos**

   ```bash
   node src/seed/loadDataDb.js
   ```

5. **Levantar el backend**

   ```bash
   npm run dev
   ```

---



