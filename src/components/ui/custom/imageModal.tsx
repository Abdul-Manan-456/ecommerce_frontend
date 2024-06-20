import React, { useState, useRef } from 'react';
import ReactModal from 'react-modal';
import PinchZoom from 'react-pinch-zoom'; // For pinch zoom fallback
import 'embla-carousel/css/embla.css';
import 'react-modal/dist/react-modal.css'; // Import modal styles
import Image from 'next/image';

const ImageModal = ({ src, alt }) => {
    const [isOpen, setIsOpen] = useState(false);
    const zoomRef = useRef(null); // Ref for pinch zoom component

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleDoubleClick = () => openModal(); // Open modal on double click

    return (
        <>
            <Image
                src={src}
                alt={alt}
                onClick={openModal}
                onDoubleClick={handleDoubleClick}
            />
            <ReactModal
                isOpen={isOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        zIndex: 1000, // Ensure modal is on top
                    },
                    content: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                        margin: 0,
                    },
                }}
            >
                {isOpen && (
                    <PinchZoom
                        ref={zoomRef} // Store ref for potential customization
                        zoomInFactor={2} // Adjust zoom factor as needed
                        initialScale={1}
                    >
                        <Image src={src} alt={alt} style={{ maxHeight: '100vh' }} />
                    </PinchZoom>
                )}
            </ReactModal>
        </>
    );
};

export default Image;
