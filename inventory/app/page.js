'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { getFirestore } from 'firebase/firestore'
import { Button, Modal, Box, Stack, Typography, TextField } from "@mui/material";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore"


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState('true')
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
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
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    }
    else {
      await setDoc(docRef, { quantity: quantity + 1 })
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      }
      else {
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
    <Box width='100vw'
      height='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap={2}>
        <Typography variant='h1' textAlign='center' fontSize='3em'>
        Inventory Management
        </Typography>
      <Modal open={open} onClose={handleClose}>
        <Box position='absolute' left='50%' top='50%'
          width='400' bgcolor='white'
          border='2px solid black'
          boxShadow={18} p='4' padding='10px'
          dislay={'flex'} flexDirection={'column'} gap={3}
          sx={{
            transform: 'translate(-50%, -50%)'}}>
          <Typography variant='h6'>Add Item</Typography>
          <Stack width='100%' direction='row' spacing={2}>
            <TextField 
            variant='outlined'
            value={itemName}
            fullWidth
            onChange={(e)=>{
              setItemName(e.target.value)
            }}
            ></TextField>
            <Button
            variant='outlined' onClick={()=>{
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant='contained' onCLick={()=>{
        handleOpen()
      }}>
        Add New Item
      </Button>
      <Box border='1px solid #333'>
        <Box width='800px' height='100px'
         bgcolor='#add8e6' display='flex'
         alignItems='center' justifyContent='center'>
          <Typography variant='h2' color='#333'>
            Inventory Items
          </Typography>
        </Box>
      </Box>
      <Stack width='800px' height='300px' spacing={2} overflow='auto'>
        {
          inventory.map(({name, quantity})=>{
            <Box key={name} width='100%' minHeight='150px'
            display='flex' alignItems='center'
            justifyContent='center'
            bgColor='#f0f0f0'
            padding='5'>
              <Typography variant='h3'>{name}</Typography>
                            
            </Box>
          })
        }
      </Stack>
    </Box>
  )
}


