package com.example.astroai.ui

import android.widget.Toast
import androidx.compose.foundation.Image
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.Sparkles
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.astroai.model.AstroProfile
import com.example.astroai.model.ChatMessage
import com.example.astroai.theme.BorderColor
import com.example.astroai.theme.CardBorder
import com.example.astroai.theme.Destructive
import com.example.astroai.theme.DestructiveBg
import com.example.astroai.theme.Gold
import com.example.astroai.theme.Saffron
import com.example.astroai.theme.Surface2Dark
import com.example.astroai.theme.SurfaceDark
import com.example.astroai.theme.TextPrimary
import com.example.astroai.theme.TextSecondary
import com.example.astroai.util.AstroCalculations
import com.example.astroai.util.ImageAnalysisUtils
import com.example.astroai.util.PdfExporter

@Composable
fun ProfileScreen(
    profile: AstroProfile?,
    chatHistory: List<ChatMessage>,
    onSaveProfile: (AstroProfile) -> Unit,
    onResetApp: () -> Unit
) {
    val context = LocalContext.current
    var isEditing by remember { mutableStateOf(false) }
    var showResetDialog by remember { mutableStateOf(false) }

    if (isEditing) {
        OnboardingScreen(
            initialProfile = profile,
            onSaveProfile = {
                onSaveProfile(it)
                isEditing = false
            },
            onCancel = { isEditing = false }
        )
        return
    }

    if (profile == null) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("No profile data found", color = TextSecondary)
        }
        return
    }

    val sign = remember(profile.dob) { AstroCalculations.getSign(profile.dob) }
    val nak = remember(profile) { AstroCalculations.nakshatra(profile) }
    val fmtDate = remember(profile.dob) { AstroCalculations.formatDisplayDate(profile.dob) }

    val faceBitmap = remember(profile.facePhoto) {
        profile.facePhoto?.let { ImageAnalysisUtils.decodeBase64ToBitmap(it) }
    }
    val palmBitmap = remember(profile.palmPhoto) {
        profile.palmPhoto?.let { ImageAnalysisUtils.decodeBase64ToBitmap(it) }
    }

    fun exportPdfReport() {
        val file = PdfExporter.generateAstrologyReport(context, profile, chatHistory)
        if (file != null) {
            PdfExporter.shareFile(context, file)
        } else {
            Toast.makeText(context, "Could not generate PDF", Toast.LENGTH_SHORT).show()
        }
    }

    fun exportTranscript() {
        val file = PdfExporter.generateTranscript(context, profile, chatHistory)
        if (file != null) {
            PdfExporter.shareFile(context, file)
        } else {
            Toast.makeText(context, "Could not generate transcript", Toast.LENGTH_SHORT).show()
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0B0C10))
            .padding(horizontal = 20.dp, vertical = 20.dp)
            .verticalScroll(rememberScrollState())
            .testTag("profile_screen")
    ) {
        Text(
            text = "Your Profile",
            fontFamily = FontFamily.Serif,
            fontWeight = FontWeight.Bold,
            fontSize = 26.sp,
            color = Gold
        )
        Text(
            text = "Saved birth details & cosmic charts.",
            fontSize = 14.sp,
            color = TextSecondary,
            modifier = Modifier.padding(top = 4.dp, bottom = 18.dp)
        )

        // Hero Card
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(24.dp))
                .background(SurfaceDark)
                .border(1.dp, BorderColor, RoundedCornerShape(24.dp))
                .padding(18.dp)
        ) {
            Column {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(60.dp)
                            .clip(RoundedCornerShape(18.dp))
                            .background(Brush.linearGradient(listOf(Saffron, Gold))),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = AstroCalculations.firstName(profile.name).take(1),
                            fontFamily = FontFamily.Serif,
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF1A1206)
                        )
                    }

                    Spacer(modifier = Modifier.width(14.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = profile.name.ifBlank { "Seeker" },
                            fontFamily = FontFamily.Serif,
                            fontWeight = FontWeight.Bold,
                            fontSize = 20.sp,
                            color = TextPrimary
                        )
                        Text(
                            text = "${sign.name} · $nak Nakshatra",
                            fontSize = 13.sp,
                            color = Gold,
                            modifier = Modifier.padding(top = 2.dp)
                        )
                    }
                }

                Spacer(modifier = Modifier.height(14.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    ProfileBadge(text = sign.element)
                    Spacer(modifier = Modifier.width(8.dp))
                    ProfileBadge(text = "Ruler: ${sign.ruler}")

                    Spacer(modifier = Modifier.weight(1f))

                    Box(
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(Saffron.copy(alpha = 0.15f))
                            .border(1.dp, Gold.copy(alpha = 0.4f), CircleShape)
                            .clickable { isEditing = true }
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                            .testTag("edit_profile_button"),
                        contentAlignment = Alignment.Center
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Edit, contentDescription = null, tint = Gold, modifier = Modifier.size(14.dp))
                            Spacer(modifier = Modifier.width(4.dp))
                            Text("Edit", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = Gold)
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(18.dp))

        // Details Section
        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            DetailItem(icon = Icons.Default.Person, label = "Full Name", value = profile.name)
            DetailItem(icon = Icons.Default.CalendarMonth, label = "Date of Birth", value = fmtDate)
            DetailItem(icon = Icons.Default.Schedule, label = "Time of Birth", value = profile.tob.ifBlank { "—" })
            DetailItem(icon = Icons.Default.LocationOn, label = "Place of Birth", value = profile.pob.ifBlank { "—" })
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Uploaded Readings
        Text(
            text = "Uploaded Readings",
            fontFamily = FontFamily.Serif,
            fontWeight = FontWeight.Bold,
            fontSize = 17.sp,
            color = TextPrimary,
            modifier = Modifier.padding(bottom = 12.dp)
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            PhotoThumbnailCard(
                modifier = Modifier.weight(1f),
                label = "Face Reading",
                bitmap = faceBitmap
            )
            PhotoThumbnailCard(
                modifier = Modifier.weight(1f),
                label = "Palm (Hast Rekha)",
                bitmap = palmBitmap
            )
        }

        Spacer(modifier = Modifier.height(22.dp))

        // Export PDF Button
        Button(
            onClick = { exportPdfReport() },
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .testTag("export_pdf_button"),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Gold,
                contentColor = Color(0xFF1A1206)
            )
        ) {
            Icon(Icons.Default.Description, contentDescription = null, modifier = Modifier.size(18.dp))
            Spacer(modifier = Modifier.width(8.dp))
            Text("Export PDF Astrology Report", fontWeight = FontWeight.Bold, fontSize = 15.sp)
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Download Chat Transcript
        Button(
            onClick = { exportTranscript() },
            enabled = chatHistory.isNotEmpty(),
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .testTag("export_transcript_button"),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = SurfaceDark,
                contentColor = Gold,
                disabledContainerColor = Surface2Dark,
                disabledContentColor = TextSecondary.copy(alpha = 0.5f)
            ),
            border = androidx.compose.foundation.BorderStroke(1.dp, Gold.copy(alpha = 0.4f))
        ) {
            Icon(Icons.Default.Share, contentDescription = null, modifier = Modifier.size(18.dp))
            Spacer(modifier = Modifier.width(8.dp))
            Text("Download Chat Transcript", fontWeight = FontWeight.SemiBold, fontSize = 15.sp)
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Reset App Button
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(DestructiveBg)
                .border(1.dp, Destructive.copy(alpha = 0.4f), RoundedCornerShape(16.dp))
                .clickable { showResetDialog = true }
                .padding(vertical = 14.dp)
                .testTag("reset_app_button"),
            contentAlignment = Alignment.Center
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Refresh, contentDescription = null, tint = Destructive, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Reset App / Clear Data", fontWeight = FontWeight.SemiBold, color = Destructive, fontSize = 14.sp)
            }
        }
    }

    if (showResetDialog) {
        AlertDialog(
            onDismissRequest = { showResetDialog = false },
            title = { Text("Reset Application", color = TextPrimary) },
            text = { Text("This will clear your profile and chat history and reset the app. Continue?", color = TextSecondary) },
            confirmButton = {
                TextButton(
                    onClick = {
                        showResetDialog = false
                        onResetApp()
                    }
                ) {
                    Text("Clear & Restart", color = Destructive, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showResetDialog = false }) {
                    Text("Cancel", color = TextPrimary)
                }
            },
            containerColor = SurfaceDark
        )
    }
}

