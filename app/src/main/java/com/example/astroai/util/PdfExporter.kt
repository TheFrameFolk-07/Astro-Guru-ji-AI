package com.example.astroai.util

import android.content.Context
import android.content.Intent
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Typeface
import android.graphics.pdf.PdfDocument
import androidx.core.content.FileProvider
import com.example.astroai.model.AstroProfile
import com.example.astroai.model.ChatMessage
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

object PdfExporter {

    fun generateAstrologyReport(context: Context, profile: AstroProfile, chatHistory: List<ChatMessage>): File? {
        val pdfDoc = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create() // A4 at 72dpi
        val page = pdfDoc.startPage(pageInfo)
        val canvas: Canvas = page.canvas

        val paint = Paint().apply { isAntiAlias = true }

        // Navy Header band
        paint.color = Color.rgb(11, 12, 16)
        paint.style = Paint.Style.FILL
        canvas.drawRect(0f, 0f, 595f, 90f, paint)

        // Title: AstroAI
        paint.color = Color.rgb(212, 175, 55) // Gold
        paint.textSize = 22f
        paint.typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
        canvas.drawText("AstroAI", 40f, 45f, paint)

        // Subtitle
        paint.color = Color.rgb(255, 153, 51) // Saffron
        paint.textSize = 12f
        paint.typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL)
        canvas.drawText("Personalized Vedic Astrology Report", 40f, 68f, paint)

        var y = 120f
        val margin = 40f

        fun drawHeading(text: String) {
            paint.color = Color.rgb(255, 153, 51)
            paint.textSize = 13f
            paint.typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)
            canvas.drawText(text, margin, y, paint)

