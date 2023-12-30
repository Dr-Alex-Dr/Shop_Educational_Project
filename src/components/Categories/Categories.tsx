import React, {useEffect, useState, Dispatch, SetStateAction,} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
import styles from './Categories.module.css'

interface ICurrentCategory {
    setCurrentCategory: Dispatch<SetStateAction<string>>
}

const Categories = ({setCurrentCategory}: ICurrentCategory) => {
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products/categories')
        .then(res => res.data)
        .then(res => setCategories(res))
        .catch(err => console.log(err))
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);      
    };

  return (
    <Box className={styles.categories}>
        <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={styles.tabs}>
                
            <Tab label='All' onClick={() => {setCurrentCategory('/')}}/>
            {
                categories.map((item, index) => (
                    <Tab key={index} label={item} onClick={() => {setCurrentCategory(`/category/${item}`)}}/>
                ))
            }
      </Tabs>
    </Box>
  );
}

export default Categories