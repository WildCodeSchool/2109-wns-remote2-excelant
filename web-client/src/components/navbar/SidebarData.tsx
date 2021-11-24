import React from 'react';

import * as AilIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';

const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AilIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Tasks',
        path: '/tasks',
        icon: <BsIcons.BsListTask />,
        cName: 'nav-text'
    },
    {
        title: 'Projects',
        path: '/projects',
        icon: <BsIcons.BsListTask />,
        cName: 'nav-text'
    },
    {
        title: 'Users',
        path: '/users',
        icon: <BsIcons.BsListTask />,
        cName: 'nav-text'
    },
];

export default SidebarData;
