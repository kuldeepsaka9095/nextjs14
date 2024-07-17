"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { GiReactor } from "react-icons/gi";
import { usePathname } from 'next/navigation';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
                setExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [navbarRef]);

    const navLinks = [
        { href: "/", label: "HOME" },
        { href: "/about", label: "ABOUT" },
        { href: "/products", label: "PRODUCT" },
        { href: "/blog", label: "BLOG" },
        { href: "/login", label: "LOGIN" },
    ];

    return (
        <Navbar ref={navbarRef} expand="lg" className="bg-body-tertiary py-5" expanded={expanded}>
            <Container>
                <Link href="/" className="navbar-brand" onClick={() => setExpanded(false)}>
                    <h4 className='title position-relative'>
                        <GiReactor className='logo' />
                        ReaCT <strong>NEXT14</strong>
                    </h4>
                </Link>
                <Navbar.Toggle onClick={() => setExpanded(prev => !prev)} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {navLinks.map(({ href, label }) => (
                            <Link key={href} className={`nav-link ${pathname === href ? 'active' : ''}`} href={href} onClick={() => setExpanded(false)}>
                                {label}
                            </Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
