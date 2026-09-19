package com.example.astroai.util

import com.example.astroai.model.AstroProfile
import com.example.astroai.model.BirthChartData
import com.example.astroai.model.House
import com.example.astroai.model.Planet
import com.example.astroai.model.ZodiacSign
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

object AstroCalculations {

    val SIGNS = listOf(
        ZodiacSign("Capricorn", 12, 22, 1, 19, "Earth", "Saturn"),
        ZodiacSign("Aquarius", 1, 20, 2, 18, "Air", "Saturn"),
        ZodiacSign("Pisces", 2, 19, 3, 20, "Water", "Jupiter"),
        ZodiacSign("Aries", 3, 21, 4, 19, "Fire", "Mars"),
        ZodiacSign("Taurus", 4, 20, 5, 20, "Earth", "Venus"),
        ZodiacSign("Gemini", 5, 21, 6, 20, "Air", "Mercury"),
        ZodiacSign("Cancer", 6, 21, 7, 22, "Water", "Moon"),
        ZodiacSign("Leo", 7, 23, 8, 22, "Fire", "Sun"),
        ZodiacSign("Virgo", 8, 23, 9, 22, "Earth", "Mercury"),
        ZodiacSign("Libra", 9, 23, 10, 22, "Air", "Venus"),
        ZodiacSign("Scorpio", 10, 23, 11, 21, "Water", "Mars"),
        ZodiacSign("Sagittarius", 11, 22, 12, 21, "Fire", "Jupiter")
    )

    val PLANETS = listOf(
        Planet("Su", "Sun"),
        Planet("Mo", "Moon"),
        Planet("Ma", "Mars"),
        Planet("Me", "Mercury"),
        Planet("Ju", "Jupiter"),
        Planet("Ve", "Venus"),
        Planet("Sa", "Saturn"),
        Planet("Ra", "Rahu"),
        Planet("Ke", "Ketu")
    )

    val ZODIAC_NAMES = listOf(
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    )

    val NAKSHATRAS = listOf(
        "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
        "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Hasta"
    )

    fun getSign(dob: String): ZodiacSign {
        if (dob.isBlank()) return SIGNS[3] // Aries fallback
        try {
            val parts = dob.split("-")
            if (parts.size >= 3) {
                val m = parts[1].toIntOrNull() ?: 1
                val day = parts[2].toIntOrNull() ?: 1
                for (s in SIGNS) {
                    if (s.fromMonth == s.toMonth) {
                        if (m == s.fromMonth && day >= s.fromDay && day <= s.toDay) return s
                    } else if ((m == s.fromMonth && day >= s.fromDay) || (m == s.toMonth && day <= s.toDay)) {
                        return s
                    }
                }
            }
        } catch (_: Exception) {
        }
        return SIGNS[0]
    }

    fun birthYear(dob: String): Int {
        if (dob.isBlank()) return Calendar.getInstance().get(Calendar.YEAR)
        return try {
            dob.split("-")[0].toIntOrNull() ?: Calendar.getInstance().get(Calendar.YEAR)
        } catch (_: Exception) {
            Calendar.getInstance().get(Calendar.YEAR)
        }
    }

    fun firstName(name: String?): String {
        val trimmed = name?.trim().orEmpty()
        return if (trimmed.isBlank()) "Seeker" else trimmed.split(" ").firstOrNull() ?: "Seeker"
    }

    fun nakshatra(profile: AstroProfile?): String {
        val day = if (profile != null && profile.dob.isNotBlank()) {
            profile.dob.split("-").getOrNull(2)?.toIntOrNull() ?: 1
        } else 1
        val index = Math.abs(day) % NAKSHATRAS.size
        return NAKSHATRAS[index]
    }

    private fun seedFrom(profile: AstroProfile?): Int {
        if (profile == null) return 7
        var seed = 0
        try {
            val parts = profile.dob.split("-")
            val y = parts.getOrNull(0)?.toIntOrNull() ?: 1995
            val m = parts.getOrNull(1)?.toIntOrNull() ?: 1
            val d = parts.getOrNull(2)?.toIntOrNull() ?: 1
            seed = d + m * 31 + y
        } catch (_: Exception) {
            seed = 1995
        }

        try {
            val tParts = profile.tob.split(":")
            val th = tParts.getOrNull(0)?.toIntOrNull() ?: 0
            val tm = tParts.getOrNull(1)?.toIntOrNull() ?: 0
            seed += th * 60 + tm
        } catch (_: Exception) {
        }

        for (ch in profile.pob) {
            seed += ch.code
        }
        return Math.abs(seed)
    }

    fun birthChart(profile: AstroProfile?): BirthChartData {
        val seed = seedFrom(profile)
        val ascIndex = seed % 12
        val housePlanets = Array(12) { mutableListOf<Planet>() }

        PLANETS.forEachIndexed { i, planet ->
            val house = ((seed * (i + 3) + i * 7) % 12).let { if (it < 0) it + 12 else it }
            housePlanets[house].add(planet)
        }

        val houses = List(12) { i ->
            val sign = signForHouse(ascIndex, i + 1)
            House(houseNumber = i + 1, sign = sign, planets = housePlanets[i])
        }

        return BirthChartData(
            ascendant = ZODIAC_NAMES[ascIndex],
            ascIndex = ascIndex,
            houses = houses
        )
    }

    fun signForHouse(ascIndex: Int, houseNum: Int): String {
        val idx = (ascIndex + houseNum - 1) % 12
        return ZODIAC_NAMES[if (idx < 0) idx + 12 else idx]
    }

    fun formatDisplayDate(dob: String): String {
        return try {
            val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
            val date = sdf.parse(dob)
            if (date != null) {
                SimpleDateFormat("MMMM d, yyyy", Locale.getDefault()).format(date)
            } else dob
        } catch (_: Exception) {
            dob
        }
    }
}
