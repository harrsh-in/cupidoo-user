import { Suspense } from 'react';

const SuspenseHOC = ({ children }: IProps) => {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default SuspenseHOC;

interface IProps {
    children: JSX.Element;
}
