import { Box, Button } from '@mui/material';
import React, { Fragment, useRef, useState } from 'react';
import ReactCrop, {
    Crop,
    PixelCrop,
    centerCrop,
    makeAspectCrop,
} from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

// This is to demonstrate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

const EditImageModal = ({
    previewLink,
    setCroppedPreviewLink,
    handleCloseModal,
    setShowLoader,
}: IProps) => {
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const blobUrlRef = useRef('');
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const scale = 1;
    const rotate = 0;
    const aspect = 1 / 1;

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    function onDownloadCropClick() {
        setShowLoader(true);
        console.log(`Start time is ${new Date()}`);

        if (!previewCanvasRef.current) {
            throw new Error('Crop canvas does not exist');
        }
        console.log(`Start time 1 is ${new Date()}`);

        previewCanvasRef.current.toBlob((blob) => {
            console.log(`Start time 2 is ${new Date()}`);
            if (!blob) {
                throw new Error('Failed to create blob');
            }
            console.log(`Start time 3 is ${new Date()}`);
            if (blobUrlRef.current) {
                URL.revokeObjectURL(blobUrlRef.current);
            }
            console.log(`Start time 4 is ${new Date()}`);
            setCroppedPreviewLink(URL.createObjectURL(blob));
            console.log(`End time is ${new Date()}`);
            handleCloseModal();
        });
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate
                );
            }
        },
        100,
        [completedCrop, scale, rotate]
    );

    return (
        <Box
            sx={{
                paddingX: '1rem',
            }}
        >
            {previewLink ? (
                <ReactCrop
                    circularCrop
                    keepSelection
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={previewLink}
                        style={{
                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                        }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            ) : null}

            {completedCrop ? (
                <Fragment>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            border: '1px solid black',
                            objectFit: 'contain',
                            width: completedCrop.width,
                            height: completedCrop.height,
                            display: 'none',
                        }}
                    />

                    <Button
                        fullWidth
                        onClick={onDownloadCropClick}
                        variant="contained"
                        sx={{
                            marginTop: '3rem',
                        }}
                    >
                        Save
                    </Button>
                </Fragment>
            ) : null}
        </Box>
    );
};

export default EditImageModal;

interface IProps {
    previewLink: string;
    setCroppedPreviewLink: React.Dispatch<React.SetStateAction<string>>;
    handleCloseModal: () => void;
    setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
}
