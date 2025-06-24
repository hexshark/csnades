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
    const filepath = "/csnades/cs/" + props.map;
    const allImages = JSON.parse(JSON.stringify(mapImages)) as AllMapImages
    const images = allImages[props.map];
    const setSelect = (img: string) => {
        if (selected != img) {
            setSelected(img)
        }
        else {
            setSelected("")
        }
    }
    const imgClass = (img: string) => {
        let baseClass = "map-preview min-size-50 xs:size-50 sm:size-60 md:size-70 lg:size-80 xl:size-100 2xl:size-120 px-2";
        if (img == selected) {
            baseClass += " selected"
        }
        return baseClass;
    }

    return (
        <>
            {
                images.map((image: string, index: number) => {
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
        </>
    )
}