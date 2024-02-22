import Image from "next/image";
import React from "react";

type PropType = {
    selected: boolean;
    imgSrc: string;
    index: number;
    onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, imgSrc, index, onClick } = props;

    return (
        <div className={"min-w-24 pl-0 px-2"}>
            <button
                onClick={onClick}
                className=" w-full border-none p-0 m-0 bg-none cursor-pointer no-underline"
                type="button"
            >

                <Image
                    // objectFit="contain"
                    height={100}
                    width={120}
                    src={imgSrc}
                    alt="Your alt text"
                />


            </button>
        </div>
    );
};
