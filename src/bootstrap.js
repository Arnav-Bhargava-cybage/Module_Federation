import React, { useState, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../E-Com-Store/src/Store';

const EcomApp = lazy(() => import('app1/EcomApp'));
const HbsApp = lazy(() => import('app2/HbsApp'));

const Microfrontends = () => {
  const [app1Loaded, setApp1Loaded] = useState(false);
  const [app2Loaded, setApp2Loaded] = useState(false);

  const loadApp1 = async () => {
    if (!app1Loaded) {
      setApp1Loaded(true);
    }
  };

  const loadApp2 = async () => {
    if (!app2Loaded) {
      setApp2Loaded(true);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate loading='null' persistor={persistor}>
        <div>
          <h1>Microfrontends</h1>
          <br></br>
          <button onClick={loadApp1}>Load EcomApp</button>
          <button onClick={loadApp2}>Load HBS_Frontend</button>

          <Suspense fallback={<div>Loading EcomApp...</div>}>
            {app1Loaded && <EcomApp />}
          </Suspense>

          <Suspense fallback={<div>Loading HBS_Frontend...</div>}>
            {app2Loaded && <HbsApp />}
          </Suspense>
        </div>
      </PersistGate>
    </Provider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Microfrontends />);
