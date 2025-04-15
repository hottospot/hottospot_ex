import { useAtom } from "jotai";
import { locationPositionAtom } from "../../../atoms/locationPositionAtom";

function PlaceInfo() {
  const [position, _] = useAtom(locationPositionAtom); //押した場所の情報
  console.log("position", position);

  return (
    <div>
      <div>{position.name}</div>
    </div>
  );
}

export default PlaceInfo;
