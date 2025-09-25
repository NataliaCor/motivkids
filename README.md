# MotivKids 🎯

Una aplicación web moderna desarrollada en Angular 19 para la gestión y seguimiento de actividades, alarmas y comunicación con niños. MotivKids ofrece una experiencia intuitiva con un diseño limpio y funcionalidades interactivas.

## 🚀 Características Principales

- **Sistema de Alarmas**: Creación y gestión de alarmas personalizadas
- **Gestión de Actividades**: Catálogo completo de actividades para niños
- **Sistema de Mensajes**: Comunicación directa con funcionalidades avanzadas
- **Dashboard Interactivo**: Visualización de estadísticas y métricas en tiempo real
- **Soporte y Ayuda**: Centro completo de asistencia al usuario
- **Diseño Responsivo**: Optimizado para dispositivos móviles y escritorio

## 🛠️ Tecnologías

- **Frontend**: Angular 19.2.0 con Standalone Components
- **CSS**: Variables personalizadas y utility classes
- **Icons**: Bootstrap Icons 1.13.1
- **Forms**: Angular Reactive Forms
- **Routing**: Angular Router con lazy loading
- **Build**: Angular CLI 19.2.1
- **Server**: SSR con Angular Universal

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Angular CLI 19.2.1

```bash
# Verificar versiones
node --version
npm --version

# Instalar Angular CLI globalmente (si no está instalado)
npm install -g @angular/cli
```

## ⚡ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/NataliaCor/motivkids.git
cd motivkids
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar el Proyecto en Desarrollo

```bash
# Servidor de desarrollo
npm start
# o
ng serve

# La aplicación estará disponible en: http://localhost:4200
```

### 4. Construcción para Producción

```bash
# Build de producción
npm run build
# o
ng build --prod
```

## 🖥️ Pantallas y Funcionalidades

### 1. 🏠 Dashboard (Home)
**Ruta**: `/`
- **Descripción**: Pantalla principal con estadísticas generales
- **Características**:
  - Tarjetas de estadísticas (Alarmas Activas, Mensajes Enviados, Actividades Elegidas)
  - Gráfico de historial de emociones
  - Lista de actividades recientes
- **Componentes**: `StatsCardComponent`, gráficos personalizados

### 2. ⏰ Gestión de Alarmas
**Ruta**: `/alarms`
- **Descripción**: Sistema completo de gestión de alarmas
- **Características**:
  - Lista de alarmas activas/inactivas
  - Filtrado por estado
  - Búsqueda de alarmas
  - Acciones: Editar, Eliminar, Activar/Desactivar

#### 📝 Modal de Agregar/Editar Alarma
- **Campos**:
  - Nombre de la alarma
  - Hora (con selector de AM/PM)
  - Tono/Sonido con selector de audio
  - Recomendación (textarea)
  - Días de la semana (botones interactivos)
  - Repetición (nunca, diario, semanal, mensual)
  - Actividad vinculada
- **Validación**: Formulario reactivo con validación en tiempo real
- **Componente**: `AlarmModalComponent`

### 3. 🎯 Actividades
**Ruta**: `/activities`
- **Descripción**: Catálogo de actividades disponibles para niños
- **Características**:
  - Búsqueda de actividades
  - Sugerencias personalizadas
  - Categorías de actividades
  - Filtros avanzados

### 4. 💌 Mensajes
**Ruta**: `/messages`
- **Descripción**: Sistema de comunicación integrado
- **Características**:
  - Lista de conversaciones
  - Historial de mensajes
  - Estados de lectura
  - Filtros por tipo de mensaje

#### ✉️ Modal de Mensajes
- **Funcionalidades**:
  - Redacción de nuevos mensajes
  - Respuesta a mensajes existentes
  - Adjuntos de archivos
  - Plantillas predefinidas
- **Componente**: `MessageModalComponent`

### 5. 🆘 Soporte y Ayuda
**Ruta**: `/support`
- **Descripción**: Centro de asistencia completo
- **Características**:
  - Preguntas frecuentes (FAQ)
  - Contacto con soporte técnico
  - Tutoriales paso a paso
  - Guías rápidas

#### 📞 Opciones de Contacto
- **Teléfono de Soporte**: +1 (555) 123-4567 (Lun-Vie: 9:00 AM - 6:00 PM)
- **Chat en Vivo**: Disponible 24/7
- **Email**: soporte@motivkids.com (Respuesta en 24 horas)