            paint.color = Color.rgb(212, 175, 55)
            paint.strokeWidth = 1f
            canvas.drawLine(margin, y + 4f, 555f, y + 4f, paint)
            y += 22f
        }

        fun drawLine(label: String, value: String) {
            paint.color = Color.rgb(80, 80, 80)
            paint.textSize = 10f
            paint.typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)
            canvas.drawText(label, margin, y, paint)

            paint.color = Color.rgb(20, 20, 20)
            paint.typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL)
            canvas.drawText(value, margin + 120f, y, paint)
            y += 18f
        }

        fun drawPara(text: String) {
            paint.color = Color.rgb(40, 40, 40)
            paint.textSize = 10f
            paint.typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL)

            val words = text.split(" ")
            var line = StringBuilder()
            for (w in words) {
                if (paint.measureText(line.toString() + " " + w) > 500f) {
                    canvas.drawText(line.toString(), margin, y, paint)
                    y += 14f
                    line = StringBuilder(w)
                } else {
                    if (line.isNotEmpty()) line.append(" ")
                    line.append(w)
                }
            }
            if (line.isNotEmpty()) {
                canvas.drawText(line.toString(), margin, y, paint)
                y += 14f
            }
            y += 6f
        }

        val sign = AstroCalculations.getSign(profile.dob)
        val nak = AstroCalculations.nakshatra(profile)
        val fmtDate = AstroCalculations.formatDisplayDate(profile.dob)

        drawHeading("Onboarding Summary")
        drawLine("Full Name", profile.name.ifBlank { "—" })
        drawLine("Date of Birth", fmtDate)
        drawLine("Time of Birth", profile.tob.ifBlank { "—" })
        drawLine("Place of Birth", profile.pob.ifBlank { "—" })
        drawLine("Sun Sign", "${sign.name} (${sign.element}, ${sign.ruler})")
        drawLine("Nakshatra", nak)
        drawLine("Face Reading", if (profile.facePhoto != null) "Captured & analysed" else "Not provided")
        drawLine("Palmistry", if (profile.palmPhoto != null) "Captured & analysed" else "Not provided")
        y += 10f

        drawHeading("Birth Chart Placements")
        val chart = AstroCalculations.birthChart(profile)
        drawPara("Lagna (Ascendant): ${chart.ascendant}")
        chart.houses.forEachIndexed { i, h ->
            val planets = h.planets.joinToString(", ") { it.name }.ifBlank { "No major planet" }
            drawLine("House ${i + 1} · ${AstroCalculations.signForHouse(chart.ascIndex, i + 1)}", planets)
        }
        y += 10f

        drawHeading("Key Guru Ji Insights")
        val guruMsgs = chatHistory.filter { it.role == "guru" }
        if (guruMsgs.size <= 1) {
            drawPara("No conversation recorded yet. Chat with Guru Ji to populate personalized insights here.")
        } else {
            guruMsgs.takeLast(4).forEachIndexed { i, m ->
                val clean = m.text.replace(Regex("[\\p{So}\\p{Cn}]"), "").trim()
                drawPara("${i + 1}. $clean")
            }
        }

        // Footer
        paint.color = Color.rgb(150, 150, 150)
        paint.textSize = 8f
        val timeStamp = SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault()).format(Date())
        canvas.drawText("Generated $timeStamp · AstroAI", margin, 820f, paint)

        pdfDoc.finishPage(page)

        return try {
            val file = File(context.cacheDir, "${AstroCalculations.firstName(profile.name)}-astrology-report.pdf")
            val fos = FileOutputStream(file)
            pdfDoc.writeTo(fos)
            fos.close()
            pdfDoc.close()
            file
        } catch (_: Exception) {
            pdfDoc.close()
            null
        }
    }

    fun generateTranscript(context: Context, profile: AstroProfile, chatHistory: List<ChatMessage>): File? {
        val pdfDoc = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create()
        val page = pdfDoc.startPage(pageInfo)
        val canvas = page.canvas
        val paint = Paint().apply { isAntiAlias = true }

        // Header band
        paint.color = Color.rgb(11, 12, 16)
        canvas.drawRect(0f, 0f, 595f, 90f, paint)

        paint.color = Color.rgb(212, 175, 55)
        paint.textSize = 22f
        paint.typeface = Typeface.create(Typeface.SERIF, Typeface.BOLD)
        canvas.drawText("AstroAI", 40f, 45f, paint)

        paint.color = Color.rgb(255, 153, 51)
        paint.textSize = 12f
        paint.typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL)
        canvas.drawText("Guru Ji Chat Transcript", 40f, 68f, paint)

        var y = 120f
        val margin = 40f

        val sign = AstroCalculations.getSign(profile.dob)
        val nak = AstroCalculations.nakshatra(profile)

        paint.color = Color.rgb(90, 90, 90)
        paint.textSize = 9f
        canvas.drawText("${profile.name.ifBlank { "Seeker" }} · ${sign.name} · $nak Nakshatra", margin, y, paint)
        y += 24f

        chatHistory.forEach { m ->
            if (y > 780f) return@forEach
            val isGuru = m.role == "guru"
            val label = if (isGuru) "Guru Ji" else "You"

            paint.textSize = 10f
            paint.typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.BOLD)
            paint.color = if (isGuru) Color.rgb(200, 110, 20) else Color.rgb(70, 70, 70)
            canvas.drawText(label, margin, y, paint)
            y += 14f

            paint.typeface = Typeface.create(Typeface.SANS_SERIF, Typeface.NORMAL)
            paint.color = Color.rgb(30, 30, 30)

            val clean = m.text.replace(Regex("[\\p{So}\\p{Cn}]"), "").trim()
            val words = clean.split(" ")
            var line = StringBuilder()
            for (w in words) {
                if (paint.measureText(line.toString() + " " + w) > 480f) {
                    canvas.drawText(line.toString(), margin + 12f, y, paint)
                    y += 14f
                    line = StringBuilder(w)
                } else {
                    if (line.isNotEmpty()) line.append(" ")
                    line.append(w)
                }
            }
            if (line.isNotEmpty()) {
                canvas.drawText(line.toString(), margin + 12f, y, paint)
                y += 14f
            }
            y += 10f
        }

        pdfDoc.finishPage(page)

        return try {
            val file = File(context.cacheDir, "${AstroCalculations.firstName(profile.name)}-guru-ji-transcript.pdf")
            val fos = FileOutputStream(file)
            pdfDoc.writeTo(fos)
            fos.close()
            pdfDoc.close()
            file
        } catch (_: Exception) {
            pdfDoc.close()
            null
        }
    }

    fun shareFile(context: Context, file: File, mimeType: String = "application/pdf") {
        try {
            val uri = FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)
            val intent = Intent(Intent.ACTION_SEND).apply {
                type = mimeType
                putExtra(Intent.EXTRA_STREAM, uri)
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }
            context.startActivity(Intent.createChooser(intent, "Share Report"))
        } catch (_: Exception) {
        }
    }
}
