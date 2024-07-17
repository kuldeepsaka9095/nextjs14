"use client"
import React from 'react';
import { apiFetch } from '@/app/utils/api';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: async (values) => {
            const payload = {
                ipAddress: "125.21.216.158",
                deviceType: 0,
                email: values.email,
            };

            try {
                await apiFetch('forget_password', 'POST', payload);
                formik.setStatus({ success: 'Password reset successfully. Please check your inbox.' });
            } catch (err: any) {
                formik.setStatus({ error: err.message });
            }
        },
    });

    return (
        <main className="form-signin">
            <form className="card col-md-4 p-4 mt-5 m-auto" onSubmit={formik.handleSubmit}>
                <h1 className="h3 mb-4 fw-normal text-center">Forgot Password</h1>
                {formik.status?.error && <div className="alert alert-danger">{formik.status.error}</div>}
                {formik.status?.success && <div className="alert alert-success">{formik.status.success}</div>}

                <div className="form-floating">
                    <input
                        type="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                        id="floatingInput"
                        placeholder="name@example.com"
                        {...formik.getFieldProps('email')}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="d-flex justify-content-between mb-2">

                    <p className="small mt-2 text-center">
                        Remember Password? <span className="mx-1"></span>
                        <Link href="/login">Login now</Link>
                    </p>
                </div>

                <button className="w-100 btn-lg btn btn-custom" type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Sending...' : 'Reset'}
                </button>
            </form>
        </main>

    );
};

export default ForgotPassword;