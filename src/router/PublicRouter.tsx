import { Navigate } from 'react-router';
import SuspenseHOC from '../HOC/Suspense';
import { getUserToken } from '../utils/handleUserToken';

const PublicRouter = ({ children }: IProps) => {
    const userToken = getUserToken();

    if (userToken) {
        return <Navigate to="/dashboard" replace />;
    }

    return <SuspenseHOC>{children}</SuspenseHOC>;
};

export default PublicRouter;

interface IProps {
    children: JSX.Element;
}
