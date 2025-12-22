# Guía de Diseño - EnCasa

## 🎨 Paleta de Colores

### Colores Principales

- **Azul Principal**: `#2563eb` (blue-600) - Botones, enlaces, elementos interactivos
- **Azul Hover**: `#1d4ed8` (blue-700) - Estados hover de elementos azules
- **Púrpura Acento**: Gradientes decorativos

### Colores de Estado

- **Verde (Disponible)**: `#22c55e` (green-500)
- **Naranja (Ocupado)**: `#f97316` (orange-500)
- **Rojo (No disponible)**: `#ef4444` (red-500)
- **Amarillo (Rating)**: `#eab308` (yellow-500)

### Colores de Categorías

Cada servicio tiene su color identificatorio:

- **Carpintería**: Ámbar (amber-500)
- **Electricidad**: Amarillo (yellow-500)
- **Plomería**: Azul (blue-500)
- **Pintura**: Púrpura (purple-500)
- **Limpieza**: Verde (green-500)
- **Jardinería**: Esmeralda (emerald-500)
- **Aire Acondicionado**: Cian (cyan-500)
- **Cerrajería**: Gris (gray-500)

### Escala de Grises (Modo Claro)

- **Texto Principal**: `#171717` (zinc-900)
- **Texto Secundario**: `#52525b` (zinc-600)
- **Texto Terciario**: `#71717a` (zinc-500)
- **Bordes**: `#e4e4e7` (zinc-200)
- **Fondos**: `#fafafa` (zinc-50) / `#ffffff` (white)

### Escala de Grises (Modo Oscuro)

- **Texto Principal**: `#ffffff` (white)
- **Texto Secundario**: `#d4d4d8` (zinc-300)
- **Texto Terciario**: `#a1a1aa` (zinc-400)
- **Bordes**: `#27272a` (zinc-800)
- **Fondos**: `#09090b` (zinc-950) / `#18181b` (zinc-900)

## 📐 Espaciado y Tipografía

### Tipografía

- **Font Principal**: Geist Sans (var(--font-geist-sans))
- **Font Monospace**: Geist Mono (var(--font-geist-mono))

### Tamaños de Texto

- **Hero**: `text-4xl md:text-6xl` (36px/60px)
- **H1**: `text-4xl md:text-5xl` (36px/48px)
- **H2**: `text-3xl md:text-4xl` (30px/36px)
- **H3**: `text-2xl` (24px)
- **Body Large**: `text-lg` (18px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **XSmall**: `text-xs` (12px)

### Espaciado

- **Sección**: `py-20` (80px vertical)
- **Cards**: `p-6` o `p-8` (24px/32px)
- **Gaps entre elementos**: `gap-4`, `gap-6`, `gap-8` (16px, 24px, 32px)

## 🎯 Componentes y Patrones

### Tarjetas (Cards)

```
- Fondo blanco (dark: zinc-900)
- Border zinc-200 (dark: zinc-800)
- Rounded-xl (12px)
- Hover: shadow-lg + translate-y-1
- Padding: 6 (24px)
```

### Botones

#### Botón Principal (Primary)

```
- bg-blue-600 (hover: blue-700)
- text-white
- px-6 py-3 (padding)
- rounded-lg (8px)
- font-medium
```

#### Botón Secundario

```
- border border-zinc-300 (dark: zinc-700)
- px-6 py-3
- rounded-lg
- hover: bg-zinc-50 (dark: zinc-800)
```

### Barra de Navegación

```
- Sticky top-0
- z-50
- bg-white (dark: zinc-900)
- border-b
- height: 16 (64px)
```

### Badges de Categoría

```
- Rounded-lg (8px)
- px-4 py-2
- Color de fondo según categoría (100/900)
- Texto contraste (900/100)
```

## 🔄 Estados Interactivos

### Hover States

- Botones: Cambio de color + cursor pointer
- Cards: Shadow-lg + translateY(-4px)
- Enlaces: Color transition

### Focus States

- Inputs: ring-2 ring-blue-500
- Botones: outline-none con ring visible

### Active/Loading States

- Filtros activos: bg-blue-600 text-white
- Filtros inactivos: bg-zinc-100 (dark: zinc-800)

## 📱 Responsive Design

### Breakpoints (Tailwind)

- **sm**: 640px - Móvil landscape
- **md**: 768px - Tablet
- **lg**: 1024px - Desktop
- **xl**: 1280px - Desktop grande

### Patrones Responsive

- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Flex direction: `flex-col md:flex-row`
- Padding responsive: `px-4 sm:px-6 lg:px-8`
- Texto: `text-4xl md:text-5xl`

## 🌙 Modo Oscuro

El proyecto soporta modo oscuro automático basado en preferencias del sistema:

```css
@media (prefers-color-scheme: dark) {
  /* Automático */
}
```

O manualmente con la clase `dark:`:

```jsx
className = "bg-white dark:bg-zinc-900";
```

## ✨ Animaciones

### Transiciones Estándar

```
transition-colors
transition-all duration-300
```

### Hover Effects

```
hover:-translate-y-1
hover:scale-110
group-hover:text-blue-600
```

## 📊 Iconografía

Actualmente usando emojis Unicode para:

- Iconos de servicios
- Avatares de profesionales
- Iconos decorativos

**TODO**: Reemplazar con iconos SVG (Heroicons, Lucide, etc.) en producción

## 🎭 Componentes Visuales

### Rating Display

```
⭐ 4.8 (127)
```

- Estrella amarilla
- Número bold
- Count entre paréntesis

### Availability Badge

```
🟢 Disponible
🟠 Ocupado
🔴 No disponible
```

### Verification Badge

```
✓ (azul) - Profesional verificado
```

## 📝 Mejores Prácticas

1. **Contraste**: Mantener ratio mínimo 4.5:1 para accesibilidad
2. **Consistencia**: Usar los mismo espaciados y tamaños en toda la app
3. **Mobile First**: Diseñar primero para móvil, luego escalar
4. **Touch Targets**: Botones mínimo 44x44px en móvil
5. **Loading States**: Siempre mostrar feedback en acciones async
6. **Error States**: Mensajes claros y accionables

## 🔮 Futuras Mejoras de Diseño

- [ ] Sistema de iconos SVG consistente
- [ ] Animaciones de micro-interacciones
- [ ] Skeleton loaders
- [ ] Toast notifications
- [ ] Modal system
- [ ] Formularios con validación visual
- [ ] Ilustraciones custom para empty states
- [ ] Gradientes más complejos
- [ ] Efectos glassmorphism opcionales

---

Esta guía asegura coherencia visual en todo el proyecto y facilita futuras ampliaciones.






