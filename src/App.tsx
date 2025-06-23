import { useState } from "react"
import "./App.css"
import mapPool from "../data/map_pool.json"
import Map from "./Map"

const cookie = document.cookie;
let cookieMap = "";
if (cookie) {
  const cookieData = cookie.split("=");
  if (cookieData[0] == "map") {
    cookieMap = cookieData[1];
  }
}

function App() {
  const [curMap, setCurMap] = useState(cookieMap)
  
  type MapType = {
    map: string,
    name: string
  }
  type MapPool = {
    maps: MapType[]
  }
  const mp: MapPool = JSON.parse(JSON.stringify(mapPool)) as MapPool;
  
  const maps = (field?: string) => {
    return mp.maps.map((m) => {
      if (field === "name") {
        return m.name
      }
      return m.map
    })
  }
  const setMap = (name: string) => {
    setCurMap(name)
    document.cookie = "map=" + name + ";"
    // console.log(curMap, document.cookie);
  }
  const renderMaps = () => {
    const csmaps = maps()
    const mapLogo = (name: string) => 
      <button className={ name == curMap? "current-map p-2 aspect-square" : "p-2 aspect-square" } key={name} onClick={() => setMap(name)}>
        <img src={"/cs/maps/" + name + "_logo.png"} className="min-w-20 min-h-20 w-20 h-20" alt={name} />
      </button>
    
    return csmaps.map(m => {
      return mapLogo(m)
    })
  }

  return (
    <>
      <div className="px-4">gh
        <h2 className="font-bold text-4xl">CS2 Nades - Utility Lineups</h2>
        <br/>
        <div className="flex gap-3">{ renderMaps() }</div>
        <br/>
        <div className="flex flex-wrap flex-row">
          <Map map={curMap} />
        </div>
      </div>
      {/* <div className="card">
        <div className="flex" style={{ minWidth: "100%" }}>
          <a className="preview w-100 h-100" style={{ backgroundImage: `url("/Z.jpg")` }} />
        </div>
        <br/>
        <img src="/cs/de_ancient/A - boost molly from halls - RJT.jpg" className="preview w-100 h-100" alt="ancient" />
        <img src="/cs/de_ancient/A - boost molly from halls - RJT.jpg" className="hidden" alt="ancient" />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
