import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import SuspenseHOC from '../HOC/Suspense';
import { useAppSelector } from '../redux/hooks';
import { getUserToken } from '../utils/handleUserToken';

const PrivateRouter = ({ children }: IProps) => {
    const { details } = useAppSelector((state) => state.user);
    const { pathname } = useLocation();
    const userToken = getUserToken();

    if (!userToken) {
        return <Navigate to="/signin" replace />;
    }

    if (
        details &&
        details.details &&
        details.details.profileSetupStep === 0 &&
        pathname !== '/profile/setup-1'
    ) {
        return <Navigate to="/profile/setup-1" replace />;
    }

    return <SuspenseHOC>{children}</SuspenseHOC>;
};

export default PrivateRouter;

interface IProps {
    children: JSX.Element;
}
