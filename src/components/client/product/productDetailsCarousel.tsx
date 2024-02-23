import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Thumb } from "@/components/client/button/productCarouselThumb";

const ProductDetailsCarousel = () => {
    const images = [
        { img: "/images/carousel/c_1.jpg" },
        { img: "/images/carousel/c_2.jpg" },
        { img: "/images/carousel/c_3.jpg" },
        { img: "/images/carousel/c_4.jpg" },
        { img: "/images/carousel/c_5.jpg" },
    ];
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
        <div className="relative">
            <Carousel
                opts={{ loop: true }}
                setApi={setApi}
                className="w-full h-landingCarousel "
            >
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem className="" key={index}>
                            <div className="p-0">
                                <Card className="h-landingCarousel flex border-none items-center justify-center rounded-none">
                                    <CardContent className="p-0 w-full h-full">
                                        <Image
                                            src={image.img}
                                            width={1000}
                                            height={1000}
                                            style={{
                                                width: '100%',
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
                <CarouselPrevious
                    variant={"default"}
                    className="bg-stone-600/50 hover:bg-stone-700/80"
                />
                <CarouselNext
                    variant={"default"}
                    className="bg-stone-600/50 hover:bg-stone-700/80"
                />
            </Carousel>
            <div className="flex items-start justify-start mt-4">
                {images.map((_, index) => (
                    <Thumb
                        onClick={() => onThumbClick(index)}
                        selected={index === current}
                        index={index}
                        imgSrc={imageByIndex(index)}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductDetailsCarousel
