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
    // ${selected ? 'border border-black' : 'border border-red-300'}
    return (
        <div className={"min-w-24 pl-0  "}>
            <button
                onClick={onClick}
                className={` w-full relative  p-0 m-0 bg-none cursor-pointer no-underline`}
                type="button"
            >
                <Image
                    height={100}
                    width={120}
                    className="w-24 h-auto"
                    src={imgSrc}
                    alt="Your alt text"
                />
                {selected && <div className="absolute inset-0 bg-black opacity-40"></div>}
            </button>
        </div>
    );
};
