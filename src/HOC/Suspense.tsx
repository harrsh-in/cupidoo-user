import { Suspense } from 'react';
import PageLoader from '../components/PageLoader';

const SuspenseHOC = ({ children }: IProps) => {
    return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
};

export default SuspenseHOC;

interface IProps {
    children: JSX.Element;
}
