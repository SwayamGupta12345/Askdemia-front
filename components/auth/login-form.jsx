"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import CircularProgress from "@mui/material/CircularProgress"
import { login } from "@/app/actions/auth"

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const result = await login(email, password)

      if (result.success) {
        router.push("/chat")
        router.refresh()
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{
      mt: 1,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
      borderRadius: "8px"
    }}>
      {error && (
        <Box sx={{ width: "100%", "@media (max-width: 520px)": { width: "90%", mx: "auto" } }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Box>
      )}

      <TextField suppressHydrationWarning
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        InputProps={{
          style: { color: "white" }
        }}
        InputLabelProps={{
          style: { color: "white" }
        }}
        sx={{
          width: "100%",
          "@media (max-width: 520px)": {
            width: "90%",
            mx: "auto",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />

      <TextField suppressHydrationWarning
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        InputProps={{
          style: { color: "white" }
        }}
        InputLabelProps={{
          style: { color: "white" }
        }}
        sx={{
          width: "100%",
          "@media (max-width: 520px)": {
            width: "90%",
            mx: "auto",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gray",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{
          mt: 3,
          mb: 2,
          width: "100%",
          "@media (max-width: 520px)": {
            width: "90%",
            mx: "auto",
          },
        }}
      >
        {isLoading ? <CircularProgress size={24} /> : "Sign In"}
      </Button>
    </Box>
  )
}

