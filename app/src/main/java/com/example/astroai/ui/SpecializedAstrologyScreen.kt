package com.example.astroai.ui

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Fingerprint
import androidx.compose.material.icons.filled.HelpOutline
import androidx.compose.material.icons.filled.LocalHospital
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Public
import androidx.compose.material.icons.filled.WaterDrop
import androidx.compose.material.icons.filled.WbSunny
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
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
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.astroai.model.AstroProfile
import com.example.astroai.model.HoraryResult
import com.example.astroai.model.LalKitabRow
import com.example.astroai.model.MedicalMapItem
import com.example.astroai.model.MundaneArticle
import com.example.astroai.theme.BorderColor
import com.example.astroai.theme.CardBorder
import com.example.astroai.theme.Gold
import com.example.astroai.theme.Saffron
import com.example.astroai.theme.Surface2Dark
import com.example.astroai.theme.SurfaceDark
import com.example.astroai.theme.TextPrimary
import com.example.astroai.theme.TextSecondary
import com.example.astroai.util.AstroCalculations
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

data class MethodCardInfo(
    val id: String,
    val title: String,
    val hindi: String,
    val desc: String,
    val icon: ImageVector
)

val METHOD_CARDS = listOf(
    MethodCardInfo("nadi", "Nadi Astrology", "नाड़ी ज्योतिष", "Thumbprint Destiny Finder", Icons.Default.Fingerprint),
    MethodCardInfo("lal", "Lal Kitab", "लाल किताब", "Planetary Dosha & Remedies", Icons.AutoMirrored.Filled.MenuBook),
    MethodCardInfo("mundane", "Mundane Astrology", "मेदिनी ज्योतिष", "Global & National Predictions", Icons.Default.Public),
    MethodCardInfo("horary", "Horary Astrology", "प्रश्न कुंडली", "Instant Question Analysis", Icons.Default.HelpOutline),
    MethodCardInfo("medical", "Medical Astrology", "मेडिकल एस्ट्रोलॉजी", "Astro-Wellness & Body Mapping", Icons.Default.LocalHospital)
)

@Composable
fun SpecializedAstrologyScreen(
    profile: AstroProfile?
) {
    var openModule by remember { mutableStateOf<String?>(null) }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0B0C10))
            .testTag("specialized_astrology_screen")
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 20.dp, vertical = 20.dp)
                .verticalScroll(rememberScrollState())
        ) {
            Text(
                text = "Specialized Methods",
                fontFamily = FontFamily.Serif,
                fontWeight = FontWeight.Bold,
                fontSize = 26.sp,
                color = Gold
            )
            Text(
                text = "Ancient sciences, decoded by AI for you.",
                fontSize = 14.sp,
                color = TextSecondary,
                modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
            )

            METHOD_CARDS.forEach { card ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 12.dp)
                        .clip(RoundedCornerShape(20.dp))
                        .background(SurfaceDark)
                        .border(1.dp, BorderColor, RoundedCornerShape(20.dp))
                        .clickable { openModule = card.id }
                        .padding(16.dp)
                        .testTag("module_card_${card.id}"),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(50.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(Saffron.copy(alpha = 0.15f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = card.icon,
                            contentDescription = null,
                            tint = Gold,
                            modifier = Modifier.size(26.dp)
                        )
                    }

                    Spacer(modifier = Modifier.width(14.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = card.title,
                                fontFamily = FontFamily.Serif,
                                fontWeight = FontWeight.Bold,
                                fontSize = 16.sp,
                                color = TextPrimary
                            )
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = card.hindi,
                                fontSize = 11.sp,
                                color = Gold.copy(alpha = 0.8f)
                            )
                        }
                        Text(
                            text = card.desc,
                            fontSize = 13.sp,
                            color = TextSecondary,
                            modifier = Modifier.padding(top = 2.dp)
                        )
                    }

                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                        contentDescription = null,
                        tint = TextSecondary,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }

        // Module Dialog / Subview
        if (openModule != null) {
            val currentCard = METHOD_CARDS.firstOrNull { it.id == openModule }
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFF0B0C10))
            ) {
                Column(modifier = Modifier.fillMaxSize()) {
                    // Header
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(SurfaceDark)
                            .border(1.dp, BorderColor.copy(alpha = 0.5f))
                            .padding(horizontal = 18.dp, vertical = 14.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = currentCard?.title ?: "Module",
                            fontFamily = FontFamily.Serif,
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp,
                            color = Gold
                        )
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(Surface2Dark)
                                .clickable { openModule = null },
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.Close,
                                contentDescription = "Close",
                                tint = TextPrimary,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }

                    // Content
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(horizontal = 18.dp, vertical = 16.dp)
                            .verticalScroll(rememberScrollState())
                    ) {
                        when (openModule) {
                            "nadi" -> NadiView(profile)
                            "lal" -> LalKitabView(profile)
                            "mundane" -> MundaneView()
                            "horary" -> HoraryView()
                            "medical" -> MedicalView()
                        }
                    }
                }
            }
        }
    }
}

