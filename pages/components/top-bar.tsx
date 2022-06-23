import { useRouter } from "next/router";
import styles from "../../styles/top-bar.module.css";
import { useStorageService } from "../services/storage.service";

const TopBarComponent = (props: any) => {
    const storageService = useStorageService();
    const router = useRouter();
    const userData = storageService.getUserData();

    setTimeout(() => {
        if (!userData) {
            router.replace("/");
        }
        if (userData) {
            if (`/${storageService.getUserRole()}` !== router.route) {
                router.replace("/");
            }
        }
    })

    function onSignOutClicked(event: any) {
        storageService.clearAll();
        router.replace("/");
    }

    return (
        <div className={styles.topnav}>
            <a className={styles.active} href="#home">{props.type}</a>
            <a onClick={onSignOutClicked}>Sign out</a>
        </div>
    )
}

export default TopBarComponent
