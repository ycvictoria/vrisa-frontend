import Button from "@/components/Button";
import { Title, Subtitle, Paragraph } from "@/components/Text";
import Clock from "@/components/Clock";

export default function ResearcherPage() {
    
  return (
    <div className="space-y-3 flex-col gap-4 border shadow-sm p-4 ml-5">
      <Title>👩🏻‍🔬 Dashboard de Investigador</Title>
        <Subtitle>Bienvenido</Subtitle>
        
     
      <ul className="space-y-3 flex-col ap-4  ">
        <li className="p-4 bg-white rounded-xl  ">
            <Button>Ver Mis estaciones</Button>
        </li>
          <li className="p-4 bg-white rounded-xl  ">
        
            <Button>Crear Reportes</Button>
        </li>
          <li className="p-4 bg-white rounded-xl   ">
           
            <Button>Ver Alertas Criticas y Mantemiento</Button>
        </li>
      
      </ul>
      <Clock></Clock>
    </div>
  );
}