/* ---------- Nadi ---------- */
@Composable
fun NadiView(profile: AstroProfile?) {
    val yr = remember(profile) { AstroCalculations.birthYear(profile?.dob.orEmpty()) }
    val fn = remember(profile) { AstroCalculations.firstName(profile?.name) }
    var state by remember { mutableStateOf("idle") } // "idle", "scanning", "done"
    val scope = rememberCoroutineScope()

    val pulseTransition = rememberInfiniteTransition(label = "nadi_pulse")
    val scale by pulseTransition.animateFloat(
        initialValue = 0.95f,
        targetValue = 1.15f,
        animationSpec = infiniteRepeatable(
            animation = tween(600),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulse_scale"
    )

    Column(modifier = Modifier.fillMaxWidth()) {
        Text(
            text = "Your thumb impression unlocks the ancient leaf manuscript said to be written by the sage Agastya.",
            fontSize = 14.sp,
            color = TextSecondary,
            modifier = Modifier.padding(bottom = 24.dp)
        )

        if (state != "done") {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(240.dp)
                    .clip(RoundedCornerShape(28.dp))
                    .background(SurfaceDark)
                    .border(2.dp, Gold.copy(alpha = 0.4f), RoundedCornerShape(28.dp))
                    .clickable(enabled = state != "scanning") {
                        state = "scanning"
                        scope.launch {
                            delay(2600)
                            state = "done"
                        }
                    }
                    .testTag("nadi_scan_button"),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        modifier = Modifier
                            .size(90.dp)
                            .clip(CircleShape)
                            .background(Saffron.copy(alpha = 0.15f))
                            .scale(if (state == "scanning") scale else 1f),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Fingerprint,
                            contentDescription = null,
                            tint = if (state == "scanning") Saffron else Gold,
                            modifier = Modifier.size(54.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Text(
                        text = if (state == "scanning") "Reading thumb impression…" else "Touch to Scan Thumbprint",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = TextPrimary
                    )

                    if (state == "scanning") {
                        CircularProgressIndicator(
                            color = Gold,
                            strokeWidth = 2.dp,
                            modifier = Modifier
                                .size(20.dp)
                                .padding(top = 10.dp)
                        )
                    }
                }
            }
        } else {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(24.dp))
                    .background(SurfaceDark)
                    .border(1.dp, Gold.copy(alpha = 0.4f), RoundedCornerShape(24.dp))
                    .padding(20.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.AutoMirrored.Filled.MenuBook, contentDescription = null, tint = Gold, modifier = Modifier.size(20.dp))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "LEAF MANUSCRIPT $yr",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        letterSpacing = 2.sp,
                        color = Gold
                    )
                }

                Text(
                    text = "\"He who is born in the year $yr, named $fn, carries the mark of Jupiter upon the second thumb ridge. In youth he wanders; in maturity he commands respect through knowledge.\"",
                    fontSize = 15.sp,
                    lineHeight = 22.sp,
                    color = TextPrimary,
                    modifier = Modifier.padding(vertical = 14.dp)
                )

                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = "📜 Past Kanda: Karmic debt of speech, now cleared.",
                        fontSize = 13.sp,
                        color = TextSecondary
                    )
                    Text(
                        text = "🪔 Present Kanda: A door of opportunity opens within 90 days.",
                        fontSize = 13.sp,
                        color = TextSecondary
                    )
                    Text(
                        text = "✨ Remedy: Light a ghee lamp on Thursdays and feed Brahmins.",
                        fontSize = 13.sp,
                        color = TextSecondary
                    )
                }
            }
        }
    }
}

