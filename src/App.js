/*jshint esversion: 6 */

import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const Main = lazy(() => import('./components/Main'))

function App() {
  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path = "/" element = {<Main/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  );
}

export default App;
