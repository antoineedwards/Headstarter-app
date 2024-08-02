'use client'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {firestore} from '@/firebase'
import { Box, Stack, Typography } from "@mui/material";

const items = ['tomato', 'onion', 'ginger', 'garlic']

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState([])
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=>{
      inventoryList.push({
      name: doc.id,
      ...doc.detail()
      })
    })
    setInventory(inventoryList)
  }
  useEffect(() => {
    updateInventory()
  }, [])
  return (
    <Box
      width='100vw'
      height='100vh'
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection='column'
    >
      <Box  border={'1px solid #333'}>
      <Box width='600px' height='100px' bgcolor={'#FF474C'} display={'flex'}
       justifyContent={'center'}
       alignItems={'center'}
      >
        <Typography variant={'h2'} color={'#333'} textAlign='center'>
          Items
        </Typography>
      </Box>

      <Stack width='600px' height='200px' spacing={2} overflow={'auto'}>
        {items.map((i) => (
          <Box
            key={i}
            height='300px'
            width='100%'
            bgcolor={'#f0f0f0'}
            alignItems={'center'}
            justifyContent={'center'}
            display='flex'>
            <Typography
              variant="h4"
              textAlign={'center'}>
              {i.charAt(0).toUpperCase() + i.slice(1)}
            </Typography>
          </Box>
        ))}
      </Stack>
      </Box>
    </Box>
  );
}
