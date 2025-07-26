import React from 'react'
import { useState, useRef} from 'react';
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";


const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4; 
    const vidRef = useRef(null)

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);

    }

    const UpcomingIndex = (currentIndex % totalVideos) + 1;

    const HandleMiniVideoClick = () => {
        setIsClicked(true);
        setCurrentIndex((UpcomingIndex));
    }

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  
    useGSAP(() =>{
            if(isClicked){
                gsap.set('#next-video', {visibility: 'visible'})
                gsap.to('#next-video', {
                    transformOrigin: 'center center',
                    scale: 1,
                    width: '100%',
                    height: '100%',
                    duration: 1,
                    ease: 'power1.inOut',
                    onStart: () => vidRef.current.play(),
                })
                gsap.from('#current-video', {
                    transformOrigin: 'center center',
                    scale: 0,
                    duration: 1.5,
                    ease: 'power1.inOut',
                    onStart: () => vidRef.current.play(),
                })
            }

         },{dependencies: [currentIndex], revertOnUpdate: true})


  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        <div id= 'video-frame'className='relative h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
            <div className="mask-clip-path absolute-center absolute z-50 cursor-pointer rounded-r-lg ">
                <div onClick={HandleMiniVideoClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in-out hover:scale-75 hover:opacity-100'>
                <video 
                ref={vidRef}
                src={getVideoSrc(UpcomingIndex)}
                loop
                muted
                autoPlay
                className='size-64 origin-center scale-150 object-cover object-center'
                onLoadedData={handleVideoLoad}
                />
                </div>
                

            </div>
            <video 
            ref={vidRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            autoPlay
            id='next-video'
            className='absolute-center invisible absolute z-20 object-cover object-center '

            />
            <video 
            ref={vidRef}
            src={getVideoSrc(currentIndex=== totalVideos-1 ? 1 : currentIndex)}
            loop
            muted
            autoPlay
            className='absolute left-0 top-0 size-full object-cover object-center'
            />
        </div>
            <h1 className='special-font hero-heading absolute bottom-5
            right-5 z-40 text-blue-75'>g <b> a </b> m i n g</h1>

            <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-324 font-robert-regular text-4xl text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="rounded-full bg-yellow-300 flex-center gap-1"
            />

          </div>
        </div>
        </div>
      
  )
}

export default Hero
