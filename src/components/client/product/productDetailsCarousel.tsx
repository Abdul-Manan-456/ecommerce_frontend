import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Thumb } from "@/components/client/button/productCarouselThumb";

import { EmblaCarouselType } from 'embla-carousel'
interface CarouselProps {
    selectedProduct: {
        imageData: []
    }
}
const ProductDetailsCarousel: React.FC<CarouselProps> = ({ selectedProduct }) => {

    const addToggleThumbBtnsActive = (
        emblaApiMain: EmblaCarouselType,
        emblaApiThumb: EmblaCarouselType
    ): (() => void) => {
        const slidesThumbs = emblaApiThumb.slideNodes()

        const toggleThumbBtnsState = (): void => {
            emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap())
            const previous = emblaApiMain.previousScrollSnap()
            const selected = emblaApiMain.selectedScrollSnap()
            slidesThumbs[previous].classList.remove('embla-thumbs__slide--selected')
            slidesThumbs[selected].classList.add('embla-thumbs__slide--selected')
        }

        emblaApiMain.on('select', toggleThumbBtnsState)
        emblaApiThumb.on('init', toggleThumbBtnsState)

        return (): void => {
            const selected = emblaApiMain.selectedScrollSnap()
            slidesThumbs[selected].classList.remove('embla-thumbs__slide--selected')
        }
    }

    //@ts-check
    //
    //


    const images = selectedProduct.imageData && selectedProduct.imageData.map(item => ({ img: item }))

    const imageByIndex = (index: number): string =>
        images[index % images.length].img;

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const onThumbClick = useCallback(
        (index: number) => {
            if (!api) return;
            api.scrollTo(index);
        },
        [api]
    );

    useEffect(() => {
        if (!api) {
            return;
        }
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);
    return (
        <div className="flex">
            <div className={` flex flex-col w-28 mr-8 items-center justify-center `}>
                {images && images.map((_, index) => (
                    <Thumb
                        onClick={() => onThumbClick(index)}
                        selected={index === current}
                        index={index}
                        imgSrc={imageByIndex(index)}
                        key={index}
                    />
                ))}
            </div>
            <Carousel
                opts={{ loop: true }}
                setApi={setApi}
                className="w-full  "
            >
                <CarouselContent>
                    {images && images.map((image, index) => (
                        <CarouselItem className="" key={index}>
                            <div className="p-0">
                                <Card className=" flex border-none items-center justify-center rounded-none">
                                    <CardContent className="p-0 w-full h-full">
                                        <Image
                                            src={image.img}
                                            width={1000}
                                            height={1000}
                                            style={{
                                                width: '100vw',
                                                height: "auto",
                                            }}
                                            alt=""
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* <CarouselPrevious
                    variant={"default"}
                    className="bg-stone-600/50 hover:bg-stone-700/80"
                />
                <CarouselNext
                    variant={"default"}
                    className="bg-stone-600/50 hover:bg-stone-700/80"
                /> */}
            </Carousel>

        </div>
    )
}

export default ProductDetailsCarousel


// const images = [
//     { img: "/images/carousel/c_1.jpg" },
//     { img: "/images/carousel/c_2.jpg" },
//     { img: "/images/carousel/c_3.jpg" },
//     { img: "/images/carousel/c_4.jpg" },
//     { img: "/images/carousel/c_5.jpg" },
// ];