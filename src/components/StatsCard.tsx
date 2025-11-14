import { Paragraph } from "./Text";
export function StatsCard({ title, value, icon }: any) {
  return (
    <div className="rounded-xl border  p-6 shadow-md">
      <div className="flex justify-between">
        <Paragraph>{title}</Paragraph>
        
        <span>{icon}</span>
      </div>
      <p className="mt-3 text-3xl text-gray-400 font-semibold">{value}</p>
    </div>
  );
}
