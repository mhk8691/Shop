import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Slider.css';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useProducts from '../../api/useProduct';
import { Chip, Stack } from '@mui/material';


export default function Slider() {
    const { data } = useProducts()
    console.log(data)
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                {/* <SwiperSlide><img className='img-slider' src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x800.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='img-slider' src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x800.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='img-slider' src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x800.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='img-slider' src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x800.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='img-slider' src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x800.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='img-slider' src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x800.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='img-slider' src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x800.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='img-slider' src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE-1200x800.jpg" alt="" /></SwiperSlide> */}
                {data?.map((item) => (
                    // <SwiperSlide><img src={item.images[0]} alt="" /></SwiperSlide>
                    <SwiperSlide style={{ position: 'relative' }}>
                        <img src={item.images[0]} alt="" />
                        <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 20, left: 20, }}>
                            <Chip label={item.title} color="sungLow"  />
                        </Stack>
                    </SwiperSlide>
                ))}
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    );
}
