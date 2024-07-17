"use client";

import React, { useState } from 'react';
import { apiFetch } from '@/app/utils/api';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Validation schemas
const registrationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    captcha: Yup.string().optional(),
});

const verificationSchema = Yup.object({
    emailOtp: Yup.string().required('Email verification code is required'),
    mobileOtp: Yup.string().required('Mobile verification code is required'),
});

// Payload interface
interface Payload {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    captcha: string;
    countryCode: string;
    emailOtp?: string;
    mobileOtp?: string;
}

const RegisterPage: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [registrationData, setRegistrationData] = useState<Payload | null>(null);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            captcha: '',
            emailOtp: '',
            mobileOtp: '',
            countryCode: '+91',
        },
        validationSchema: step === 1 ? registrationSchema : verificationSchema,
        onSubmit: async (values) => {
            setError('');
            setSuccessMessage('');
            setLoading(true);

            // Create the payload based on the current step
            const payload: Payload = {
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                phoneNumber: values.phoneNumber,
                captcha: values.captcha || '03A',
                countryCode: values.countryCode,
            };

            // Add OTP fields for step 2
            if (step === 2) {
                payload.emailOtp = values.emailOtp;
                payload.mobileOtp = values.mobileOtp;
            }

            try {
                if (step === 1) {
                    // Save the registration data
                    setRegistrationData(payload);
                    await apiFetch('user/signup', 'POST', payload);
                    setSuccessMessage('Registration successful! Check verification code on email/phone.');
                    setStep(2);
                } else if (step === 2) {
                    // Use stored registration data and include OTPs
                    const verificationPayload = {
                        ...registrationData, // Include all data from the first step
                        emailOtp: values.emailOtp,
                        mobileOtp: values.mobileOtp,
                    };

                    await apiFetch('user/verify', 'POST', verificationPayload);
                    setSuccessMessage('Your account has been verified successfully!');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <main className="form-signin">
            <form className="card col-md-6 p-4 mt-5 m-auto" onSubmit={formik.handleSubmit}>
                <h1 className="h3 mb-4 fw-normal text-center">{step === 1 ? 'Create An Account' : 'Verify Your Account'}</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <div className="row g-3">
                    {step === 1 && (
                        <>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                                        placeholder="First Name"
                                        {...formik.getFieldProps('firstName')}
                                    />
                                    <label>First Name</label>
                                    {formik.touched.firstName && formik.errors.firstName && (
                                        <div className="invalid-feedback">{formik.errors.firstName}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                                        placeholder="Last Name"
                                        {...formik.getFieldProps('lastName')}
                                    />
                                    <label>Last Name</label>
                                    {formik.touched.lastName && formik.errors.lastName && (
                                        <div className="invalid-feedback">{formik.errors.lastName}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                        placeholder="Email"
                                        {...formik.getFieldProps('email')}
                                    />
                                    <label>Email</label>
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                                        placeholder="Username"
                                        {...formik.getFieldProps('username')}
                                    />
                                    <label>Username</label>
                                    {formik.touched.username && formik.errors.username && (
                                        <div className="invalid-feedback">{formik.errors.username}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Password"
                                        {...formik.getFieldProps('password')}
                                    />
                                    <label>Password</label>
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="invalid-feedback">{formik.errors.password}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                                        placeholder="Confirm Password"
                                        {...formik.getFieldProps('confirmPassword')}
                                    />
                                    <label>Confirm Password</label>
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                        <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''}`}
                                        placeholder="Phone Number"
                                        {...formik.getFieldProps('phoneNumber')}
                                    />
                                    <label>Phone Number</label>
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                        <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.captcha && formik.errors.captcha ? 'is-invalid' : ''}`}
                                        placeholder="Captcha (optional)"
                                        {...formik.getFieldProps('captcha')}
                                    />
                                    <label>Captcha (optional)</label>
                                    {formik.touched.captcha && formik.errors.captcha && (
                                        <div className="invalid-feedback">{formik.errors.captcha}</div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.emailOtp && formik.errors.emailOtp ? 'is-invalid' : ''}`}
                                        placeholder="Email Verification Code"
                                        {...formik.getFieldProps('emailOtp')}
                                    />
                                    <label>Email code </label>
                                    {formik.touched.emailOtp && formik.errors.emailOtp && (
                                        <div className="invalid-feedback">{formik.errors.emailOtp}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.mobileOtp && formik.errors.mobileOtp ? 'is-invalid' : ''}`}
                                        placeholder="Mobile Verification Code"
                                        {...formik.getFieldProps('mobileOtp')}
                                    />
                                    <label>Mobile code</label>
                                    {formik.touched.mobileOtp && formik.errors.mobileOtp && (
                                        <div className="invalid-feedback">{formik.errors.mobileOtp}</div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <button className="w-100 btn-lg btn btn-custom mt-3" type="submit" disabled={loading}>
                    {loading ? 'Processing...' : (step === 1 ? 'Register' : 'Verify')}
                </button>


                <p className="small mt-2 text-center">
                    Have an account? <span className="mx-1"></span>
                    <Link href="/login">Login now</Link>
                </p>
            </form>
        </main>
    );
};

export default RegisterPage;