### 6. 🔐 Login
**Ruta**: `/login`
- **Descripción**: Autenticación de usuarios
- **Características**:
  - Formulario de inicio de sesión
  - Validación de credenciales
  - Recordar usuario
  - Recuperación de contraseña

## 🎨 Sistema de Diseño

### Colores Principales
- **Primary**: Verde (#6A951F)
- **Secondary**: Amarillo (#EEC925)
- **Accent**: Turquesa (#9FDFE0)
- **Warning**: Naranja
- **Success**: Verde
- **Error**: Rojo

### Tipografía
- **Font Family**: Inter
- **H1**: 36px Bold
- **H2**: 24px Semibold
- **H3**: 18px Semibold
- **Body**: 16px Regular
- **Small**: 14px Regular

### Componentes Reutilizables

#### 🔘 ButtonComponent
- **Variantes**: primary, secondary, accent, outline, turquoise, day
- **Tamaños**: small, medium, large
- **Estados**: active, disabled, loading
- **Propiedades**: fullWidth, text, icon

#### 🃏 CardComponent
- **Variantes**: default, elevated, outlined
- **Tamaños**: small, medium, large
- **Sombras**: configurables
- **Padding**: variable

#### 🪟 ModalComponent
- **Tamaños**: small, medium, large, fullscreen
- **Posiciones**: center, top, bottom
- **Animaciones**: fade, slide, zoom
- **Características**: backdrop click, escape key, scroll prevention

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── button/         # ButtonComponent
│   │   ├── card/           # CardComponent  
│   │   ├── modal/          # ModalComponent
│   │   ├── navbar/         # NavbarComponent
│   │   ├── alarm-modal/    # AlarmModalComponent
│   │   ├── message-modal/  # MessageModalComponent
│   │   └── support-card/   # SupportCardComponent
│   ├── pages/              # Páginas principales
│   │   ├── home/          # Dashboard
│   │   ├── alarms/        # Gestión de alarmas
│   │   ├── activities/    # Catálogo de actividades
│   │   ├── messages/      # Sistema de mensajes
│   │   ├── support/       # Centro de soporte
│   │   └── login/         # Autenticación
│   ├── services/          # Servicios Angular
│   └── models/            # Interfaces y modelos
├── assets/                # Recursos estáticos
└── styles.css            # Estilos globales y variables CSS
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start                 # Inicia servidor de desarrollo
npm run watch            # Build con watch mode

# Producción
npm run build            # Build de producción
npm run serve:ssr        # Servidor SSR

# Testing
npm test                 # Ejecuta pruebas unitarias
```

## 🌐 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | HomeComponent | Dashboard principal |
| `/login` | LoginComponent | Autenticación |
| `/alarms` | AlarmsComponent | Gestión de alarmas |
| `/activities` | ActivitiesComponent | Catálogo de actividades |
| `/messages` | MessagesComponent | Sistema de mensajes |
| `/support` | SupportComponent | Centro de soporte |

## 🎯 Funcionalidades Destacadas

### ✨ Sistema de Variables CSS
- Variables centralizadas para colores, espaciado, tipografía
- Utility classes para desarrollo rápido
- Consistencia visual en toda la aplicación

### 📱 Diseño Responsivo
- Mobile-first approach
- Breakpoints optimizados
- Componentes adaptables

### ♿ Accesibilidad
- Navegación por teclado
- Estados de foco visibles
- Contraste de colores optimizado
- Etiquetas ARIA apropiadas

### 🚀 Performance
- Lazy loading de rutas
- Componentes standalone
- Optimización de bundle size
- Angular SSR integrado

## 🐛 Solución de Problemas

### Problemas Comunes

#### Error de dependencias
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### Puerto ocupado
```bash
# Usar puerto específico
ng serve --port 4201
```

#### Problemas de build
```bash
# Build con información detallada
ng build --verbose
```

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollo Frontend**: Angular 19 + TypeScript
- **Diseño UI/UX**: Sistema de diseño personalizado
- **Arquitectura**: Componentes standalone y lazy loading

## 📞 Contacto y Soporte

- **Email**: soporte@motivkids.com
- **Documentación**: [Wiki del proyecto](https://github.com/NataliaCor/motivkids/wiki)
- **Issues**: [GitHub Issues](https://github.com/NataliaCor/motivkids/issues)

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐
