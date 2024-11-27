import React, { useState, useRef, useEffect } from "react";
import "./Slider.scss";

const Slider = ({ children }) => {
    const [offset, setOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [lastItem, setLastItem] = useState(false)
    const containerRef = useRef(null);
    const carouselRef = useRef(null);

    useEffect(()=> {
        if (offset===(-(carouselRef.current.clientWidth - containerRef.current.clientWidth))) {
            setLastItem(true)
        } else {
            setLastItem(false)
        }
    }, [offset])

  
    const handleMouseDown = (e) => {
      setDragging(true);
      setStartX(e.clientX - offset);
    };
  
    const handleMouseUp = () => {
        const slideWidth = carouselRef.current.clientWidth / 12
        setOffset(Math.floor(offset/slideWidth)*slideWidth)
        console.log(offset)
      setDragging(false);
    };
  
    const handleMouseMove = (e) => {
        if (dragging) {
            const newOffset = e.clientX - startX;
            const containerWidth = containerRef.current.clientWidth // ширина контейнера, например, с помощью ref
            const carouselWidth = carouselRef.current.clientWidth // ширина карусели, например, с помощью ref
        
            // Ограничиваем перемещение, чтобы карусель не выходила за границы
            if (newOffset < 0 && Math.abs(newOffset) <= carouselWidth - containerWidth) {
              setOffset(newOffset);
            } else if (newOffset >= 0) {
              setOffset(0);
            } else if (Math.abs(newOffset) > carouselWidth - containerWidth) {
              setOffset(-(carouselWidth - containerWidth));
            }
          }
    };

    const handleMouseLeave = () => {
        const slideWidth = carouselRef.current.clientWidth / 12
        setOffset(Math.floor(offset/slideWidth)*slideWidth)   
        console.log(offset)
        if (dragging) {
          setDragging(false);
        }
      };

      const handleNext = () => {
    const slideWidth = carouselRef.current.clientWidth / 12
    const newOffset = offset - slideWidth;
    const containerWidth = containerRef.current.clientWidth // ширина контейнера, например, с помощью ref
    const carouselWidth = carouselRef.current.clientWidth // ширина карусели, например, с помощью ref
    // Ограничиваем перемещение, чтобы карусель не выходила за границы
    if (Math.abs(newOffset) <= carouselWidth - containerWidth) {
      setOffset(newOffset);
    } else if (Math.abs(newOffset) > carouselWidth - containerWidth) {
      setOffset(-(carouselWidth - containerWidth));
    }
      };
      
      const handlePrev = () => {
        const slideWidth = carouselRef.current.clientWidth / 12
        const newOffset = offset + slideWidth;
        // Ограничиваем перемещение, чтобы карусель не выходила за границы
        if (newOffset < 0) {
          setOffset(newOffset);
        } else if (newOffset >= 0) {
          setOffset(0);
        } 
      };
  
    return (

        <div className="first">
            <div className="left click" style={{'opacity': offset===0 ? '0.5' : '1'}} onClick={handlePrev}>{'<<'}</div>
        <div className="big">
            
      <div className="slider-container"
      ref={containerRef}
       
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >

        <div className="slider"
        ref={carouselRef}
          style={{
            transform: `translateX(${offset}px)`,
            transition: 'transform 0.15s',

          }}
        >
          { children }
        </div>
        </div>
        </div>
        <div className="right click"  style={{'opacity': lastItem ? '0.5' : '1'}} onClick={handleNext} >{'>>'}</div>
        </div>

      
    );
  };

export default Slider;