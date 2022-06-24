import { UserAttributeModel } from "../models/user-attribute.model";

export function useStorageService() {
    const saveUserData = (data: any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(".653!xdax*/6047", JSON.stringify(data));
        }
    }

    const getUserData = () => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem(".653!xdax*/6047");
            return userData ? JSON.parse(userData) : null;
        } else return null;
    }

    const getUserRole = () => {
        const userData = getUserData();
        if (userData) {
            return (userData.token.user.attributes as [UserAttributeModel]).find(ua => ua.Name == "custom:role")?.Value;
        } else {
            return null;
        }
    }

    const clearAll = () => {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
    }

    return {
        saveUserData,
        getUserData,
        getUserRole,
        clearAll
    }
}