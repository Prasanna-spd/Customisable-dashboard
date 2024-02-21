import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Image = ({ index, id, url, name, onRemove, onDragEnd }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: {index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDragEnd(index, dropResult.index);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (item, monitor) => {
      if (!drag) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = drag.current?.getBoundingClientRect();
      if (!hoverBoundingRect) {
        return;
      }
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onDragEnd(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className="image-container" ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1, padding: '5px', margin: '5px', display: 'inline-block'}}>
      <img src={url} alt={name} className='image' />
    </div>
  );
};

export default Image;
