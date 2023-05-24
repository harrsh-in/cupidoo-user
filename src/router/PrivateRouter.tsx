import { Navigate } from 'react-router';
import SuspenseHOC from '../HOC/Suspense';
import { getUserToken } from '../utils/handleUserToken';

const PrivateRouter = ({ children }: IProps) => {
    const userToken = getUserToken();

    if (!userToken) {
        return <Navigate to="/signin" replace />;
    }

    return <SuspenseHOC>{children}</SuspenseHOC>;
};

export default PrivateRouter;

interface IProps {
    children: JSX.Element;
}