@Composable
fun ProfileBadge(text: String) {
    Box(
        modifier = Modifier
            .clip(CircleShape)
            .background(Saffron.copy(alpha = 0.15f))
            .padding(horizontal = 10.dp, vertical = 4.dp)
    ) {
        Text(text = text, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = Gold)
    }
}

@Composable
fun DetailItem(icon: ImageVector, label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(SurfaceDark)
            .border(1.dp, CardBorder, RoundedCornerShape(16.dp))
            .padding(14.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .clip(RoundedCornerShape(12.dp))
                .background(Saffron.copy(alpha = 0.15f)),
            contentAlignment = Alignment.Center
        ) {
            Icon(icon, contentDescription = null, tint = Gold, modifier = Modifier.size(20.dp))
        }

        Spacer(modifier = Modifier.width(12.dp))

        Column {
            Text(text = label, fontSize = 11.sp, color = TextSecondary)
            Text(text = value, fontSize = 15.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
        }
    }
}

@Composable
fun PhotoThumbnailCard(modifier: Modifier = Modifier, label: String, bitmap: android.graphics.Bitmap?) {
    Column(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(SurfaceDark)
            .border(1.dp, CardBorder, RoundedCornerShape(16.dp))
            .padding(10.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(1f)
                .clip(RoundedCornerShape(12.dp))
                .background(Surface2Dark),
            contentAlignment = Alignment.Center
        ) {
            if (bitmap != null) {
                Image(
                    bitmap = bitmap.asImageBitmap(),
                    contentDescription = label,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )
            } else {
                Icon(Icons.Default.Sparkles, contentDescription = null, tint = TextSecondary.copy(alpha = 0.4f), modifier = Modifier.size(32.dp))
            }
        }

        Text(
            text = label,
            fontSize = 12.sp,
            color = TextSecondary,
            modifier = Modifier.padding(top = 8.dp)
        )
    }
}
