import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error from '../../_utils/Error/Error';
import Layout from '../Layout';
import Home from './Home/Home';
import InscriptionPage from './InscriptionPage/InscriptionPage';


function PublicRouter() {
  return (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/signup/*" element={<InscriptionPage />} />

            <Route path="*" element={<Error />} />
          </Route>
    </Routes>
  )
}

export default PublicRouter;