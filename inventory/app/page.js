'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getFirestore } from 'firebase/firestore'
import { Button, Modal, Box, Stack, Typography, TextField } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, query } from "firebase/firestore"
import { db } from './firebase' // Make sure this imports the initialized Firestore instance

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(true)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(db, '/inventory')) // Use the correct Firestore instance
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      })
    })
    setInventory(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(db, 'inventory'), item) // Use the correct Firestore instance
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(db, 'inventory'), item) // Use the correct Firestore instance
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box className='docContainer'
      width='100vw'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
      gap={2}
      bgcolor={'black'}>
      <Box 
      display='flex'
      flexDirection='column'
      gap={5}>
        <Box className='addField'
          bgcolor='rgb(28, 28, 28)'
          border='1px solid white'
          borderRadius={'5px'}
          boxShadow={18} p='4' padding='10px'
          display={'flex'} flexDirection={'column'} gap={3}
          height='460px'>
          <Typography variant='h7' color='white'>Add Item</Typography>
          <Stack width='100%' direction='row' spacing={2}>
            <TextField className='textBox'
              variant='outlined' helperText
              label='Enter Item Name'
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            ></TextField>
            <Button className='button'
              variant='outlined' onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}>Add</Button>
          </Stack>
          <Typography variant='h7' color='white'>Items will be sorted by alphabetical order.</Typography>
        </Box>
        <Box className='addField'
          bgcolor='rgb(28, 28, 28)'
          border='1px solid white'
          borderRadius={'5px'}
          boxShadow={18} p='4' padding='10px'
          display={'flex'} flexDirection={'column'} gap={3}
          height='500p'>
          <Typography variant='h7' color='white'>Search</Typography>
          <Stack width='100%' direction='row' spacing={2}>
            <TextField className='textBox'
              variant='outlined' helperText
              label='Enter Item Name'
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            ></TextField>
            <Button className='button'
              variant='outlined' onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}>Find</Button>
          </Stack>
        </Box>
      </Box>
      <Box id='inventoryContainer'
        display={'flex'}
        flexDirection={'column'}
        alignItems='center' justifyContent='center'>
        <Box classname='inventoryItemsBox'>
          <Box height='100px' className='inventoryItems' display='flex'
            alignItems='center' justifyContent='center' width='100%'>
            <Typography variant='h4' color='white'>
              Inventory Items
            </Typography>
          </Box>
        </Box>
        <Stack colo width='700px' minheight='300px' maxHeight='500px' gap={1} overflow='auto'
        >
          {
            inventory.map(({ name, quantity }) => (
              <Box className='idBox' className='itemMapping'
                key={name} width='100%' minHeight='100px'
                display='flex' alignItems='center'
                justifyContent='space-Between'
                bgcolor='white'
              >
                <Typography className='itemMapText' variant='h5'>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant='h5' className='itemMapText'>
                  {quantity}
                </Typography>
                <Stack direction='row' spacing={2}>
                  <Button className='incButton'
                    variant='contained' onClick={() => {
                      addItem(name)
                    }}>
                    +
                  </Button>
                  <Button className='incButton'
                    variant='contained' onClick={() => {
                      removeItem(name)
                    }}>
                    -
                  </Button>
                </Stack>
              </Box>
            ))
          }
        </Stack>
      </Box>
    </Box>
  )
}
