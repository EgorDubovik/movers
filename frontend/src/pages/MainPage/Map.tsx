import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useEffect } from 'react';
import { IJob } from '../../types';
import { useRef } from 'react';
const Map = ({ jobs }: { jobs: IJob[] }) => {
   const mapRef = useRef<L.Map | null>(null);
   const markersRef = useRef<L.Marker[]>([]);

   // 1. Инициализация карты только один раз
   useEffect(() => {
      if (!mapRef.current) {
         mapRef.current = L.map('map').setView([41.8781, -87.6298], 5);
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
         }).addTo(mapRef.current);
      }
      // Очистка карты при размонтировании
      return () => {
         if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
         }
      };
   }, []);

   // 2. Рендер маркеров при изменении jobs
   useEffect(() => {
      if (!mapRef.current) return;

      // Удалить старые маркеры
      markersRef.current.forEach((marker) => mapRef.current?.removeLayer(marker));
      markersRef.current = [];

      // Добавить новые маркеры
      jobs?.forEach((job) => {
         const marker = L.marker([job.pickupLocation.latitude!, job.pickupLocation.longitude!]);
         marker.addTo(mapRef.current!);
         markersRef.current.push(marker);
      });

      // Подогнать карту под маркеры (опционально)
      if (jobs && jobs.length) {
         const bounds = L.latLngBounds(jobs.map((job) => [job.pickupLocation.latitude!, job.pickupLocation.longitude!]));
         mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
      }
   }, [jobs]);

   return (
      <div className="my-8 panel px-0 pb-0 overflow-hidden">
         <h2 className="text-lg font-semibold text-gray-900 dark:text-white-light mb-4 px-6">Route Visualization</h2>
         <div id="map" className="w-full h-[400px]" />
         {/* <MapContainer center={[41.8781, -87.6298]} zoom={5} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         </MapContainer> */}
      </div>
   );
};

export default Map;
