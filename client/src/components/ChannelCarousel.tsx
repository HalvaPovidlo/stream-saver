import React, {useRef} from 'react';
import Record from "./Record.jsx";
import {IconButton} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const ChannelCarousel = ({channelRecords, openPlayer}) => {
    const carouselRef = useRef(null);
    function scrollLeft(){
        const carousel = carouselRef.current;
        console.log(-carousel.clientWidth)
        if (carousel) {
            carousel.scrollBy({
                left: -carousel.clientWidth,
                behavior: 'smooth',
            });
        }
    }
    function scrollRight(){
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.scrollBy({
                left: carousel.clientWidth,
                behavior: 'smooth',
            });
        }
    }
    return (
        <div className={'carousel'} >
            <IconButton onClick={scrollLeft} size="large" sx={{height: 100}}>
                <ChevronLeft fontSize="large"/>
            </IconButton>

            <div className={"carousel-videos"}  ref={carouselRef}>
                {channelRecords.map(r => <Record key={r.id} openPlayer={openPlayer} record={r}></Record>)}
            </div>
            <IconButton onClick={scrollRight} size={"large"} sx={{height: 100}}>
                <ChevronRight fontSize={"large"}/>
            </IconButton>
        </div>
    )
};
export default ChannelCarousel;

