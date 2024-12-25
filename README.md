# Catálogo de Requisitos

## Requisitos Funcionales
1. El sistema debe permitir a los usuarios registrarse con un nombre, correo electrónico y contraseña.
2. El sistema debe permitir a los usuarios iniciar sesión con sus credenciales.
3. Los usuarios deben poder solicitar un restablecimiento de contraseña si la olvidan.
4. El sistema debe enviar un enlace por correo electrónico para restablecer la contraseña, válido durante 2 horas.
5. El usuario debe poder cambiar su contraseña, siempre que no sea igual a las cinco últimas.
6. El sistema debe permitir la persistencia de la sesión mediante JSON Web Tokens durante un período de 2 horas.
7. Los usuarios deben poder iniciar un nuevo chat con el chatbot LLM.
8. El sistema debe permitir guardar chats históricos de los usuarios.
    - La tabla para los chats guardados debe incluir:
        - ID del chat.
        - ID del usuario.
        - Fecha y hora del chat.
        - Contenido del chat (almacenado como JSON).
9. Los usuarios deben poder ver su historial de chats guardados y seleccionar uno para revisarlo.
    - El backend debe implementar paginación para el historial de chats si este crece considerablemente.
10. El sistema debe ofrecer un apartado de configuración para personalizar la experiencia del usuario.
    - La configuración debe permitir habilitar/deshabilitar sugerencias automáticas al escribir en el chat.
    - La tabla para configuraciones debe incluir:
        - ID del usuario.
        - Preferencias como tema oscuro/claro, idioma, y otros parámetros personalizables.
    - El sistema debe permitir al usuario elegir entre un tema claro y oscuro.
11. Las configuraciones personalizadas deben ser persistentes y aplicarse en futuras sesiones.
12. El sistema debe contar con un layout con un header y footer:
    - **Header**: Botón para iniciar nuevo chat y un menú desplegable con opciones como "Información de cuenta" y "Configuración".
    - **Footer**: Información legal y datos de contacto.
13. El chatbot debe responder preguntas teóricas sobre Python basándose en un modelo LLM.
    - El sistema debe prever la actualización del modelo LLM sin afectar la disponibilidad del servicio.
14. El sistema debe permitir a los administradores revisar logs de errores o eventos relevantes.
15. Los usuarios deben poder cerrar sesión desde cualquier página.

## Requisitos No Funcionales
1. El sistema debe garantizar una respuesta rápida del chatbot, con un tiempo máximo de respuesta de 2 segundos para cada consulta.
2. La aplicación debe ser accesible desde dispositivos móviles y de escritorio.
3. El sistema debe garantizar la seguridad de los datos mediante contraseñas hash y comunicación segura (HTTPS).
4. La interfaz debe ser intuitiva, utilizando React con TypeScript y estilización con TailwindCSS.
5. Las operaciones críticas, como restablecer contraseña, deben registrar logs de actividad para auditoría.

## Requisitos Técnicos
1. El frontend debe estar desarrollado en React.js con TypeScript y utilizar React Router DOM para el manejo de rutas.
2. La gestión del estado global del frontend debe manejarse mediante Redux Toolkit.
3. El backend debe estar desarrollado en Node.js con Express.
4. La base de datos debe ser MariaDB.
5. Las contraseñas deben almacenarse en la base de datos utilizando hashing seguro (bcrypt).
6. El sistema debe enviar correos electrónicos mediante Nodemailer.
7. La persistencia de la sesión debe realizarse mediante JSON Web Tokens.
8. Los datos de configuración del usuario deben almacenarse en una tabla específica en la base de datos.
9. Los chats guardados deben almacenarse en otra tabla específica en la base de datos.
10. El sistema debe integrar un modelo LLM para responder preguntas sobre Python.
11. El layout debe ser reutilizable mediante componentes en React.

## Requisitos de Usabilidad
1. La interfaz debe ser fácil de entender para usuarios con conocimientos básicos de tecnología.
2. El diseño debe seguir principios de diseño responsivo para adaptarse a pantallas de distintos tamaños.
3. El footer debe proporcionar enlaces claros y accesibles a información legal y de contacto.
4. Las opciones del header deben estar organizadas y ser fácilmente accesibles.
5. El sistema debe ofrecer retroalimentación visual para indicar el estado de las acciones (como "Contraseña cambiada exitosamente").
6. Los chats deben estar ordenados cronológicamente en el historial.
7. Las preguntas más frecuentes sobre el uso del chatbot deben estar disponibles en una sección de ayuda.
