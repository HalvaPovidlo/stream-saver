import React, {useRef} from 'react';
import Record from "./Record";
import {IconButton} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const ChannelCarousel = ({
    channelRecords,
    openPlayer
}: any) => {
    const carouselRef = useRef(null);
    function scrollLeft(){
        const carousel = carouselRef.current;
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        console.log(-carousel.clientWidth)
        if (carousel) {
            // @ts-expect-error TS(2339): Property 'scrollBy' does not exist on type 'never'... Remove this comment to see the full error message
            carousel.scrollBy({
                // @ts-expect-error TS(2339): Property 'clientWidth' does not exist on type 'nev... Remove this comment to see the full error message
                left: -carousel.clientWidth,
                behavior: 'smooth',
            });
        }
    }
    function scrollRight(){
        const carousel = carouselRef.current;
        if (carousel) {
            // @ts-expect-error TS(2339): Property 'scrollBy' does not exist on type 'never'... Remove this comment to see the full error message
            carousel.scrollBy({
                // @ts-expect-error TS(2339): Property 'clientWidth' does not exist on type 'nev... Remove this comment to see the full error message
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
                {channelRecords.map((r: any) => <Record key={r.id} openPlayer={openPlayer} record={r}></Record>)}
            </div>
            <IconButton onClick={scrollRight} size={"large"} sx={{height: 100}}>
                <ChevronRight fontSize={"large"}/>
            </IconButton>
        </div>
    );
};
export default ChannelCarousel;

