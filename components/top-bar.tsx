import { signOut } from "next-auth/react";
import styles from "../styles/top-bar.module.css";
import { useStorageService } from "../services/storage.service";

const TopBarComponent = (props: any) => {
    const storageService = useStorageService();

    // it will invoke when the user clicks on sign-out button and it will also remove the session data from localStorage    
    function onSignOutClicked(event: any) {
        storageService.clearAll();
        signOut({ callbackUrl: "/" });
    }

    return (
        <div className={styles.topnav}>
            <a className={styles.active} href="#home">{props.type}</a>
            <a onClick={onSignOutClicked}>Sign out</a>
        </div>
    )
}

export default TopBarComponent;