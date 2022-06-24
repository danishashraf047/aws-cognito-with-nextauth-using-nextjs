import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStorageService } from '../services/storage.service';
import { signIn } from 'next-auth/react';

export { RouteGuard };

function RouteGuard({ children }: any) {
    const router = useRouter();
    const [showContent, setShowContent] = useState(false);
    const storageService = useStorageService();
    const userData = storageService.getUserData();
    const userRole = storageService.getUserRole();

    useEffect(() => {
        authCheck(router.asPath);
        const hideContent = () => setShowContent(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url: any) {
        const path: string = url.split('?')[0];
        const publicPaths = ['/sign-in', '/'];
        console.log(path);
        if (!userData) {
            if (publicPaths.includes(path)) {
                if (!path.includes("/sign-in")) {
                    signIn();
                } else {
                    setShowContent(true);
                }
                // router.push({
                //     pathname: '/sign-in',
                //     // query: { returnUrl: router.asPath }
                // });
            } else {
                setShowContent(false);
                signIn();
            }
        } else {
            setShowContent(true);
            if (`/${userRole}` != path) {
                router.replace(`/${userRole}`);
            }
        }
    }

    return (showContent && children);
}