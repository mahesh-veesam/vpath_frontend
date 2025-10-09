// src/components/ui/ColorModeButton.jsx
import React from "react"
import { IconButton, useColorMode } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

export const ColorModeButton = React.forwardRef((props, ref) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      {...props}
    />
  )
})
