import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  ProfileOrders,
  NotFound404,
  ProtectedRoute,
  Profile
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import {
  getError,
  getIngredientsThunk,
  getLoading,
  getData
} from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/userSlice';
import { useEffect } from 'react';

const App = () => {
  const disp = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector(getData);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  useEffect(() => {
    disp(getIngredientsThunk());
    disp(getUser());
  }, [disp]);

  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className={styles.app}>
      <AppHeader />
      {!error && !loading && ingredients.length > 0}
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          index
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Информация о закезе'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Информация о ингредиенте'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Информация о ингредиенте'
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
