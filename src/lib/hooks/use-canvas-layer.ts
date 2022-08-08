import { useState } from 'react';

// const

/*
type
rect = {
  method:rect,
  info:{
    x:number,
    y:number,
    width:number,
    height:number
  },
  styles:{
    fillStyle:string | null,
    lineWidth:number | null,
    strokeStyle:string | null,
  }

}

*/

const useCanvasLayer = () => {
  const [canvasLayer, setCanvasLayer] = useState([]);

  const addCanvasLayer = () => {};

  const updateCanvasLayer = () => {};

  const removeCanvasLayer = () => {};
  return {
    canvasLayer,
    addCanvasLayer,
  };
};

export { useCanvasLayer };
