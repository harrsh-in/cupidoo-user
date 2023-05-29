import EditIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

const ProfilePicture = () => {
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
            className="image-upload-edit-container"
            sx={{
                height: '8rem',
                width: '8rem',
                borderRadius: '100%',
                bgcolor: '#dfdfdf',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <Box
                className="image-upload-person-container"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {previewLink ? (
                    <Box
                        component="img"
                        src={previewLink}
                        alt=""
                        sx={{
                            height: '8rem',
                            width: '8rem',
                            objectFit: 'contain',
                            borderRadius: '100%',
                        }}
                    />
                ) : (
                    <PersonIcon
                        sx={{
                            fontSize: '6em',
                            color: '#f5f5f5',
                        }}
                    />
                )}
            </Box>

            <Box
                className="image-upload-edit-icon-container"
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    borderRadius: '100%',
                }}
                component="label"
            >
                <EditIcon
                    sx={{
                        fontSize: '2em',
                        color: '#666362',
                    }}
                />

                <input
                    hidden
                    type="file"
                    name="profilePhoto"
                    id="profilePhoto"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleFileSelection}
                />
            </Box>
        </Box>
    );
};

export default ProfilePicture;
