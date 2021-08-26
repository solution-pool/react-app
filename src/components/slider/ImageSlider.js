import React,{useState,memo} from 'react';

import SimpleImageSlider from "react-simple-image-slider";
import image1 from './../../images/t_logo.jpg';
import image2 from './../../images/image2.jfif';
import image3 from './../../images/image3.jfif';
import image4 from './../../images/image4.jfif';
import image5 from './../../images/image5.jfif';
import image6 from './../../images/image6.jfif';


const ImageSlider = ()=>  {
    
    {/*image store*/}
    const [images,setImages] = useState([
            { url: image2},
            { url: image1 },
            { url: image3 },
            { url: image4 },
            { url: image5 },
            { url: image6 },
        ]);
    
    {/*Sliber related data*/}
    const [sliderData,setSliderData]  = useState({
            useGPURender: true,
            showNavs: true,
            showBullets: false,
            navStyle: 1,
            slideDuration: 1,
            bgColor: "#000000",
            slideIndexText: "",
            autoPlay: true
        });

    return (
        <div style={{textAlign:'center'}}>
                <SimpleImageSlider
                    style={{ margin: "0 auto", marginTop: "50px" }}
                    width={400}
                    height={200}
                    images={images}
                    showBullets={sliderData.showBullets}
                    showNavs={sliderData.showNavs}
                    useGPURender={sliderData.useGPURender}
                    navStyle={sliderData.navStyle}
                    slideDuration={sliderData.slideDuration}
                    autoPlay = {sliderData.autoPlay}
               
                />
        </div>
    );
}


export default memo(ImageSlider);