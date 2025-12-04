// components/ICACard.tsx
"use client";


export default function ICACard({ contaminant, value, ica }: any) {
    // utils/icaLevel.ts
 function getICALevel(ica: number) {
  if (ica <= 50)
    return { level: "Bueno", color: "green", desc: "El aire es limpio." };

  if (ica <= 100)
    return { level: "Moderado", color: "yellow", desc: "Riesgo leve para sensibles." };

  if (ica <= 150)
    return { level: "Dañino para sensibles", color: "orange", desc: "Evitar exposición prolongada." };

  if (ica <= 200)
    return { level: "Dañino", color: "red", desc: "Puede afectar a cualquier persona." };

  if (ica <= 300)
    return { level: "Muy Dañino", color: "purple", desc: "Riesgo serio para la salud." };

  return { level: "Peligroso", color: "rose", desc: "Alerta de emergencia." };
}

  const { level, color, desc } = getICALevel(ica);
  

  return (
    <div
      className={`rounded-2xl p-5 shadow-md border-l-8 border-${color}-500 bg-${color}-50`}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">{contaminant}</h2>
        <span className={`text-${color}-600 font-bold text-lg`}>
          ICA: {Math.round(ica)}
        </span>
      </div>

      <div className="flex justify-between mb-2">
        <p className="text-gray-700">Valor:</p>
        <p className="font-medium">{value}</p>
      </div>

      <div className="mt-2">
        <span
          className={`inline-block px-3 py-1 rounded-full text-white bg-${color}-600 text-sm font-medium`}
        >
          {level}
        </span>
      </div>

      <p className="text-gray-600 mt-3 text-sm">{desc}</p>
    </div>
  );
}
