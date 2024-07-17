"use client"
import React, { useState } from 'react';
import { apiFetch } from '@/app/utils/api';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    username: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});

const LoginPage: React.FC = () => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },

        validationSchema,
        onSubmit: async (values) => {
            setError('');
            setLoading(true);

            const payload = {
                ipAddress: "125.21.216.158", // You may want to get this dynamically
                username: values.username,
                password: values.password,
                deviceType: 0,
            };

            try {
                const data = await apiFetch('user/login', 'POST', payload);
                console.log('Login successful:', data);
                // Handle successful login
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <main className="form-signin">
            <form className="card col-md-4 p-4 mt-5 m-auto" onSubmit={formik.handleSubmit}>
                <h1 className="h3 mb-4 fw-normal text-center">Hello, Welcome Back</h1>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                        id="floatingInput"
                        placeholder="name@example.com"
                        {...formik.getFieldProps('username')}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                    {formik.touched.username && formik.errors.username && (
                        <div className="invalid-feedback">{formik.errors.username}</div>
                    )}
                </div>

                <div className="form-floating mb-1">
                    <input
                        type="password"
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        id="floatingPassword"
                        placeholder="Password"
                        {...formik.getFieldProps('password')}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <p className="small">
                        <Link href="/forgot-password">Forgot password?</Link>
                    </p>
                </div>

                <button className="w-100 btn-lg btn btn-custom" type="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <div className="text-center mt-3">
                    <p className="small">
                        Don't have an account yet? <span className="mx-1"></span>
                        <Link href="/register">Register now</Link>
                    </p>
                </div>
            </form>
        </main>

    );
};

export default LoginPage;
