import { Box, Stack, Typography } from "@mui/material";

const items = ['tomato', 'onion', 'ginger', 'garlic']

export default function Home() {
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
