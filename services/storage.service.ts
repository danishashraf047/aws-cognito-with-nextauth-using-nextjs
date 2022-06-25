import { UserAttributeModel } from "../models/user-attribute.model";

export function useStorageService() {
    // it will use to store user session data to the localStorage
    const saveUserData = (data: any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(".653!xdax*/6047", JSON.stringify(data));
        }
    }

    // it will use to get user session data from the localStorage
    const getUserData = () => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem(".653!xdax*/6047");
            return userData ? JSON.parse(userData) : null;
        } else return null;
    }

    // it will provide the user role if the user is logged in
    const getUserRole = () => {
        const userData = getUserData();
        if (userData) {
            return (userData.token.user.attributes as [UserAttributeModel]).find(ua => ua.Name == "custom:role")?.Value;
        } else {
            return null;
        }
    }

    // it will clear all the data from the localStorage
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