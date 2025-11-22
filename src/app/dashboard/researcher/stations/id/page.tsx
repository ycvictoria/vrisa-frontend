"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { UsersTable } from "@/components/UsersTable";
import SearchBar from "@/components/SearchBar";
import { Title, Subtitle, Paragraph, SmallText } from "@/components/Text";
import { Station, Variable } from "@/types/data_types";

import { VariableCard } from "@/components/VariableCard";
import { MapPin } from "lucide-react";
import DateFilter, { DateFilterOption } from "@/components/DateFilter";

import ChartVariables from '../../../../../components/ChartVariables';
import ICACard from "@/components/ICACard";

import WeatherVariableSelect from "@/components/WeatherVariableSelector";

export default function stationsInfo({station}:any) {
  
  const [stations, setStation] = useState<Station[]>([]);
  const [search, setSearch] = useState("");

  const [varGrafica, setVarGrafica] = useState("");
  const [filterVariables, setFilterVariables] = useState("all");
  const [variables, setVariables]= useState<Variable[]>([]);

  const [filterDate, setFilterDate] = useState<DateFilterOption>("today");
 
  //  Filtro combinado
const filteredVariables = variables.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.description.toString().includes(search.toLowerCase());
   
    return matchesSearch;
  });
  const [stationSelected, setStationSelected]= useState<Station>();

  //  Cargar usuarios mock

    function getLevel() {
    if (stationSelected?.status === "active") 
      return "text-green-600 bg-green-100";
    if (stationSelected?.status === "maintenance") 
      return "text-yellow-600 bg-yellow-100";
    
     else return "text-gray-600 bg-gray-100";
    };
    
  const statusStation = getLevel();
    
  

  useEffect(() => {
  async function loadUsers() {
    try {
      const res = await fetch("/api/mock/stations");
      if (res.ok) {
        const data = await res.json();
        console.log("stations cargadas:", data);

        setStation(data);
        setStationSelected(data[0]); // 👈 ARREGLADO
      }

      const resVar = await fetch("/api/mock/variables");
      if (resVar.ok) {
        const dataVar = await resVar.json();
        console.log("Variables cargadas:", dataVar);
        console.log("Variables cargadas:", JSON.stringify(dataVar, null, 2));
        setVariables(dataVar);
      }
    } catch (error) {
      console.error("Error cargando estación o variable:", error);
    }
  }

  loadUsers();
}, []);


  
 
  return (
    <div className="space-y-8 ml-2">
      {/* Header */}
      <header className="">
        <Title className="text-3xl">👨🏻‍💻 Estación {stationSelected?.name} </Title>
        <div className="flex-col justify-start gap-4 ">

      <p className="text-md text-gray-600 flex items-center gap-1 mt-1">
        <MapPin size={20} className="text-gray-400" /> Ubicación:  {stationSelected?.ubication.address}
      </p>
           
          <div className="flex flex-row justify-start gap-8 items-center">
          <Paragraph>
          Latitud: {stationSelected?.ubication.latitude}
        </Paragraph>
          <Paragraph>
          Longitude: {stationSelected?.ubication.longitude}
        </Paragraph>

          </div>
        <Paragraph>Lider Técnico: {stationSelected?.opening_date}</Paragraph>
      <div className="flex flex-row justify-start gap-4 mt-2 ">
        <Paragraph>Status: </Paragraph>
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${statusStation}`}
        > {stationSelected?.status }</span>
        
      </div>
        
       
        
        </div>

       
      </header>

      {/* Tabla */}
      <section className="space-y-4">
        {/*
        <ICACard
      contaminant="PM2.5"
      value={100}
      ica={20}
    />*/}
            <SearchBar
            placeholder="Buscar por nombre o ID..."
            onSearch={setSearch}
          />



        <div className="flex-row justify-end gap-4 ">

          <Subtitle className="text-sky-400 ">Variables Meterológicas del día</Subtitle>
          
       
         <div className="flex gap-4 justify-between mb-5 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  {filteredVariables
    .filter((v) => v.category === "Meteorológica")
    .map((v) => (
      <VariableCard
        key={v.idVariable}
        name={v.name}
        category={v.category}
        description={v.description}
        measurement_unit={v.measurement_unit}
        range_min={v.range_min}
        range_max={v.range_max}
        value={100}
      />
    ))}
</div>
        </div>
        </div>

         <div className="flex-row justify-end gap-4 ">
         
          <Subtitle className="text-sky-400">Contaminantes</Subtitle>
       
         <div className="flex gap-4 justify-between mb-5 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {filteredVariables
    .filter((v) => v.category !== "Meteorológica")
    .map((v) => (
      <VariableCard
        key={v.idVariable}
        name={v.name}
        category={v.category}
        description={v.description}
        measurement_unit={v.measurement_unit}
        range_min={v.range_min}
        range_max={v.range_max}
        value={100}
      />
    ))}
</div>
        </div>
        </div>
      
       
        
     {/* Stats  
      name: string;
      location: string;
      status: "active" | "inactive" | "maintenance";
      lastUpdate: string;
      sensors: number;
      alerts?: number; */}

          <Subtitle className="text-sky-400">Gráficas</Subtitle>
          <WeatherVariableSelect value={varGrafica} onChange={setVarGrafica} />

      <ChartVariables  ></ChartVariables>
      </section>
    </div>
  );
}
