import * as React from 'react'
import {Container, Box, TextField} from '@mui/material'


const SignUpPage = () => {
    return <Container sx={{bgcolor: "lightcyan", width: "100vw", height: "100vh", display: "flex",
     flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
        <Box sx={{bgcolor: "#fff", height: "80vh", width:"70%", border: "1px solid #1f1f1f", 
        display: "flex",flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
            <h1>SignUp Page</h1>
            <form style={{columnGap: "32px", width :"80%"}}>
                <div style={{display: "flex",flexDirection: "column", gap: '12px', marginBottom:"32px", width :"100%"}}>
                    <label>Username</label>
                    <Box sx={{ width: 500, maxWidth: '100%' }}>
                        <TextField fullWidth label="USERNAME" id="fullWidth" />
                    </Box>
                </div>
                <div style={{display: "flex",flexDirection: "column",gap: '12px', marginBottom:"32px"}}>
                    <label>Email</label>
                    <Box sx={{ width: 500, maxWidth: '100%' }}>
                        <TextField fullWidth label="USERNAME" id="fullWidth" />
                    </Box>
                </div>
                <div style={{display: "flex",flexDirection: "column", gap: '12px', marginBottom:"32px"}}>
                    <label>Password</label>
                    <Box sx={{ width: 500, maxWidth: '100%' }}>
                        <TextField fullWidth label="USERNAME" id="fullWidth" />
                    </Box>
                </div>
            </form>
        </Box>
    </Container>
}

export default SignUpPage