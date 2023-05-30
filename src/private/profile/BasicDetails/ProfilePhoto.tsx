import { Box } from '@mui/material';
import { ChangeEvent, Fragment, useState } from 'react';
import DefaultUser from '../../../assets/icons/default-user.svg';
import Modal from '../../../components/Modal';
import PageLoader from '../../../components/PageLoader';
import EditImageModal from './EditImageModal';

const ProfilePhoto = () => {
    const [open, setOpen] = useState(false);
    const [previewLink, setPreviewLink] = useState('');
    const [croppedPreviewLink, setCroppedPreviewLink] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const fileToSelect = e.target.files[0];
        const sizeInMb = fileToSelect.size / 1024 / 1024;

        if (sizeInMb > 5) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', () => {
            if (!reader.result) {
                return;
            }

            setPreviewLink(reader.result.toString());
            setOpen(true);
        });
        reader.readAsDataURL(fileToSelect);
        e.target.value = '';
    };

    const handleCloseModal = () => {
        setOpen(false);
        setShowLoader(false);
    };

    return (
        <Fragment>
            <Box
                sx={{
                    flex: '1',
                    display: 'flex',
                }}
            >
                <Box
                    component="label"
                    sx={{
                        height: '10rem',
                        width: '10rem',
                        margin: 'auto',
                        cursor: 'pointer',
                        borderRadius: '50%',
                    }}
                >
                    <Box
                        component="img"
                        src={croppedPreviewLink || DefaultUser}
                        sx={{
                            height: '100%',
                            width: '100%',
                            borderRadius: '50%',
                            objectFit: 'contain',
                        }}
                    />

                    <Box
                        hidden
                        component="input"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={handleFileSelection}
                    />
                </Box>

                <Modal open={open} setOpen={setOpen}>
                    <EditImageModal
                        previewLink={previewLink}
                        setCroppedPreviewLink={setCroppedPreviewLink}
                        handleCloseModal={handleCloseModal}
                        setShowLoader={setShowLoader}
                    />
                </Modal>
            </Box>

            {showLoader ? <PageLoader /> : null}
        </Fragment>
    );
};

export default ProfilePhoto;
