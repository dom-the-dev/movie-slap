import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";

const NavItem = ({href, title}) => {
    return (
        <li>
            <Link href={href}>
                <a className={"block cursor-pointer tracking-wider text-sm font-bold text-sm text-mid py-3 hover:no-underline hover:text-brand"}>
                    {title}
                </a>
            </Link>
        </li>
    );
};

NavItem.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

export default NavItem;
