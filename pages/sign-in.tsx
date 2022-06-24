import { useState } from 'react';
import { signIn, getCsrfToken, getSession } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useStorageService } from './services/storage.service';

import styles from '../styles/sign-in.module.css';
import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function SignIn({ csrfToken }: any) {
    const router = useRouter();
    const [error, setError] = useState(null);
    const storageService = useStorageService();

    return (
        <>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .required('Please enter your username'),
                    password: Yup.string()
                        .min(6, "Must be 6 characters or greater")
                        .required('Please enter your password')
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    const res: any = await signIn('credentials', {
                        redirect: false,
                        username: values.username,
                        password: values.password,
                        callbackUrl: `${window.location.origin}`,
                    });
                    if (res?.error) {
                        setError(res.error);
                    } else {
                        setError(null);
                    }
                    const session = await getSession();
                    storageService.saveUserData(session);
                    setSubmitting(false);
                    if (res.url) router.replace(`/${storageService.getUserRole()}`);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className={styles.container + ' ' + 'flex justify-content-center align-content-center flex-wrap card-container'}>
                            <Card>
                                <div className="card">
                                    <h1>Sample App</h1>
                                    <input
                                        name="csrfToken"
                                        type="hidden"
                                        defaultValue={csrfToken}
                                    />

                                    <div className="text-red-400 text-md text-center rounded p-2">
                                        {error}
                                    </div>

                                    <div className="field">
                                        <label htmlFor="username">Username
                                            <Field name="username"
                                                aria-label="enter your username"
                                                aria-required="true"
                                                type="text" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                        </label>
                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="username" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="password">Password
                                            <Field name="password"
                                                aria-label="enter your password"
                                                aria-required="true"
                                                type="password" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                        </label>
                                        <div className="text-red-600 text-sm">
                                            <ErrorMessage name="password" />
                                        </div>
                                    </div>
                                    <div className="flex justify-content-end">
                                        <Button type="submit">
                                            {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}

export async function getServerSideProps(context: any) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}