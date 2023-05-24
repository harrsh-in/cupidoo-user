import { Navigate } from 'react-router';
import SuspenseHOC from '../HOC/Suspense';
import env from '../utils/env';

const PrivateRouter = ({ children }: IProps) => {
    const userToken = localStorage.getItem(env.userTokenKey);

    if (!userToken) {
        return <Navigate to="/signin" replace />;
    }

    return <SuspenseHOC>{children}</SuspenseHOC>;
};

export default PrivateRouter;

interface IProps {
    children: JSX.Element;
}
