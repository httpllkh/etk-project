import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Vehicle from './Vehicle';
import News from './News';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Detail from './Detail';
import RecoverPassword from './RecoverPass';
import ChangePassword from './ChangePassword';

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/recoverpass" element={<RecoverPassword />} />
                <Route
                    path="/vehicle"
                    element={
                        <ProtectedRoute>
                            <Vehicle />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/news"
                    element={
                        <ProtectedRoute>
                            <News />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/detail"
                    element={
                        <ProtectedRoute>
                            <Detail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/changepassword"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
};

export default App;
