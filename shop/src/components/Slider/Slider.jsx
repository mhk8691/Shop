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
import useProduct from '../../api/useProduct';
import { Chip, CircularProgress, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';


export default function Slider() {
    const { data, isPending } = useProduct()
    console.log(data)
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    const navigate = useNavigate()
    const loaingStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100
    }
    if (isPending) return <CircularProgress color="primary" sx={loaingStyle} />

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

                {data?.map((item) => (
                    <SwiperSlide style={{ position: 'relative', cursor: 'pointer' }} key={item.id} onClick={() => navigate(`/product/${item.id}`)} >
                        <img src={item.images[0]} alt="" />
                        <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 20, left: 20, }}>
                            <Chip label={item.title} color="sungLow" />
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
