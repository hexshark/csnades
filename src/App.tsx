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
  }
  const renderLogos = () => {
    const csmaps = maps()
    // const buttonClass = "size-14 md:size-16 lg:size-20 xl:size-28 p-2 aspect-square"
    const buttonClass = "size-fit max-size-20 p-2 aspect-square"
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
  const resetCur = () => {
    setCurMap("");
    document.cookie = "map=";
  }

  return (
    <div className="p-4 h-screen">
      <div className={ curMap == "" ? "h-auto" : "h-12/100"}>
        <div className="flex justify-center space-x-8">
          <h2 className="font-bold px-6 text-xl lg:text-3xl content-center hidden md:block">
            CS2 Nades - Utility Lineups <span className="font-extrabold cursor-pointer text-xl text-gray-600 hover:text-gray-50" onKeyUp={() => resetCur()} onClick={() => resetCur()}>⟲</span>
          </h2>
          <div className="flex gap-3">{ renderLogos() }</div>
        </div>
      </div>
      <div className={ curMap == "" ? "h-0" : "h-2/100"}/>
      <div className={ curMap == "" ? "h-0" : "h-86/100"}>
        <div className="flex flex-wrap flex-row overflow-auto h-full justify-center">
          { renderMapImages() }
        </div>
      </div>
    </div>
  )
}

export default App
