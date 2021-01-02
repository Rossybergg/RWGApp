import React, { useState } from 'react';

export const UserContext = React.createContext();

const Store = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    return (
            <UserContext.Provider value = {[userProfile, setUserProfile]} >
                { children }
            </UserContext.Provider>
    )
};

export default Store;