import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <main>
                {children}
            </main>
        <footer>© 2025 My Store</footer>
        </div>
    );
}

export default Layout;
