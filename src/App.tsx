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
  const renderLogos = () => {
    const csmaps = maps()
    const buttonClass = "size-14 md:size-16 lg:size-20 xl:size-28 p-2 aspect-square"
    const mapLogo = (name: string) => 
      <button className={ name == curMap? "current-map " + buttonClass : buttonClass } key={name} onClick={() => setMap(name)}>
        <img src={"/csnades/cs/maps/" + name + "_logo.png"} alt={name} />
      </button>
    
    return csmaps.map(m => {
      return mapLogo(m)
    })
  }

  const renderMapImages = () => {
    if (curMap) {
      return <Map map={curMap} />
    }
    return <></>
  }

  return (
    <>
      <div className="p-4 h-screen">
        <div className="flex justify-center space-x-8">
          <h2 className="font-bold px-6 text-2xl lg:text-4xl content-center hidden md:block">CS2 Nades - Utility Lineups</h2>
          <div className="flex gap-3">{ renderLogos() }</div>
        </div>
        <br/>
        <div className="h-9/10">
          <div className="flex flex-wrap flex-row overflow-auto h-full justify-center">
            { renderMapImages() }
          </div>
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
