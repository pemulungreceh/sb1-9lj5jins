import { Route, Switch } from 'wouter';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { CartProvider } from './contexts/CartContext';
import ThemeProvider from './components/ThemeProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookDetail from './pages/BookDetail';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import SellerDashboard from './pages/seller/SellerDashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ThemeProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/admin" component={AdminDashboard} />
                <Route path="/admin/products" component={AdminProducts} />
                <Route path="/admin/users" component={AdminUsers} />
                <Route path="/seller" component={SellerDashboard} />
                <Route path="/customer" component={CustomerDashboard} />
                <Route>
                  {() => (
                    <>
                      <Header />
                      <main className="flex-1">
                        <Switch>
                          <Route path="/" component={HomePage} />
                          <Route path="/book/:id" component={BookDetail} />
                          <Route path="/cart" component={CartPage} />
                        </Switch>
                      </main>
                      <Footer />
                    </>
                  )}
                </Route>
              </Switch>
            </div>
          </CartProvider>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;