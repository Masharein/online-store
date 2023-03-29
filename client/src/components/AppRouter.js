import React, {useContext} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    console.log(user)

    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE}/>} />
            <Route path="/" element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;

