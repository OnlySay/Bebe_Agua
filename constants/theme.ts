/**
 * Hydro Pixel Theme 💧🎮
 * Paleta de colores para la app de hidratación con estética pixel art.
 */

import { Platform } from 'react-native';

// Colores principales de agua
const tintColorLight = '#00B4D8'; // Azul agua vibrante
const tintColorDark = '#90E0EF';  // Azul claro neón

export const Colors = {
  light: {
    // Fondos
    background: '#E8F4F8',           // Azul muy pálido (agua cristalina)
    backgroundSecondary: '#CAF0F8',  // Azul agua suave

    // Textos
    text: '#023E8A',                 // Azul profundo (océano)
    textSecondary: '#0077B6',        // Azul medio

    // Acentos
    tint: tintColorLight,
    accent: '#48CAE4',               // Turquesa brillante
    success: '#06D6A0',              // Verde agua (¡objetivo cumplido!)
    warning: '#FFD166',              // Amarillo pixel (recordatorio)
    danger: '#EF476F',               // Rosa/rojo pixel (deshidratado)

    // UI Elements
    icon: '#0096C7',
    tabIconDefault: '#90A4AE',
    tabIconSelected: tintColorLight,

    // Pixel art - Estados del agua
    water: '#00B4D8',                // Gota de agua
    waterLight: '#90E0EF',           // Reflejo del agua
    waterDark: '#0077B6',            // Sombra del agua
    bubble: '#CAF0F8',               // Burbujas
  },
  dark: {
    // Fondos
    background: '#03071E',           // Azul noche profundo
    backgroundSecondary: '#0A1628',  // Azul medianoche

    // Textos
    text: '#CAF0F8',                 // Azul hielo
    textSecondary: '#90E0EF',        // Azul claro

    // Acentos
    tint: tintColorDark,
    accent: '#00B4D8',               // Turquesa neón
    success: '#06D6A0',              // Verde neón
    warning: '#FFD166',              // Amarillo neón
    danger: '#EF476F',               // Rosa neón

    // UI Elements
    icon: '#48CAE4',
    tabIconDefault: '#4A5568',
    tabIconSelected: tintColorDark,

    // Pixel art - Estados del agua
    water: '#00B4D8',
    waterLight: '#48CAE4',
    waterDark: '#0077B6',
    bubble: '#90E0EF',
  },
};

// Gradientes para efectos de agua (útil para backgrounds animados)
export const Gradients = {
  water: ['#CAF0F8', '#90E0EF', '#00B4D8'],
  ocean: ['#48CAE4', '#0096C7', '#0077B6'],
  nightWater: ['#023E8A', '#0077B6', '#00B4D8'],
  sunrise: ['#FFD166', '#48CAE4', '#00B4D8'],
};

// Niveles de hidratación con colores
export const HydrationLevels = {
  critical: '#EF476F',    // 0-25% - Muy deshidratado
  low: '#FFD166',         // 25-50% - Necesitas agua
  good: '#48CAE4',        // 50-75% - Vas bien
  optimal: '#06D6A0',     // 75-100% - ¡Excelente!
};

export const Fonts = Platform.select({
  ios: {
    pixel: 'PressStart2P-Regular',
    pixelMono: 'VT323-Regular',
  },
  android: {
    pixel: 'PressStart2P-Regular',
    pixelMono: 'VT323-Regular',
  },
  default: {
    pixel: 'PressStart2P-Regular',
    pixelMono: 'VT323-Regular',
  },
  web: {
    pixel: "'Press Start 2P', cursive",
    pixelMono: "'VT323', monospace",
  },
});
