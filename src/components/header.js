import React from "react";
import "./comp.css";
import { RiLayoutGridLine, RiLayoutRowLine } from "react-icons/ri";

export default function Header({layt, layout}){
    return(
        <header><img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"/><p>Keep clone</p>
        <button className='hbtn' onClick={()=>layt()}>
            {layout ? <RiLayoutRowLine/> :<RiLayoutGridLine/>}
            </button>
        </header>
    )
}