import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ center, markers =['a'] }) => {
  const iconBus = L.icon({ iconUrl: '/marker-icon.png', iconSize: [25,41], iconAnchor: [12,41], popupAnchor: [0,-30] });
  const iconTruck = L.icon({ iconUrl: '/marker-orange.png', iconSize: [25,41], iconAnchor: [12,41], popupAnchor: [0,-30] });

  return (
    <MapContainer center={[-7.852,110.325]} zoom={6} scrollWheelZoom={false} className="grow">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((e,i) => (
        <Marker key={i} position={[Number(e.latitude), Number(e.longitude)]} icon={(e.lo?.type == 'bus') ? iconBus : iconTruck}>
          <Popup>
            <div className="p-3">
              <h1 className="text-lg">
                {e.place_at} <br/>
                <span className={`text-md text-white px-3 bg-red-500 rounded ml-2
                  ${e.status == 'start' ? 'bg-gray-500'
                    : e.status == 'end' ? 'bg-yellow-500'
                    : 'bg-red-500'}
                  `}>{e.name} {e.status}</span>
              </h1>
              <p className="text-sm" style={{ marginBottom: 0}}>Tanggal</p>
              <p className="" style={{ margin: 0, fontSize: '16px' }}>
                {(new Date(e.date_at)).toLocaleDateString('id', {year: 'numeric', month: 'long', day: 'numeric'})}
              </p>
              <p className="text-sm" style={{ marginBottom: 0 }}>Jam</p>
              <p className="" style={{ margin: 0, fontSize: '16px' }}>
                {(new Date(`${e.date_at} ${e.time_at}`)).toLocaleTimeString('id', {hour: '2-digit', minute: '2-digit'}) + ' WIB'}
              </p>
              <div className="flex items-center justify-between">
                <p>LO: {e.lo ? e.lo.name : '-'}</p>
                {e.lo ? <a href={`tel:${e.lo.phone}`} >
                  <svg className="rounded-full bg-maincolor w-7 h-7 p-1.5" width="17" height="17" viewBox="0 0 17 17" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5833 11.9849V14.1099C15.5841 14.3072 15.5437 14.5024 15.4647 14.6832C15.3857 14.8639 15.2698 15.0262 15.1244 15.1596C14.979 15.2929 14.8074 15.3945 14.6205 15.4577C14.4337 15.5209 14.2356 15.5443 14.0392 15.5266C11.8595 15.2897 9.76579 14.5449 7.92625 13.352C6.2148 12.2645 4.76378 10.8134 3.67625 9.10199C2.47915 7.25409 1.73417 5.15019 1.50167 2.96074C1.48397 2.76486 1.50725 2.56744 1.57002 2.38106C1.6328 2.19467 1.7337 2.02339 1.86629 1.87814C1.99889 1.73288 2.16028 1.61683 2.34019 1.53736C2.52009 1.45789 2.71458 1.41676 2.91125 1.41657H5.03625C5.38001 1.41319 5.71327 1.53492 5.97392 1.75907C6.23456 1.98323 6.40481 2.29451 6.45292 2.63491C6.54261 3.31495 6.70894 3.98267 6.94875 4.62532C7.04405 4.87885 7.06468 5.15439 7.00818 5.41928C6.95169 5.68417 6.82045 5.92732 6.63 6.11991L5.73042 7.01949C6.73877 8.79283 8.20707 10.2611 9.98042 11.2695L10.88 10.3699C11.0726 10.1795 11.3157 10.0482 11.5806 9.99172C11.8455 9.93523 12.1211 9.95585 12.3746 10.0512C13.0172 10.291 13.685 10.4573 14.365 10.547C14.7091 10.5955 15.0233 10.7688 15.248 11.034C15.4726 11.2991 15.592 11.6375 15.5833 11.9849Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a> : null}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>,
  )
}

export default LeafletMap;