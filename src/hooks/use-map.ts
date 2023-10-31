import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import City from '../types/city';
import { MAP_LAYER_URL, OPENSOURCE_ATTRIBUTION } from '../const';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(
        mapRef.current,
        {
          center: {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          zoom: city.location.zoom,
        });

      leaflet
        .tileLayer(
          MAP_LAYER_URL,
          {
            attribution: OPENSOURCE_ATTRIBUTION,
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}
