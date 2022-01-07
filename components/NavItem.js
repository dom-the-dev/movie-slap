import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";

const NavItem = ({href, title, icon}) => {
    return (
        <li>
            <Link href={href}>
                <a className={"flex items-center block cursor-pointer tracking-wider text-sm font-bold text-sm text-mid py-3 hover:no-underline hover:text-brand"}>
                    {icon && <div className={`mr-3`}>{icon}</div>}{title}
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
