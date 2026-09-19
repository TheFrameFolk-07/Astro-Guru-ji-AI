package com.example.astroai.ui

import android.content.Context
import android.graphics.Bitmap
import android.widget.Toast
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.astroai.model.AstroProfile
import com.example.astroai.theme.BorderColor
import com.example.astroai.theme.Gold
import com.example.astroai.theme.Saffron
import com.example.astroai.theme.Surface2Dark
import com.example.astroai.theme.SurfaceDark
import com.example.astroai.theme.TextPrimary
import com.example.astroai.theme.TextSecondary
import com.example.astroai.util.AstroCalculations
import com.example.astroai.util.PdfExporter
import java.io.File
import java.io.FileOutputStream

@Composable
fun BirthChartCard(
    profile: AstroProfile?,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val chart = remember(profile) { AstroCalculations.birthChart(profile) }

    fun shareChartBitmap() {
        try {
            val size = 600
            val bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
            val canvas = android.graphics.Canvas(bitmap)

            // Draw dark background
            canvas.drawColor(android.graphics.Color.rgb(11, 12, 16))

            val paint = android.graphics.Paint().apply {
                isAntiAlias = true
                style = android.graphics.Paint.Style.STROKE
                color = android.graphics.Color.rgb(212, 175, 55)
                strokeWidth = 3f
            }

            // Outer rect
            canvas.drawRect(8f, 8f, size - 8f, size - 8f, paint)
            // Diagonals
            canvas.drawLine(8f, 8f, size - 8f, size - 8f, paint)
            canvas.drawLine(size - 8f, 8f, 8f, size - 8f, paint)

            // Inner diamond
            val diamond = android.graphics.Path().apply {
                moveTo(size / 2f, 8f)
                lineTo(size - 8f, size / 2f)
                lineTo(size / 2f, size - 8f)
                lineTo(8f, size / 2f)
                close()
            }
            canvas.drawPath(diamond, paint)

            // Text paint
            val textPaintSign = android.graphics.Paint().apply {
                isAntiAlias = true
                color = android.graphics.Color.rgb(255, 153, 51)
                textSize = 22f
                textAlign = android.graphics.Paint.Align.CENTER
                typeface = android.graphics.Typeface.DEFAULT_BOLD
            }
            val textPaintPlanet = android.graphics.Paint().apply {
                isAntiAlias = true
                color = android.graphics.Color.rgb(245, 239, 224)
                textSize = 24f
                textAlign = android.graphics.Paint.Align.CENTER
                typeface = android.graphics.Typeface.DEFAULT_BOLD
            }

            val positions = listOf(
                Pair(size * 0.5f, size * 0.25f),
                Pair(size * 0.25f, size * 0.125f),
                Pair(size * 0.125f, size * 0.25f),
                Pair(size * 0.25f, size * 0.5f),
                Pair(size * 0.125f, size * 0.75f),
                Pair(size * 0.25f, size * 0.875f),
                Pair(size * 0.5f, size * 0.75f),
                Pair(size * 0.75f, size * 0.875f),
                Pair(size * 0.875f, size * 0.75f),
                Pair(size * 0.75f, size * 0.5f),
                Pair(size * 0.875f, size * 0.25f),
                Pair(size * 0.75f, size * 0.125f)
            )

            chart.houses.forEachIndexed { i, h ->
                val pos = positions[i]
                val sign = AstroCalculations.signForHouse(chart.ascIndex, i + 1).take(3)
                val planets = h.planets.joinToString(" ") { it.key }.ifBlank { "—" }
                canvas.drawText(sign, pos.first, pos.second - 10f, textPaintSign)
                canvas.drawText(planets, pos.first, pos.second + 20f, textPaintPlanet)
            }

            val file = File(context.cacheDir, "${AstroCalculations.firstName(profile?.name)}-birth-chart.png")
            val fos = FileOutputStream(file)
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, fos)
            fos.close()

            PdfExporter.shareFile(context, file, "image/png")
        } catch (_: Exception) {
            Toast.makeText(context, "Saved chart to device", Toast.LENGTH_SHORT).show()
        }
    }

    Box(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(24.dp))
            .background(SurfaceDark)
            .border(1.dp, BorderColor, RoundedCornerShape(24.dp))
            .padding(16.dp)
            .testTag("birth_chart_card")
    ) {
        Column {
            // Header row
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Your Birth Chart",
                        fontFamily = FontFamily.Serif,
                        fontWeight = FontWeight.Bold,
                        fontSize = 17.sp,
                        color = Gold
                    )
                    Text(
                        text = "Lagna: ${chart.ascendant} Ascendant",
                        fontSize = 12.sp,
                        color = TextSecondary
                    )
                }

                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(Saffron.copy(alpha = 0.15f))
                        .border(1.dp, Gold.copy(alpha = 0.4f), CircleShape)
                        .clickable { shareChartBitmap() }
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                        .testTag("share_birth_chart_button"),
                    contentAlignment = Alignment.Center
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.Share,
                            contentDescription = "Share Chart",
                            tint = Gold,
                            modifier = Modifier.size(14.dp)
                        )
                        Text(
                            text = " Save",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = Gold
                        )
                    }
                }
            }

            // Kundali North-Indian Canvas
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 12.dp),
                contentAlignment = Alignment.Center
            ) {
                BirthChartCanvas(
                    chart = chart,
                    modifier = Modifier
                        .fillMaxWidth(0.92f)
                        .aspectRatio(1f)
                )
            }

            Text(
                text = "North-Indian style · Su Sun · Mo Moon · Ma Mars · Me Mercury · Ju Jupiter · Ve Venus · Sa Saturn · Ra/Ke Nodes",
                fontSize = 10.sp,
                color = TextSecondary.copy(alpha = 0.75f),
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}

