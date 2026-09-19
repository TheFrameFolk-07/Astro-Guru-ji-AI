package com.example.astroai.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary = Gold,
    onPrimary = Color(0xFF1A1206),
    primaryContainer = Saffron,
    onPrimaryContainer = Color(0xFF1A1206),
    secondary = Saffron,
    onSecondary = Color(0xFF1A1206),
    background = BackgroundDark,
    onBackground = TextPrimary,
    surface = SurfaceDark,
    onSurface = TextPrimary,
    surfaceVariant = Surface2Dark,
    onSurfaceVariant = TextSecondary,
    outline = BorderColor
)

@Composable
fun AstroAITheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography,
        content = content
    )
}
