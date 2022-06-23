import type { NextPage } from 'next';
import Head from 'next/head';

import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import SignInPage from './sign-in';
import { useStorageService } from './services/storage.service';
import { UserAttributeModel } from './models/user-attribute.model';
import { UserRoles } from './constants/user-roles';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const storageService = useStorageService();
  const router = useRouter();
  const userData = storageService.getUserData();

  if (userData) {
    const adminExists = (userData.userData.UserAttributes as [UserAttributeModel]).find(ua => ua.Name == "custom:role" && ua.Value == UserRoles.ADMIN);
    if (adminExists) {
      router.replace("/admin");
    }
    const teacherExists = (userData.userData.UserAttributes as [UserAttributeModel]).find(ua => ua.Name == "custom:role" && ua.Value == UserRoles.TEACHER);
    if (teacherExists) {
      router.replace("/teacher");
    }
    const studentExists = (userData.userData.UserAttributes as [UserAttributeModel]).find(ua => ua.Name == "custom:role" && ua.Value == UserRoles.STUDENT);
    if (studentExists) {
      router.replace("/student");
    }
  }

  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignInPage></SignInPage>
    </div>
  )
}

export default Home
