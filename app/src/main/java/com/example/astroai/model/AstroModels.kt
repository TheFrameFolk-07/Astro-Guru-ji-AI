package com.example.astroai.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "astro_profile")
data class AstroProfile(
    @PrimaryKey val id: Int = 1,
    val name: String,
    val dob: String, // yyyy-MM-dd
    val tob: String, // HH:mm
    val pob: String,
    val facePhoto: String? = null,
    val palmPhoto: String? = null,
    val faceReading: String? = null,
    val palmReading: String? = null,
    val createdAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "chat_messages")
data class ChatMessage(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val role: String, // "guru" or "user"
    val text: String,
    val timestamp: Long = System.currentTimeMillis()
)

data class ZodiacSign(
    val name: String,
    val fromMonth: Int,
    val fromDay: Int,
    val toMonth: Int,
    val toDay: Int,
    val element: String,
    val ruler: String
)

data class Planet(
    val key: String,
    val name: String
)

data class House(
    val houseNumber: Int,
    val sign: String,
    val planets: List<Planet>
)

data class BirthChartData(
    val ascendant: String,
    val ascIndex: Int,
    val houses: List<House>
)

data class LangDef(
    val code: String,
    val label: String,
    val english: String
)

data class HoraryResult(
    val ts: String,
    val asc: String,
    val moon: String,
    val verdict: String
)

data class LalKitabRow(
    val planet: String,
    val remedy: String
)

data class MundaneArticle(
    val tag: String,
    val title: String,
    val body: String
)

data class MedicalMapItem(
    val part: String,
    val planet: String,
    val tip: String
)
