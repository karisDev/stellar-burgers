import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthForbiddenRoute, AuthRequiredRoute } from '../protected-route';
import { useDispatch } from 'src/services/store';
import { checkUserAuth } from 'src/services/user/actions';
import { getIngredients } from 'src/services/ingredients/actions';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={location.state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<AuthForbiddenRoute component={<Login />} />}
        />
        <Route
          path='/register'
          element={<AuthForbiddenRoute component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<AuthForbiddenRoute component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<AuthForbiddenRoute component={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<AuthRequiredRoute component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<AuthRequiredRoute component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={<AuthRequiredRoute component={<OrderInfo />} />}
        />
      </Routes>

      {location.state?.background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
