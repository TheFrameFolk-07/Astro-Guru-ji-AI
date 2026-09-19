package com.example.astroai.ui

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import kotlin.random.Random

data class StarPoint(
    val xFraction: Float,
    val yFraction: Float,
    val radius: Float,
    val alpha: Float,
    val phase: Float
)

@Composable
fun CosmicBackground(
    modifier: Modifier = Modifier,
    dense: Boolean = false
) {
    val count = if (dense) 65 else 40
    val stars = remember(count) {
        val r = Random(42)
        List(count) {
            StarPoint(
                xFraction = r.nextFloat(),
                yFraction = r.nextFloat(),
                radius = r.nextFloat() * 1.8f + 0.6f,
                alpha = r.nextFloat() * 0.6f + 0.3f,
                phase = r.nextFloat() * 6.28f
            )
        }
    }

    val infiniteTransition = rememberInfiniteTransition(label = "cosmic")
    val twinkle by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 6.28f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 4000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "twinkle"
    )

    Canvas(modifier = modifier.fillMaxSize()) {
        val w = size.width
        val h = size.height

        // Background gradient
        drawRect(
            brush = Brush.radialGradient(
                colors = listOf(
                    Color(0xFF1B162E), // deep cosmic indigo center
                    Color(0xFF0F0F1A),
                    Color(0xFF07070C)  // void dark corners
                ),
                center = Offset(w * 0.5f, h * 0.35f),
                radius = maxOf(w, h) * 0.85f
            )
        )

        // Saffron / Gold aura in top corner
        drawCircle(
            brush = Brush.radialGradient(
                colors = listOf(
                    Color(0x22FF9933),
                    Color(0x0CFFD437),
                    Color.Transparent
                ),
                center = Offset(w * 0.8f, h * 0.15f),
                radius = w * 0.6f
            ),
            center = Offset(w * 0.8f, h * 0.15f),
            radius = w * 0.6f
        )

        // Lower mystical nebula
        drawCircle(
            brush = Brush.radialGradient(
                colors = listOf(
                    Color(0x187C3AED),
                    Color.Transparent
                ),
                center = Offset(w * 0.2f, h * 0.8f),
                radius = w * 0.5f
            ),
            center = Offset(w * 0.2f, h * 0.8f),
            radius = w * 0.5f
        )

        // Twinkling stars
        stars.forEach { star ->
            val sinVal = kotlin.math.sin(twinkle + star.phase).toFloat()
            val animatedAlpha = (star.alpha + sinVal * 0.25f).coerceIn(0.1f, 1f)
            val isGold = star.radius > 1.8f
            val color = if (isGold) {
                Color(0xFFFFD700).copy(alpha = animatedAlpha)
            } else {
                Color(0xFFFFF7ED).copy(alpha = animatedAlpha)
            }

            drawCircle(
                color = color,
                radius = star.radius,
                center = Offset(star.xFraction * w, star.yFraction * h)
            )
        }
    }
}
