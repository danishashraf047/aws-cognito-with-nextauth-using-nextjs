import type { NextPage } from 'next'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import LoadingOverlay from 'react-loading-overlay-ts';
import { useHttpClientService } from './services/http-client.service';
import { UserRoles } from './constants/user-roles';
import TopBarComponent from './components/top-bar';

import styles from '../styles/admin.module.css';
import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const TeacherPage: NextPage = () => {
    const toast = useRef(null) as any;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const type = "Teacher";

    const httpClientService = useHttpClientService();

    function validateFields() {
        return username.length > 0 && password.length > 5 && firstname.length > 0 && lastname.length > 0 && phone.length > 0;
    }

    function onCreateClicked(event: any) {
        if (validateFields()) {
            setLoading(true);
            setLoading(true);
            httpClientService.request({
                url: "/api/auth/sign-up",
                method: "POST",
                body: {
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    role: UserRoles.STUDENT
                }
            }).then((result) => {
                console.log(result);
                if (result.statusCode == 200) {
                    toast.current.show({ severity: 'info', summary: 'Info', detail: `The user: ${username} has been created.`, life: 3000 });
                } else {
                    toast.current.show({ severity: 'info', summary: 'Info', detail: result.data, life: 3000 });
                }
                setUsername("");
                setPassword("");
                setFirstname("");
                setLastname("");
                setPhone("");
                setLoading(false);
            })
        } else {
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Kindly provide all the fields and password length must be 6 characters.', life: 3000 });
        }
    }

    return (
        <LoadingOverlay
            active={loading}
            spinner
            text=''
        >
            <div>
                <Toast ref={toast}></Toast>
                <TopBarComponent type={type}></TopBarComponent>
                <div className={styles.container}>
                    <Card className={styles.card}>
                        <div className="card">
                            <h1>Create Student</h1>
                            <div className="field">
                                <label>Username</label>
                                <InputText value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <InputText value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div className="field">
                                <label>Firstname</label>
                                <InputText value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div className="field">
                                <label>Lastname</label>
                                <InputText value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div className="field">
                                <label>Phone</label>
                                <InputText value={phone} onChange={(e) => setPhone(e.target.value)} type="number" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                            </div>
                            <div className="flex justify-content-end">
                                <Button label="Create" onClick={onCreateClicked} />
                            </div>
                        </div>
                    </Card >
                </div>
            </div>
        </LoadingOverlay>
    )
}

export default TeacherPage;