@Composable
fun BirthChartCanvas(
    chart: com.example.astroai.model.BirthChartData,
    modifier: Modifier = Modifier
) {
    Canvas(modifier = modifier) {
        val s = size.width
        val strokeW = 2.5f

        // Draw dark backing
        drawRect(color = Color(0xFF0B0C10))

        // Outer square
        drawRect(
            color = Gold,
            topLeft = Offset(4f, 4f),
            size = androidx.compose.ui.geometry.Size(s - 8f, s - 8f),
            style = Stroke(width = strokeW)
        )

        // Diagonals
        drawLine(
            color = Gold,
            start = Offset(4f, 4f),
            end = Offset(s - 4f, s - 4f),
            strokeWidth = strokeW
        )
        drawLine(
            color = Gold,
            start = Offset(s - 4f, 4f),
            end = Offset(4f, s - 4f),
            strokeWidth = strokeW
        )

        // Central diamond
        val diamondPath = Path().apply {
            moveTo(s / 2f, 4f)
            lineTo(s - 4f, s / 2f)
            lineTo(s / 2f, s - 4f)
            lineTo(4f, s / 2f)
            close()
        }
        drawPath(diamondPath, color = Gold, style = Stroke(width = strokeW))

        // Positions for text in 12 North-Indian houses
        val positions = listOf(
            Offset(s * 0.5f, s * 0.25f),       // H1
            Offset(s * 0.25f, s * 0.125f),     // H2
            Offset(s * 0.125f, s * 0.25f),     // H3
            Offset(s * 0.25f, s * 0.5f),       // H4
            Offset(s * 0.125f, s * 0.75f),     // H5
            Offset(s * 0.25f, s * 0.875f),     // H6
            Offset(s * 0.5f, s * 0.75f),       // H7
            Offset(s * 0.75f, s * 0.875f),     // H8
            Offset(s * 0.875f, s * 0.75f),     // H9
            Offset(s * 0.75f, s * 0.5f),       // H10
            Offset(s * 0.875f, s * 0.25f),     // H11
            Offset(s * 0.75f, s * 0.125f)      // H12
        )

        val nativeCanvas = drawContext.canvas.nativeCanvas

        val paintSign = android.graphics.Paint().apply {
            isAntiAlias = true
            color = android.graphics.Color.rgb(255, 153, 51)
            textSize = s * 0.038f
            textAlign = android.graphics.Paint.Align.CENTER
            typeface = android.graphics.Typeface.DEFAULT_BOLD
        }

        val paintPlanet = android.graphics.Paint().apply {
            isAntiAlias = true
            color = android.graphics.Color.rgb(245, 239, 224)
            textSize = s * 0.046f
            textAlign = android.graphics.Paint.Align.CENTER
            typeface = android.graphics.Typeface.DEFAULT_BOLD
        }

        chart.houses.forEachIndexed { i, house ->
            val pos = positions[i]
            val signShort = AstroCalculations.signForHouse(chart.ascIndex, i + 1).take(3)
            val planetsShort = house.planets.joinToString(" ") { it.key }.ifBlank { "—" }

            nativeCanvas.drawText(signShort, pos.x, pos.y - s * 0.02f, paintSign)
            nativeCanvas.drawText(planetsShort, pos.x, pos.y + s * 0.04f, paintPlanet)
        }
    }
}
