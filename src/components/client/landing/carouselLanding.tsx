"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export function CarouselLanding() {

    const images = [
        { img: "/images/carousel/c_1.jpg" },
        { img: "/images/carousel/c_2.jpg" },
        { img: "/images/carousel/c_3.jpg" },
        { img: "/images/carousel/c_4.jpg" },
        { img: "/images/carousel/c_5.jpg" },
    ];
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [dots, setDots] = useState<number[]>([]);

    const plugin = useRef(Autoplay({ stopOnInteraction: false }));

    const scrollTo = useCallback(
        (index: number) => api && api.scrollTo(index),
        [api]
    );
    useEffect(() => {
        if (!api) {
            return;
        }
        setDots(api.scrollSnapList());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);
    return (
        <div className="relative">
            <Carousel
                plugins={[plugin.current]}
                opts={{ loop: true }}
                onClick={plugin.current.reset}
                setApi={setApi}
                className="w-full h-landingCarousel "
            >
                <CarouselContent className="">
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <Card className="h-landingCarousel flex border-none items-center justify-center rounded-none">
                                <CardContent className="p-0 w-full h-full">
                                    <Image
                                        src={image.img}
                                        height={2000}
                                        width={5000}
                                        // sizes="100vh"
                                        style={{ width: "100%", height: "100%" }}
                                        alt=""
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious variant={"default"} className="bg-stone-600/50 hover:bg-stone-700/80" />
                <CarouselNext variant={"default"} className="bg-stone-600/50 hover:bg-stone-700/80" />
            </Carousel>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 py-2 text-center text-sm text-muted-foreground">
                {dots.map((d, i) => {
                    return (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            className={`w-6 h-1 bg-slate-400 rounded-sm mx-1 ${i === current ? "bg-slate-700" : "bg-slate-400"
                                }`}
                        ></button>
                    );
                })}
            </div>
        </div>
    );

}
