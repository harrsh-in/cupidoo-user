import { Container } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Fragment } from 'react';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Fragment>
            <Navbar />

            <Container>
                <RouterProvider router={router} />
            </Container>
        </Fragment>
    );
};

export default App;
