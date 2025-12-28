import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "@/middlewares/protectedRoute.tsx";
import {getCookie} from "@/hooks/useCookie.ts";
import {AuthProvider} from "@/context/AuthProvider.tsx";
import SettingsAccount from "@/pages/settings/account/Index.tsx";
import Products from "@/pages/settings/products/Index.tsx";
import CreateMenu from "@/pages/settings/products/Create.tsx";
import Categories from "@/pages/settings/categories/Index.tsx";
import CreateCategory from "@/pages/settings/categories/Create.tsx";
import EditCategory from "@/pages/settings/categories/Edit.tsx";
import Orders from "@/pages/orders/Index.tsx";

const App = () => {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<Root />} />
                  <Route path="/auth/sign-in" element={<Login />} />

                  <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/settings">
                          <Route index element={<Navigate to="/settings/account" replace />} />

                          <Route path="account" element={<SettingsAccount />} />
                          <Route path="products" element={<Products />} />
                          <Route path="products/create" element={<CreateMenu />} />
                          <Route path="categories" element={<Categories />} />
                          <Route path="categories/create" element={<CreateCategory />} />
                          <Route path="categories/:id/edit" element={<EditCategory />} />
                      </Route>
                  </Route>
              </Routes>
          </Router>
      </AuthProvider>
  );
};

const Root = () => {
  const token = getCookie("token");
  return !token ? (
    <Navigate to="/auth/sign-in" replace />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default App;
