import React from 'react';
import preloader from './6b449513765711.56277d303236b.gif'
import '../UI/App.css'

type PropType = {
   preloader?:string
}

const Preloader = (props: PropType) => {
    return <div><img className={props.preloader} src={preloader} alt=""/></div>
}
export default Preloader;

