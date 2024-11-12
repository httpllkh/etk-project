import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Vehicle from './Vehicle';
import News from './News';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Auth />} />
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
            </Routes>
        </AuthProvider>
    );
};

export default App;
