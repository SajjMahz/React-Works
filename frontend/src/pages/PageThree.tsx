import React, { useState } from 'react';

function Draggable(props:any) {
  const handleDragStart = (event:any) => {
    event.dataTransfer.setData("text/plain", props.children);
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
    >
      {props.children}
    </div>
  );
}


function DropZone(props:any) {
  const handleDragOver = (event:any) => {
    event.preventDefault();
  };

  const handleDrop = (event:any) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    props.onDrop(id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {props.children}
    </div>
  );
}





const PageThree = () => {

  const [droppedItem, setDroppedItem] = useState(null);

  const handleDrop = (id:any) => {
    setDroppedItem(id);
  };
  
  return <div>PageThree

  <Draggable id="item1">Item 111111 💩 </Draggable>
      <Draggable id="item2">Item 2</Draggable>
      <DropZone onDrop={handleDrop}>
        {droppedItem ? `Dropped item: ${droppedItem}` : "Drop here"}
      </DropZone>
  </div>;
};

export default PageThree;
