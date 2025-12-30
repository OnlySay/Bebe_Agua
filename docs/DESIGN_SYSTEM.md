# Sistema de Diseño

## Introducción

El sistema de diseño proporciona componentes reutilizables y consistentes para toda la aplicación. Todos los componentes están en `components/design-system/`.

## Componentes Disponibles

### Button

Botón reutilizable con múltiples variantes y tamaños.

```typescript
import { Button } from '@/components/design-system';

<Button
  title="Click me"
  onPress={() => {}}
  variant="primary"    // 'primary' | 'secondary' | 'outline' | 'ghost'
  size="medium"        // 'small' | 'medium' | 'large'
  disabled={false}
  loading={false}
  fullWidth={true}
/>
```

**Variantes:**
- `primary`: Botón principal (azul)
- `secondary`: Botón secundario (fondo claro)
- `outline`: Botón con borde
- `ghost`: Botón transparente

**Props:**
- `title` (string, requerido): Texto del botón
- `onPress` (function, requerido): Función al presionar
- `variant` (ButtonVariant): Variante del botón
- `size` (ButtonSize): Tamaño del botón
- `disabled` (boolean): Deshabilitar el botón
- `loading` (boolean): Mostrar indicador de carga
- `fullWidth` (boolean): Ancho completo

### Card

Tarjeta contenedora con variantes de estilo.

```typescript
import { Card } from '@/components/design-system';

<Card
  variant="elevated"    // 'default' | 'elevated' | 'outlined'
  padding="medium"      // 'none' | 'small' | 'medium' | 'large'
>
  <Text>Contenido</Text>
</Card>
```

**Variantes:**
- `default`: Tarjeta básica
- `elevated`: Con sombra elevada
- `outlined`: Con borde

### Input

Campo de texto con validación y estados.

```typescript
import { Input } from '@/components/design-system';

<Input
  label="Email"
  placeholder="tu@email.com"
  value={email}
  onChangeText={setEmail}
  error="Email inválido"
  helperText="Ingresa tu email"
  leftIcon={<Icon name="mail" />}
  rightIcon={<Icon name="check" />}
/>
```

**Props:**
- `label` (string): Etiqueta del campo
- `error` (string): Mensaje de error
- `helperText` (string): Texto de ayuda
- `leftIcon` (ReactNode): Icono izquierdo
- `rightIcon` (ReactNode): Icono derecho
- Todas las props de `TextInput` de React Native

### Badge

Badge para mostrar estados o etiquetas.

```typescript
import { Badge } from '@/components/design-system';

<Badge
  label="Nuevo"
  variant="success"    // 'default' | 'success' | 'warning' | 'error' | 'info'
  size="medium"        // 'small' | 'medium'
/>
```

**Variantes:**
- `default`: Badge neutro
- `success`: Verde (éxito)
- `warning`: Amarillo (advertencia)
- `error`: Rojo (error)
- `info`: Azul (información)

### ProgressBar

Barra de progreso animada.

```typescript
import { ProgressBar } from '@/components/design-system';

<ProgressBar
  progress={75}           // 0-100
  height={8}
  showLabel={true}
  color={Colors.light.tint}
  animated={true}
/>
```

**Props:**
- `progress` (number, 0-100): Porcentaje de progreso
- `height` (number): Altura de la barra
- `showLabel` (boolean): Mostrar porcentaje
- `color` (string): Color de la barra
- `backgroundColor` (string): Color de fondo
- `animated` (boolean): Animación al cambiar

### Modal

Modal reutilizable.

```typescript
import { Modal } from '@/components/design-system';

<Modal
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  title="Título del Modal"
  showCloseButton={true}
  animationType="slide"    // 'none' | 'slide' | 'fade'
>
  <Text>Contenido del modal</Text>
</Modal>
```

**Props:**
- `visible` (boolean): Mostrar/ocultar
- `onClose` (function): Función al cerrar
- `title` (string): Título del modal
- `showCloseButton` (boolean): Mostrar botón de cerrar
- `animationType` (string): Tipo de animación

