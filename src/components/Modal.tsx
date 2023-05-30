import { Modal as MuiModal, Backdrop, Fade, Box } from '@mui/material';

const Modal = ({ setOpen, open, children }: IProps) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <MuiModal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{
                backdrop: Backdrop,
            }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box
                    className="modal-container"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: '#fff',
                        boxShadow: 24,
                        border: 'transparent',
                        outline: '0',
                        p: 4,
                        borderRadius: '5px',
                    }}
                >
                    {children}
                </Box>
            </Fade>
        </MuiModal>
    );
};

export default Modal;

interface IProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: JSX.Element[] | JSX.Element | null;
}
