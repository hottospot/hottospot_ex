import { atom } from 'jotai';
import { LocationData } from '../components/PinLocate';

export const locationPositionAtom = atom<LocationData>({
  latitude: null,
  longitude: null,
  name: null,
  explanation: null,
  address: null,
  likeCount: null,
  locationId: null,
  photo: null,
});
