import { useState } from "react";
import mapImages from "../data/images.json"

interface MapProps {
    map: string;
}

type AllMapImages = {
    [key: string]: string[]
}

export default function Map(props: Readonly<MapProps>) {
    const [selected, setSelected] = useState("")
    const filepath = "/cs/" + props.map;
    const allImages = JSON.parse(JSON.stringify(mapImages)) as AllMapImages
    const images = allImages[props.map];
    // console.log(filepath)
    // console.log(images[0])
    const setSelect = (img: string) => {
        if (selected != img) {
            setSelected(img)
        }
        else {
            setSelected("")
        }
    }
    const imgClass = (img: string) => {
        let baseClass = "map-preview min-size-50 size-200 sm:size-100 md:size-150 lg:size-120 px-2";
        if (img == selected) {
            baseClass += " selected"
        }
        return baseClass;
    }

    return (
        <>
        {
            images.map((image: string, index: number) => {
                // console.log(image);
                const imgpath = filepath + "/" + image;
                console.log(imgpath)
                return (
                    <div key={image+index.toString()} className="flex decoration-sky-500" onClick={() => setSelect(image)}>
                        <a className={ imgClass(image) } style={{ backgroundImage: `url("${imgpath}")` }}>
                            <span className="text-shadow-lg/30">{ image }</span>
                        </a>
                    </div>
                )
            })
        }
        {/* <div className="flex" style={{ minWidth: "100%" }}>
          <a className="preview w-100 h-100" style={{ backgroundImage: `url("${  }")` }} />
        </div>
        <br/>
        <img src="/cs/de_ancient/A - boost molly from halls - RJT.jpg" className="preview w-100 h-100" alt="ancient" />
        <img src="/cs/de_ancient/A - boost molly from halls - RJT.jpg" className="hidden" alt="ancient" /> */}
        </>
    )
}