/* ---------- Lal Kitab ---------- */
@Composable
fun LalKitabView(profile: AstroProfile?) {
    val ruler = remember(profile) { AstroCalculations.getSign(profile?.dob.orEmpty()).ruler }
    val rows = listOf(
        LalKitabRow("Saturn (शनि)", "Feed birds & donate black sesame on Saturdays"),
        LalKitabRow("Mars (मंगल)", "Donate copper / sweet jaggery to a temple"),
        LalKitabRow("Mercury (बुध)", "Wear green; gift books to children"),
        LalKitabRow("Sun (सूर्य)", "Offer water to the rising Sun daily"),
        LalKitabRow(if (ruler.contains("Moon")) "Moon (चन्द्र)" else "Venus (शुक्र)", "Wear white; keep silver; respect women")
    )

    Column(modifier = Modifier.fillMaxWidth()) {
        Text(
            text = "Practical, low-cost remedies (सरल उपाय) tuned to the doshas detected in your chart (ruling planet: $ruler).",
            fontSize = 14.sp,
            color = TextSecondary,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
        ) {
            // Table Header
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Saffron.copy(alpha = 0.18f))
                    .padding(14.dp)
            ) {
                Text(
                    text = "Afflicted Planet (ग्रह)",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = Gold,
                    modifier = Modifier.weight(1f)
                )
                Text(
                    text = "Simple Remedy (सरल उपाय)",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = Gold,
                    modifier = Modifier.weight(1.3f)
                )
            }

            rows.forEachIndexed { i, r ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(if (i % 2 == 0) SurfaceDark else Surface2Dark)
                        .padding(14.dp)
                ) {
                    Text(
                        text = r.planet,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = TextPrimary,
                        modifier = Modifier.weight(1f)
                    )
                    Text(
                        text = r.remedy,
                        fontSize = 13.sp,
                        color = TextSecondary,
                        modifier = Modifier.weight(1.3f)
                    )
                }
            }
        }
    }
}

/* ---------- Mundane ---------- */
@Composable
fun MundaneView() {
    val articles = listOf(
        MundaneArticle("Global", "Jupiter–Saturn square stirs markets", "Volatility expected in tech and commodities through the next transit. Long-term assets favoured over speculation."),
        MundaneArticle("Economy", "Rising powers see currency strength", "Nations under Capricorn influence consolidate trade alliances; inflation cools by the next lunar quarter."),
        MundaneArticle("Leadership", "Mars transit favours decisive leaders", "A period of bold political reform across South Asia; diplomacy outperforms confrontation."),
        MundaneArticle("Climate", "Watery signs warn of monsoon shifts", "Coastal regions should prepare for irregular rainfall as the Moon waxes in Cancer.")
    )

    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Text(
            text = "Predictions for the world, drawn from current planetary transits.",
            fontSize = 14.sp,
            color = TextSecondary
        )

        articles.forEach { a ->
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(18.dp))
                    .background(SurfaceDark)
                    .border(1.dp, BorderColor, RoundedCornerShape(18.dp))
                    .padding(16.dp)
            ) {
                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(Saffron.copy(alpha = 0.15f))
                        .padding(horizontal = 10.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = a.tag,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = Gold
                    )
                }

                Text(
                    text = a.title,
                    fontFamily = FontFamily.Serif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp,
                    color = TextPrimary,
                    modifier = Modifier.padding(top = 10.dp, bottom = 4.dp)
                )

                Text(
                    text = a.body,
                    fontSize = 13.sp,
                    lineHeight = 19.sp,
                    color = TextSecondary
                )
            }
        }
    }
}

