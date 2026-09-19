package com.example.astroai.ui

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.astroai.theme.Gold
import com.example.astroai.theme.Saffron
import com.example.astroai.theme.TextSecondary
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@Composable
fun SplashScreen(
    onLoginSuccess: () -> Unit
) {
    var loading by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    val infiniteTransition = rememberInfiniteTransition(label = "splash_spin")
    val rotation by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(12000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "orbital_rotation"
    )

    val floatOffset by infiniteTransition.animateFloat(
        initialValue = -6f,
        targetValue = 6f,
        animationSpec = infiniteRepeatable(
            animation = tween(2400, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "floating_orb"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .testTag("splash_screen")
    ) {
        CosmicBackground(dense = true)

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp, vertical = 40.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Spacer(modifier = Modifier.height(16.dp))

            // Center branding
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                // Mystical Emblem
                Box(
                    modifier = Modifier
                        .size(130.dp)
                        .padding(bottom = 12.dp),
                    contentAlignment = Alignment.Center
                ) {
                    // Outer orbit ring
                    Box(
                        modifier = Modifier
                            .size(126.dp)
                            .rotate(rotation)
                            .border(1.dp, Gold.copy(alpha = 0.35f), CircleShape)
                    )

                    // Middle ring
                    Box(
                        modifier = Modifier
                            .size(108.dp)
                            .rotate(-rotation * 0.7f)
                            .border(1.dp, Saffron.copy(alpha = 0.25f), CircleShape)
                    )

                    // Floating Glowing Sun/Moon core
                    Box(
                        modifier = Modifier
                            .size(76.dp)
                            .clip(CircleShape)
                            .background(
                                Brush.linearGradient(
                                    colors = listOf(Saffron, Gold)
                                )
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        CrescentMoonIcon(modifier = Modifier.size(38.dp))
                    }
                }

                Text(
                    text = "VEDIC · AI · COSMOS",
                    color = Gold.copy(alpha = 0.85f),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 4.sp,
                    modifier = Modifier.padding(top = 8.dp)
                )

                Text(
                    text = "AstroAI",
                    color = Color.White,
                    fontFamily = FontFamily.Serif,
                    fontSize = 44.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(top = 4.dp)
                )

                Text(
                    text = "Welcome to AstroAI — your personal AI Master Astrologer. Unlock the secrets written in your stars.",
                    color = TextSecondary,
                    fontSize = 15.sp,
                    textAlign = TextAlign.Center,
                    lineHeight = 22.sp,
                    modifier = Modifier
                        .padding(horizontal = 20.dp, vertical = 14.dp)
                )
            }

            // Bottom Actions
            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Google Login Button
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp)
                        .clip(RoundedCornerShape(16.dp))
                        .background(Color.White)
                        .clickable(enabled = !loading) {
                            loading = true
                            scope.launch {
                                delay(1200)
                                onLoginSuccess()
                            }
                        }
                        .testTag("google_login_button"),
                    contentAlignment = Alignment.Center
                ) {
                    if (loading) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.Center
                        ) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(20.dp),
                                color = Color(0xFF1A1206),
                                strokeWidth = 2.dp
                            )
                            Spacer(modifier = Modifier.width(10.dp))
                            Text(
                                text = "Connecting…",
                                color = Color(0xFF1A1206),
                                fontWeight = FontWeight.Bold,
                                fontSize = 16.sp
                            )
                        }
                    } else {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.Center
                        ) {
                            GoogleIcon(modifier = Modifier.size(22.dp))
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = "Continue with Google",
                                color = Color(0xFF1A1206),
                                fontWeight = FontWeight.SemiBold,
                                fontSize = 16.sp
                            )
                        }
                    }
                }

                Text(
                    text = "By continuing you agree to our cosmic terms & privacy ritual.",
                    color = TextSecondary.copy(alpha = 0.65f),
                    fontSize = 11.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.padding(top = 14.dp, bottom = 4.dp)
                )
            }
        }
    }
}

@Composable
fun CrescentMoonIcon(modifier: Modifier = Modifier) {
    Canvas(modifier = modifier) {
        val w = size.width
        val h = size.height

        val moonPath = Path().apply {
            moveTo(w * 0.72f, h * 0.15f)
            cubicTo(w * 0.35f, h * 0.2f, w * 0.25f, h * 0.65f, w * 0.58f, h * 0.88f)
            cubicTo(w * 0.18f, h * 0.75f, w * 0.15f, h * 0.28f, w * 0.72f, h * 0.15f)
            close()
        }
        drawPath(moonPath, color = Color(0xFF1A1206))
    }
}

@Composable
fun GoogleIcon(modifier: Modifier = Modifier) {
    Canvas(modifier = modifier) {
        val w = size.width
        val h = size.height

        // 4 color quadrant Google G approximation
        drawCircle(color = Color(0xFF4285F4), radius = w * 0.46f, center = Offset(w * 0.5f, h * 0.5f))
        drawCircle(color = Color.White, radius = w * 0.28f, center = Offset(w * 0.5f, h * 0.5f))
        drawRect(
            color = Color(0xFF4285F4),
            topLeft = Offset(w * 0.45f, h * 0.38f),
            size = androidx.compose.ui.geometry.Size(w * 0.45f, h * 0.24f)
        )
    }
}
