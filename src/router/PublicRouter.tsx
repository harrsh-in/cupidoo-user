import { Navigate } from 'react-router';
import SuspenseHOC from '../HOC/Suspense';
import env from '../utils/env';

const PublicRouter = ({ children }: IProps) => {
    const userToken = localStorage.getItem(env.userTokenKey);

    if (userToken) {
        return <Navigate to="/dashboard" replace />;
    }

    return <SuspenseHOC>{children}</SuspenseHOC>;
};

export default PublicRouter;

interface IProps {
    children: JSX.Element;
}
