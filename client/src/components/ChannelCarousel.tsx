import React, {useRef} from "react";
import {Record} from "../store/RecordStore";
import RecordCard from "./Record";
import {IconButton} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

interface IChannelCarouselProps {
    openPlayer: (videoURL: string) => void;
    channelRecords: Record[];
}

const ChannelCarousel = (props: IChannelCarouselProps) => {
    const {
        channelRecords,
        openPlayer,
    } = props

    const scrollableRef = useRef<HTMLDivElement>(null);

    function scrollLeft(): void {
        const scrollable = scrollableRef.current;
        if (scrollable) {
            scrollable.scrollBy({
                left: -scrollable.clientWidth,
                behavior: "smooth",
            });
        }
    }

    function scrollRight(): void {
        const scrollable = scrollableRef.current;
        if (scrollable) {
            scrollable.scrollBy({
                left: scrollable.clientWidth,
                behavior: "smooth",
            });
        }
    }

    return (
        <div className={"carousel"}>
            <IconButton onClick={scrollLeft} size="large" sx={{height: 100}}>
                <ChevronLeft fontSize="large"/>
            </IconButton>

            <div className={"carousel-videos"} ref={scrollableRef}>
                {channelRecords.map((r: Record) => (
                    <RecordCard
                        key={r.id}
                        openPlayer={openPlayer}
                        record={r}
                    ></RecordCard>
                ))}
            </div>
            <IconButton onClick={scrollRight} size={"large"} sx={{height: 100}}>
                <ChevronRight fontSize={"large"}/>
            </IconButton>
        </div>
    );
};
export default ChannelCarousel;
