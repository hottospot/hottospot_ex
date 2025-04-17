import { useAtom } from 'jotai'
import { locationPositionAtom } from '../../../atoms/locationPositionAtom'
import { GetMethod } from '../../ResponseMethod'

function PlaceInfo() {
  const [position, _] = useAtom(locationPositionAtom) //押した場所の情報
  //console.log('position', position)

  //const latMin = 

  const getDetail = async() => {
    //console.log('aaaaa')

  }

  return (
    <div>
      <div>{position.name}</div>
      <button onClick={() => getDetail()}>aaaaa</button>
    </div>
  )
}

export default PlaceInfo
