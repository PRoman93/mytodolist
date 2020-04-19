import React from 'react';
import preloader from './accets/6b449513765711.56277d303236b.gif'
import './App.css'

type PropType = {
   preloader?:string | undefined //??????????????/
}
const Preloader = (props: PropType) => {

    return <div><img className={props.preloader} src={preloader} alt=""/></div>
}
export default Preloader;

