import React, {useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export function Categories({setCurrentCategory}: any) {
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
        .then((res) => {
            return res.json()
        })
        .then(res => {
            setCategories(res)
        })
    }, [])


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        
    };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', width: 172, position: 'fixed', height: '100vh', marginTop: '64px' }}>
        <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
        >
            <Tab label='All' onClick={() => {setCurrentCategory('/')}}/>
            {
                categories.map((item: any, index: any) => (
                    <Tab key={index} label={item} onClick={() => {setCurrentCategory(`/category/${item}`)}}/>
                ))
            }
      </Tabs>
    </Box>
  );
}