// UI-only metadata for services — icon and color are FE display concerns not stored in the BE
export const servicesMeta: Record<string, { icon: string; color: string }> = {
  electricidad:       { icon: "⚡", color: "bg-yellow-500" },
  plomeria:           { icon: "🔧", color: "bg-blue-500" },
  "aire-acondicionado": { icon: "❄️", color: "bg-cyan-500" },
  pintura:            { icon: "🎨", color: "bg-purple-500" },
  carpinteria:        { icon: "🔨", color: "bg-amber-500" },
  limpieza:           { icon: "🧹", color: "bg-green-500" },
  cerrajeria:         { icon: "🔑", color: "bg-gray-500" },
  jardineria:         { icon: "🌱", color: "bg-emerald-500" },
};
