import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './PageCard.module.css'

type Props = {
    name: string;
    url: string;
}

const PageCard = ({
    name,
    url,
}: Props) => {
  return (
    <NavLink 
        to={url}
        className={styles.wrapper}
    >
        {name}
    </NavLink>
  )
}

export default PageCard