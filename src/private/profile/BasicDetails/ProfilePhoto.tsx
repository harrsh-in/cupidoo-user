import { Box } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import DefaultUser from '../../../assets/icons/default-user.svg';
import Modal from '../../../components/Modal';
import EditImageModal from './EditImageModal';

const ProfilePhoto = () => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [previewLink, setPreviewLink] = useState('');

    useEffect(() => {
        if (!selectedFile) {
            setPreviewLink('');
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreviewLink(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    return (
        <Box
            sx={{
                flex: '1',
                display: 'flex',
            }}
        >
            <Box
                component="label"
                sx={{
                    height: '8rem',
                    width: '8rem',
                    margin: 'auto',
                    cursor: 'pointer',
                    borderRadius: '50%',
                }}
            >
                <Box
                    component="img"
                    src={previewLink || DefaultUser}
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
                <EditImageModal />
            </Modal>
        </Box>
    );
};

export default ProfilePhoto;
