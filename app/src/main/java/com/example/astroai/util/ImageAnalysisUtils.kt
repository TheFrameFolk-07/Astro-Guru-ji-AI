package com.example.astroai.util

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import java.io.ByteArrayOutputStream
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt
import kotlin.math.sqrt

data class ImageMetrics(
    val width: Int,
    val height: Int,
    val brightness: Int, // 0-100
    val warmth: Int, // 0-100 (red vs blue dominance)
    val contrast: Int, // 0-100
    val symmetry: Int, // 0-100 (left/right mirror similarity)
    val detail: Int // 0-100 (edge density — line richness for palms)
)

object ImageAnalysisUtils {

    private const val MAX_DIM = 600

    fun analyzeBitmap(original: Bitmap): Pair<Bitmap, ImageMetrics> {
        val scale = min(1.0f, MAX_DIM.toFloat() / max(original.width, original.height).toFloat())
        val w = max(1, (original.width * scale).roundToInt())
        val h = max(1, (original.height * scale).roundToInt())

        val scaled = Bitmap.createScaledBitmap(original, w, h, true)
        val pixels = IntArray(w * h)
        scaled.getPixels(pixels, 0, w, 0, 0, w, h)

        val lum = FloatArray(w * h)
        var sum = 0.0
        var rSum = 0.0
        var bSum = 0.0

        for (i in pixels.indices) {
            val c = pixels[i]
            val r = (c shr 16) and 0xFF
            val g = (c shr 8) and 0xFF
            val b = c and 0xFF
            val l = 0.299 * r + 0.587 * g + 0.114 * b
            lum[i] = l.toFloat()
            sum += l
            rSum += r
            bSum += b
        }

        val mean = sum / lum.size
        var varSum = 0.0
        for (i in lum.indices) {
            val diff = lum[i] - mean
            varSum += diff * diff
        }
        val std = sqrt(varSum / lum.size)

        // Symmetry: compare left half to mirrored right half
        var symDiff = 0.0
        var symCount = 0
        val half = w / 2
        var y = 0
        while (y < h) {
            var x = 0
            while (x < half) {
                val left = lum[y * w + x]
                val right = lum[y * w + (w - 1 - x)]
                symDiff += abs(left - right)
                symCount++
                x += 2
            }
            y += 2
        }
        val symmetry = if (symCount > 0) {
            max(0.0, 100.0 - (symDiff / symCount / 255.0) * 260.0)
        } else 50.0

        // Edge density (Sobel-lite) - proxy for palm-line richness
        var edges = 0.0
        var edgeCount = 0
        y = 1
        while (y < h - 1) {
            var x = 1
            while (x < w - 1) {
                val gx = abs(lum[y * w + x + 1] - lum[y * w + x - 1])
                val gy = abs(lum[(y + 1) * w + x] - lum[(y - 1) * w + x])
                edges += (gx + gy)
                edgeCount++
                x += 2
            }
            y += 2
        }

        val metrics = ImageMetrics(
            width = original.width,
            height = original.height,
            brightness = clamp((mean / 255.0) * 100.0),
            warmth = clamp(50.0 + ((rSum - bSum) / lum.size / 255.0) * 200.0),
            contrast = clamp((std / 80.0) * 100.0),
            symmetry = clamp(symmetry),
            detail = if (edgeCount > 0) clamp((edges / edgeCount / 40.0) * 100.0) else 0
        )

        return Pair(scaled, metrics)
    }

    private fun clamp(n: Double): Int {
        val rounded = n.roundToInt()
        return max(0, min(100, rounded))
    }

    private fun band(v: Int, low: String, mid: String, high: String): String {
        return if (v < 38) low else if (v < 68) mid else high
    }

    fun faceReading(m: ImageMetrics): String {
        val glow = band(
            m.brightness,
            "a subdued, inward Chandra glow",
            "a balanced Surya-Chandra glow",
            "a bright Surya-dominant glow"
        )
        val temper = band(
            m.warmth,
            "cool Shukra tones — calm and diplomatic",
            "even elemental tones — steady temperament",
            "warm Mangal tones — high drive and courage"
        )
        val sym = band(
            m.symmetry,
            "notable asymmetry — a restless, creative mind",
            "gentle asymmetry — practical adaptability",
            "strong facial symmetry — disciplined and fortunate"
        )
        val def = band(
            m.contrast,
            "soft feature definition — a gentle nature",
            "moderate feature definition — measured decisions",
            "sharp feature definition — decisive leadership"
        )
        return listOf(
            "Facial symmetry measured at ${m.symmetry}% — $sym.",
            "Complexion radiance ${m.brightness}%: $glow.",
            "Tone analysis shows $temper.",
            "Structure: $def."
        ).joinToString(" ")
    }

    fun palmReading(m: ImageMetrics): String {
        val lines = band(
            m.detail,
            "few, deep lines — a focused single-path life",
            "a clear, moderate line network — balanced destiny",
            "a dense line network — many opportunities and travel"
        )
        val heart = band(
            m.warmth,
            "a cool Heart line — loyal but reserved in love",
            "a balanced Heart line — warmth with discernment",
            "a strong Heart line — passionate attachments"
        )
        val head = band(
            m.contrast,
            "a smooth Head line — intuitive thinking",
            "a defined Head line — analytical balance",
            "a deeply etched Head line — sharp intellect"
        )
        val life = band(
            m.brightness,
            "a shaded Life line — conserve energy, rest well",
            "a steady Life line — consistent vitality",
            "a luminous Life line — robust vitality and longevity"
        )
        return listOf(
            "Line density scored ${m.detail}% — $lines.",
            "Heart line: $heart.",
            "Head line: $head.",
            "Life line: $life."
        ).joinToString(" ")
    }

    fun encodeBitmapToBase64(bitmap: Bitmap): String {
        val outputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, 75, outputStream)
        val byteArray = outputStream.toByteArray()
        return "data:image/jpeg;base64," + Base64.encodeToString(byteArray, Base64.NO_WRAP)
    }

    fun decodeBase64ToBitmap(base64Str: String): Bitmap? {
        return try {
            val clean = if (base64Str.contains(",")) base64Str.substringAfter(",") else base64Str
            val decodedBytes = Base64.decode(clean, Base64.DEFAULT)
            BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
        } catch (_: Exception) {
            null
        }
    }
}
