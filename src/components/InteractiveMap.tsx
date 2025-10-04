import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Extend Leaflet types for heatLayer
declare module 'leaflet' {
  function heatLayer(
    latlngs: [number, number, number][],
    options?: any
  ): L.Layer;
}

interface InteractiveMapProps {
  activeLayers: Set<string>;
}

const InteractiveMap = ({ activeLayers }: InteractiveMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<Record<string, L.Layer>>({});

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Inicializa o mapa com coordenadas de São Paulo
    const saoPauloCoords: [number, number] = [-23.5505, -46.6333];
    const map = L.map(mapContainerRef.current).setView(saoPauloCoords, 12);
    mapRef.current = map;

    // Adiciona o mapa base da CARTO
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 20,
    }).addTo(map);

    // Função para gerar pontos aleatórios para heatmaps
    function generateRandomPoints(
      center: [number, number],
      radius: number,
      count: number
    ): [number, number, number][] {
      const points: [number, number, number][] = [];
      const [y0, x0] = center;
      const rd = radius / 111300;

      for (let i = 0; i < count; i++) {
        const u = Math.random();
        const v = Math.random();
        const w = rd * Math.sqrt(u);
        const t = 2 * Math.PI * v;
        const x = w * Math.cos(t);
        const y = w * Math.sin(t);
        points.push([y + y0, x + x0, Math.random()]);
      }
      return points;
    }

    // Gera dados para cada camada
    const poluicaoPoints = generateRandomPoints(saoPauloCoords, 8000, 200);
    const calorPoints = generateRandomPoints([-23.54, -46.65], 10000, 250);
    const popPoints = generateRandomPoints([-23.56, -46.63], 12000, 300);

    // Cria as camadas do Leaflet
    layersRef.current = {
      poluicao: L.heatLayer(poluicaoPoints, {
        radius: 25,
        blur: 15,
        gradient: { 0.4: 'blue', 0.6: 'lime', 1: 'red' },
      }),
      calor: L.heatLayer(calorPoints, {
        radius: 30,
        blur: 20,
        gradient: { 0.4: 'cyan', 0.65: 'yellow', 1: 'red' },
      }),
      verde: L.rectangle(
        [
          [-23.4, -46.8],
          [-23.7, -46.5],
        ],
        {
          color: '#a52a2a',
          weight: 0,
          fillOpacity: 0.3,
        }
      ),
      pop: L.heatLayer(popPoints, {
        radius: 20,
        blur: 10,
        gradient: { 0.2: 'lightblue', 0.5: 'violet', 1: 'purple' },
      }),
    };

    // Cleanup ao desmontar
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Atualiza as camadas visíveis quando activeLayers muda
  useEffect(() => {
    if (!mapRef.current) return;

    Object.entries(layersRef.current).forEach(([layerName, layer]) => {
      if (activeLayers.has(layerName)) {
        if (!mapRef.current!.hasLayer(layer)) {
          layer.addTo(mapRef.current!);
        }
      } else {
        if (mapRef.current!.hasLayer(layer)) {
          mapRef.current!.removeLayer(layer);
        }
      }
    });
  }, [activeLayers]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg"
    />
  );
};

export default InteractiveMap;
