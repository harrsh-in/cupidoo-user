import { Navigate } from 'react-router';
import SuspenseHOC from '../HOC/Suspense';
import { getUserToken } from '../utils/handleUserToken';
import { useAppSelector } from '../redux/hooks';

const PrivateRouter = ({ children }: IProps) => {
    const { details } = useAppSelector((state) => state.user);
    const userToken = getUserToken();

    console.log(details);

    if (!userToken) {
        return <Navigate to="/signin" replace />;
    }

    if (details && details.details && details.details.profileSetupStep === 0) {
        return <Navigate to="/profile/setup-1" replace />;
    }

    return <SuspenseHOC>{children}</SuspenseHOC>;
};

export default PrivateRouter;

interface IProps {
    children: JSX.Element;
}
