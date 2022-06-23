import type { NextPage } from 'next';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
// import { useSession, signIn, signOut } from "next-auth/react";
import { Toast } from 'primereact/toast';
import styles from '../styles/sign-in.module.css';
import LoadingOverlay from 'react-loading-overlay-ts';
import { useHttpClientService } from './services/http-client.service';
import { UserAttributeModel } from './models/user-attribute.model';
import { UserRoles } from './constants/user-roles';
import { useStorageService } from './services/storage.service';

// const SignInPage: NextPage = ({ providers }: any) => {
const SignInPage: NextPage = () => {
    // const { data: session } = useSession() as any;
    const toast = useRef(null) as any;
    const router = useRouter()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const httpClientService = useHttpClientService();
    const storageService = useStorageService();

    function validateFields() {
        return username.length > 0 && password.length > 5;
    }

    function onLoginClicked(event: any) {
        // signIn();
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 3000)        
        if (validateFields()) {
            // if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && password == process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            //     setLoading(false);
            //     router.replace("/admin");
            // } else {
            //     toast.current.show({ severity: 'info', summary: 'Info', detail: 'Invalid user credentials.', life: 3000 });
            // }
            setLoading(true);
            httpClientService.request({
                url: "/api/auth/sign-in",
                method: "POST",
                body: {
                    username: username,
                    password: password
                }
            }).then((result) => {
                if (result.statusCode == 200) {
                    storageService.saveUserData(result.data);
                    const adminExists = (result.data.userData.UserAttributes as [UserAttributeModel]).find(ua => ua.Name == "custom:role" && ua.Value == UserRoles.ADMIN);
                    if (adminExists) {
                        router.replace("/admin");
                    }
                    const teacherExists = (result.data.userData.UserAttributes as [UserAttributeModel]).find(ua => ua.Name == "custom:role" && ua.Value == UserRoles.TEACHER);
                    if (teacherExists) {
                        router.replace("/teacher");
                    }
                    const studentExists = (result.data.userData.UserAttributes as [UserAttributeModel]).find(ua => ua.Name == "custom:role" && ua.Value == UserRoles.STUDENT);
                    if (studentExists) {
                        router.replace("/student");
                    }
                    if (!adminExists && !teacherExists && !studentExists) {
                        toast.current.show({ severity: 'info', summary: 'Info', detail: 'There is no user role assined in your profile.', life: 3000 });
                    }
                } else {
                    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Invalid user credentials.', life: 3000 });
                }
                setLoading(false);
            })
        } else {
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Kindly provide all the fields and password length must be 6 characters.', life: 3000 });
        }
    }

    function onSignOutClicked(event: any) {
        // signOut();
    }

    return (
        <LoadingOverlay
            active={loading}
            spinner
            text=''
        >
            <div>
                <Toast ref={toast}></Toast>
                <div className={styles.container + ' ' + 'flex justify-content-center align-content-center flex-wrap card-container'}>
                    <Card>
                        <div className="card">
                            <h1>Sample App</h1>
                            <div className="field">
                                <label>Username</label>
                                <InputText value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <InputText value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div className="flex justify-content-end">
                                <Button label="Login" onClick={onLoginClicked} />
                            </div>
                            {/* {session &&
                            <>
                                Signed in as {session.token.profile["cognito:username"] + ' (' + session.token.profile["custom:role"] + ')'} <br />
                                <Button label="Sign out" onClick={onSignOutClicked} />
                            </>
                        } */}
                            {/* <Button label="signIn" onClick={() => {
                            signIn(providers.cognito.id);
                        }} /> */}
                            {/* <div className="flex justify-content-center">
                            <Button label="Details" onClick={() => {
                                console.log(session);
                            }}></Button>
                        </div> */}
                        </div>
                    </Card>
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default SignInPage;

// export async function getServerSideProps(context: any) {
//     const providers = await getProviders()
//     return {
//         props: { providers },
//     }
// }