import { Container } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const App = () => {
    return (
        <Container>
            <RouterProvider router={router} />
        </Container>
    );
};

export default App;
