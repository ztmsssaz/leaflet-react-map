import { Fragment } from 'react'
import Header from './header';

function Layout({ children }) {
    return (
        <Fragment>
            <Header />
            {children}
        </Fragment>
    )
}
export default Layout;