/* ---------- Horary ---------- */
@Composable
fun HoraryView() {
    var query by remember { mutableStateOf("") }
    var loading by remember { mutableStateOf(false) }
    var result by remember { mutableStateOf<HoraryResult?>(null) }
    val scope = rememberCoroutineScope()

    val signs = listOf("Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces")

    fun castChart() {
        if (query.isBlank()) return
        loading = true
        scope.launch {
            delay(1800)
            val now = Date()
            val cal = java.util.Calendar.getInstance()
            val min = cal.get(java.util.Calendar.MINUTE)
            val sec = cal.get(java.util.Calendar.SECOND)
            val asc = signs[min % 12]
            val moon = signs[sec % 12]
            val verdict = if (sec % 2 == 0) {
                "The signs are favourable — proceed with confidence, but act before the next full moon."
            } else {
                "Patience is advised. The current planetary alignment suggests waiting 11 days for clarity."
            }
            result = HoraryResult(
                ts = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault()).format(now),
                asc = asc,
                moon = moon,
                verdict = verdict
            )
            loading = false
        }
    }

    Column(modifier = Modifier.fillMaxWidth()) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(Saffron.copy(alpha = 0.12f))
                .border(1.dp, Gold.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                .padding(14.dp)
        ) {
            Column {
                Text(
                    text = "Don't know your birth time? Ask your question now.",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = TextPrimary
                )
                Text(
                    text = "A Prashna chart is cast for the exact moment you ask.",
                    fontSize = 12.sp,
                    color = TextSecondary,
                    modifier = Modifier.padding(top = 2.dp)
                )
            }
        }

        OutlinedTextField(
            value = query,
            onValueChange = { query = it },
            placeholder = { Text("e.g. Will I get the new job offer?", color = TextSecondary) },
            minLines = 3,
            maxLines = 4,
            shape = RoundedCornerShape(16.dp),
            colors = textFieldColors(),
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 14.dp)
                .testTag("horary_query_input")
        )

        Button(
            onClick = { castChart() },
            enabled = !loading && query.isNotBlank(),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Gold,
                contentColor = Color(0xFF1A1206)
            ),
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp)
                .testTag("horary_cast_button")
        ) {
            if (loading) {
                CircularProgressIndicator(modifier = Modifier.size(20.dp), color = Color(0xFF1A1206), strokeWidth = 2.dp)
                Spacer(modifier = Modifier.width(8.dp))
                Text("Casting Prashna chart…", fontWeight = FontWeight.Bold)
            } else {
                Text("Cast Chart & Answer", fontWeight = FontWeight.Bold, fontSize = 15.sp)
            }
        }

        result?.let { r ->
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 18.dp)
                    .clip(RoundedCornerShape(20.dp))
                    .background(SurfaceDark)
                    .border(1.dp, BorderColor, RoundedCornerShape(20.dp))
                    .padding(16.dp)
            ) {
                Text(
                    text = "Chart cast for: ${r.ts}",
                    fontSize = 12.sp,
                    color = TextSecondary
                )

                // 3x3 Prashna Grid
                Box(
                    modifier = Modifier
                        .padding(vertical = 12.dp)
                        .size(160.dp)
                        .align(Alignment.CenterHorizontally)
                        .clip(RoundedCornerShape(8.dp))
                        .border(1.dp, Gold.copy(alpha = 0.5f), RoundedCornerShape(8.dp))
                ) {
                    LazyVerticalGrid(
                        columns = GridCells.Fixed(3),
                        modifier = Modifier.fillMaxSize()
                    ) {
                        val symbols = listOf("Asc", "·", "☉", "·", "♄", "·", "☽", "·", "·")
                        items(9) { idx ->
                            Box(
                                modifier = Modifier
                                    .aspectRatio(1f)
                                    .border(0.5.dp, Gold.copy(alpha = 0.25f)),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = symbols[idx],
                                    fontSize = 12.sp,
                                    fontWeight = if (symbols[idx] == "Asc") FontWeight.Bold else FontWeight.Normal,
                                    color = if (symbols[idx] == "Asc") Gold else TextSecondary
                                )
                            }
                        }
                    }
                }

                Text(
                    text = "Ascendant: ${r.asc}",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = TextPrimary
                )
                Text(
                    text = "Moon sign: ${r.moon}",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = TextPrimary,
                    modifier = Modifier.padding(top = 2.dp)
                )

                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 12.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(Saffron.copy(alpha = 0.15f))
                        .padding(12.dp)
                ) {
                    Text(
                        text = r.verdict,
                        fontSize = 14.sp,
                        lineHeight = 20.sp,
                        color = TextPrimary
                    )
                }
            }
        }
    }
}

/* ---------- Medical ---------- */
@Composable
fun MedicalView() {
    val items = listOf(
        MedicalMapItem("Head & Mind", "Moon (चन्द्र)", "Meditate at dawn; reduce screen time before sleep."),
        MedicalMapItem("Heart & Spine", "Sun (सूर्य)", "Sun salutations and cardio strengthen vitality."),
        MedicalMapItem("Blood & Energy", "Mars (मंगल)", "Stay hydrated; favour iron-rich greens."),
        MedicalMapItem("Digestion", "Mercury (बुध)", "Warm water with turmeric balances digestion."),
        MedicalMapItem("Joints & Bones", "Saturn (शनि)", "Sesame oil massage (Abhyanga) eases stiffness.")
    )

    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "Each planet governs a region of the body. Here is your personalized Astro-Wellness map.",
            fontSize = 14.sp,
            color = TextSecondary
        )

        items.forEach { m ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(18.dp))
                    .background(SurfaceDark)
                    .border(1.dp, BorderColor, RoundedCornerShape(18.dp))
                    .padding(14.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(46.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(Saffron.copy(alpha = 0.15f)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = when (m.part) {
                            "Head & Mind" -> Icons.Default.Favorite
                            "Heart & Spine" -> Icons.Default.WbSunny
                            "Blood & Energy" -> Icons.Default.WaterDrop
                            "Digestion" -> Icons.Default.LocalHospital
                            else -> Icons.AutoMirrored.Filled.MenuBook
                        },
                        contentDescription = null,
                        tint = Gold,
                        modifier = Modifier.size(24.dp)
                    )
                }

                Spacer(modifier = Modifier.width(12.dp))

                Column(modifier = Modifier.weight(1f)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            text = m.part,
                            fontFamily = FontFamily.Serif,
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp,
                            color = TextPrimary
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "· ${m.planet}",
                            fontSize = 11.sp,
                            color = Gold.copy(alpha = 0.8f)
                        )
                    }

                    Text(
                        text = "🌿 ${m.tip}",
                        fontSize = 13.sp,
                        color = TextSecondary,
                        modifier = Modifier.padding(top = 2.dp)
                    )
                }
            }
        }
    }
}