## Estilos Compartidos

Los estilos base están en `components/design-system/styles.ts`:

```typescript
import { designSystemStyles } from '@/components/design-system';

// Espaciado
designSystemStyles.spacing.xs  // 4
designSystemStyles.spacing.sm  // 8
designSystemStyles.spacing.md  // 16
designSystemStyles.spacing.lg  // 24
designSystemStyles.spacing.xl  // 32

// Bordes
designSystemStyles.borderRadius.sm   // 4
designSystemStyles.borderRadius.md   // 8
designSystemStyles.borderRadius.lg   // 12
designSystemStyles.borderRadius.xl   // 16
designSystemStyles.borderRadius.full // 9999

// Sombras
designSystemStyles.shadow       // Sombra estándar
designSystemStyles.shadowLarge  // Sombra grande
```

## Tema y Colores

Los colores están definidos en `constants/theme.ts`:

```typescript
import { Colors } from '@/constants/theme';

// Colores claros
Colors.light.background
Colors.light.text
Colors.light.tint
Colors.light.success
Colors.light.warning
Colors.light.danger

// Colores oscuros
Colors.dark.background
Colors.dark.text
// ...
```

## Accesibilidad

Todos los componentes incluyen props de accesibilidad:

```typescript
<Button
  title="Click"
  onPress={() => {}}
  accessibilityLabel="Botón para agregar vaso"
  accessibilityHint="Presiona para agregar un vaso de agua"
/>
```

## Mejores Prácticas

### 1. Usar Componentes del Design System

Siempre prefiere los componentes del design system sobre componentes nativos:

```typescript
// ✅ Correcto
import { Button } from '@/components/design-system';
<Button title="Click" onPress={handlePress} />

// ❌ Incorrecto
import { Button } from 'react-native';
<Button title="Click" onPress={handlePress} />
```

### 2. Consistencia en Variantes

Usa las variantes de manera consistente:

```typescript
// ✅ Correcto - Acción principal
<Button variant="primary" title="Guardar" />

// ✅ Correcto - Acción secundaria
<Button variant="secondary" title="Cancelar" />

// ✅ Correcto - Acción destructiva
<Button variant="outline" title="Eliminar" />
```

### 3. Responsive Design

Los componentes se adaptan automáticamente, pero puedes usar `fullWidth` cuando sea necesario:

```typescript
// En formularios
<Input label="Email" fullWidth />
<Button title="Enviar" fullWidth />
```

### 4. Estados de Carga

Usa el prop `loading` en botones durante operaciones asíncronas:

```typescript
const [isSaving, setIsSaving] = useState(false);

<Button
  title="Guardar"
  onPress={handleSave}
  loading={isSaving}
  disabled={isSaving}
/>
```

## Extensión del Sistema

Para agregar nuevos componentes:

1. Crear el componente en `components/design-system/`
2. Seguir la estructura de componentes existentes
3. Agregar tipos en `types.ts` si es necesario
4. Exportar en `index.ts`
5. Agregar tests en `__tests__/components/design-system/`

## Ejemplos de Uso

### Formulario Completo

```typescript
import { Input, Button, Card } from '@/components/design-system';

function LoginForm() {
  return (
    <Card variant="elevated" padding="large">
      <Input
        label="Email"
        placeholder="tu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Contraseña"
        placeholder="••••••••"
        secureTextEntry
      />
      <Button
        title="Iniciar Sesión"
        variant="primary"
        fullWidth
        onPress={handleLogin}
      />
    </Card>
  );
}
```

### Lista con Badges

```typescript
import { Card, Badge } from '@/components/design-system';

function StatsList({ stats }) {
  return stats.map(stat => (
    <Card key={stat.id} variant="outlined">
      <Text>{stat.date}</Text>
      <Badge
        label={stat.percentage >= 100 ? 'Completado' : 'En progreso'}
        variant={stat.percentage >= 100 ? 'success' : 'info'}
      />
    </Card>
  ));
}
```

