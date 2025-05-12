import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useEffect } from 'react';

const Map = () => {
   useEffect(() => {
      if (!document.getElementById('map')?.hasChildNodes()) {
         const map = L.map('map').setView([41.8781, -87.6298], 5);

         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
         }).addTo(map);

         // L.Routing.control({
         //    waypoints: [
         //       L.latLng(41.8781, -87.6298), // Chicago
         //       L.latLng(42.3314, -83.0458), // Detroit
         //    ],
         //    routeWhileDragging: false,
         //    addWaypoints: false,
         //    show: false,
         // }).addTo(map);
      }
   }, []);

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
