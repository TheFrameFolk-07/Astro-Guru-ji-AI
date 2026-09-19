package com.example.astroai.ui

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.Image
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Face
import androidx.compose.material.icons.filled.Fingerprint
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PhotoCamera
import androidx.compose.material.icons.filled.PhotoLibrary
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Sparkles
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.astroai.model.AstroProfile
import com.example.astroai.theme.BorderColor
import com.example.astroai.theme.CardBorder
import com.example.astroai.theme.Gold
import com.example.astroai.theme.Saffron
import com.example.astroai.theme.Surface2Dark
import com.example.astroai.theme.SurfaceDark
import com.example.astroai.theme.TextPrimary
import com.example.astroai.theme.TextSecondary
import com.example.astroai.util.ImageAnalysisUtils
import java.util.Calendar

@Composable
fun OnboardingScreen(
    initialProfile: AstroProfile? = null,
    onSaveProfile: (AstroProfile) -> Unit,
    onCancel: (() -> Unit)? = null
) {
    val context = LocalContext.current
    var step by remember { mutableIntStateOf(0) }
    val totalSteps = 6

    var name by remember { mutableStateOf(initialProfile?.name.orEmpty()) }
    var dob by remember { mutableStateOf(initialProfile?.dob.orEmpty()) }
    var tob by remember { mutableStateOf(initialProfile?.tob.orEmpty()) }
    var pob by remember { mutableStateOf(initialProfile?.pob.orEmpty()) }

    var faceBitmap by remember {
        mutableStateOf(
            initialProfile?.facePhoto?.let { ImageAnalysisUtils.decodeBase64ToBitmap(it) }
        )
    }
    var faceReading by remember { mutableStateOf(initialProfile?.faceReading) }

    var palmBitmap by remember {
        mutableStateOf(
            initialProfile?.palmPhoto?.let { ImageAnalysisUtils.decodeBase64ToBitmap(it) }
        )
    }
    var palmReading by remember { mutableStateOf(initialProfile?.palmReading) }

    val canNext = when (step) {
        0 -> name.trim().length > 1
        1 -> dob.isNotBlank()
        2 -> tob.isNotBlank()
        3 -> pob.trim().length > 1
        else -> true // photos optional
    }

    // Camera & Gallery launchers
    var pendingImageType by remember { mutableStateOf<String?>(null) } // "face" or "palm"

    val cameraLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.TakePicturePreview()
    ) { bitmap: Bitmap? ->
        if (bitmap != null) {
            val (scaled, metrics) = ImageAnalysisUtils.analyzeBitmap(bitmap)
            if (pendingImageType == "face") {
                faceBitmap = scaled
                faceReading = ImageAnalysisUtils.faceReading(metrics)
            } else if (pendingImageType == "palm") {
                palmBitmap = scaled
                palmReading = ImageAnalysisUtils.palmReading(metrics)
            }
        }
    }

    val galleryLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        if (uri != null) {
            try {
                val stream = context.contentResolver.openInputStream(uri)
                val original = BitmapFactory.decodeStream(stream)
                stream?.close()
                if (original != null) {
                    val (scaled, metrics) = ImageAnalysisUtils.analyzeBitmap(original)
                    if (pendingImageType == "face") {
                        faceBitmap = scaled
                        faceReading = ImageAnalysisUtils.faceReading(metrics)
                    } else if (pendingImageType == "palm") {
                        palmBitmap = scaled
                        palmReading = ImageAnalysisUtils.palmReading(metrics)
                    }
                }
            } catch (_: Exception) {
                Toast.makeText(context, "Could not load image", Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun pickOrCapture(type: String, mode: String) {
        pendingImageType = type
        if (mode == "camera") {
            cameraLauncher.launch(null)
        } else {
            galleryLauncher.launch("image/*")
        }
    }

    fun submit() {
        val faceBase64 = faceBitmap?.let { ImageAnalysisUtils.encodeBitmapToBase64(it) }
        val palmBase64 = palmBitmap?.let { ImageAnalysisUtils.encodeBitmapToBase64(it) }

        val profile = AstroProfile(
            name = name.trim(),
            dob = dob,
            tob = tob,
            pob = pob.trim(),
            facePhoto = faceBase64,
            palmPhoto = palmBase64,
            faceReading = faceReading,
            palmReading = palmReading,
            createdAt = initialProfile?.createdAt ?: System.currentTimeMillis()
        )
        onSaveProfile(profile)
        onCancel?.invoke()
    }

    // DatePicker & TimePicker helpers
    fun showDatePicker() {
        val cal = Calendar.getInstance()
        DatePickerDialog(
            context,
            { _, year, month, day ->
                val formatted = String.format("%04d-%02d-%02d", year, month + 1, day)
                dob = formatted
            },
            cal.get(Calendar.YEAR) - 25,
            cal.get(Calendar.MONTH),
            cal.get(Calendar.DAY_OF_MONTH)
        ).show()
    }

    fun showTimePicker() {
        val cal = Calendar.getInstance()
        TimePickerDialog(
            context,
            { _, hourOfDay, minute ->
                val formatted = String.format("%02d:%02d", hourOfDay, minute)
                tob = formatted
            },
            12,
            0,
            true
        ).show()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .testTag("onboarding_screen")
    ) {
        CosmicBackground()

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp, vertical = 28.dp)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Header: Close / Progress Bar
            Column(modifier = Modifier.fillMaxWidth()) {
                if (onCancel != null) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Edit Details",
                            fontFamily = FontFamily.Serif,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold,
                            color = Gold
                        )
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(SurfaceDark)
                                .border(1.dp, CardBorder, CircleShape)
                                .clickable { onCancel() },
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.Close,
                                contentDescription = "Close",
                                tint = TextPrimary,
                                modifier = Modifier.size(20.dp)
                            )
                        }
                    }
                }

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    if (step > 0) {
                        Box(
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(SurfaceDark)
                                .border(1.dp, CardBorder, CircleShape)
                                .clickable { step -= 1 }
                                .testTag("onboarding_back_button"),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                                contentDescription = "Back",
                                tint = TextPrimary,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    } else {
                        Spacer(modifier = Modifier.size(36.dp))
                    }

                    Spacer(modifier = Modifier.width(12.dp))

                    // Progress bar
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(8.dp)
                            .clip(RoundedCornerShape(4.dp))
                            .background(Surface2Dark)
                    ) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth((step + 1) / totalSteps.toFloat())
                                .height(8.dp)
                                .clip(RoundedCornerShape(4.dp))
                                .background(
                                    Brush.horizontalGradient(listOf(Saffron, Gold))
                                )
                        )
                    }

                    Spacer(modifier = Modifier.width(12.dp))

                    Text(
                        text = "${step + 1}/$totalSteps",
                        color = Gold,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }

            Spacer(modifier = Modifier.height(28.dp))

            // Step Content
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f, fill = false)
            ) {
                when (step) {
                    0 -> StepShell(
                        icon = Icons.Default.Person,
                        title = "What's your name?",
                        subtitle = "So Guru Ji knows who he's guiding."
                    ) {
                        OutlinedTextField(
                            value = name,
                            onValueChange = { name = it },
                            label = { Text("Full Name") },
                            singleLine = true,
                            colors = textFieldColors(),
                            shape = RoundedCornerShape(16.dp),
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("name_input")
                        )
                    }

                    1 -> StepShell(
                        icon = Icons.Default.CalendarMonth,
                        title = "Date of Birth",
                        subtitle = "Your cosmic blueprint begins here."
                    ) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(16.dp))
                                .background(SurfaceDark)
                                .border(1.dp, if (dob.isNotBlank()) Gold else CardBorder, RoundedCornerShape(16.dp))
                                .clickable { showDatePicker() }
                                .padding(18.dp)
                                .testTag("dob_picker_button"),
                            contentAlignment = Alignment.CenterStart
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.CalendarMonth, contentDescription = null, tint = Gold)
                                Spacer(modifier = Modifier.width(12.dp))
                                Text(
                                    text = if (dob.isBlank()) "Select Date of Birth (YYYY-MM-DD)" else dob,
                                    fontSize = 16.sp,
                                    color = if (dob.isBlank()) TextSecondary else TextPrimary
                                )
                            }
                        }
                    }

                    2 -> StepShell(
                        icon = Icons.Default.Schedule,
                        title = "Time of Birth",
                        subtitle = "Exact time refines your planetary houses."
                    ) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(16.dp))
                                .background(SurfaceDark)
                                .border(1.dp, if (tob.isNotBlank()) Gold else CardBorder, RoundedCornerShape(16.dp))
                                .clickable { showTimePicker() }
                                .padding(18.dp)
                                .testTag("tob_picker_button"),
                            contentAlignment = Alignment.CenterStart
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Schedule, contentDescription = null, tint = Gold)
                                Spacer(modifier = Modifier.width(12.dp))
                                Text(
                                    text = if (tob.isBlank()) "Select Time of Birth (HH:MM)" else tob,
                                    fontSize = 16.sp,
                                    color = if (tob.isBlank()) TextSecondary else TextPrimary
                                )
                            }
                        }
                    }

                    3 -> StepShell(
                        icon = Icons.Default.LocationOn,
                        title = "Place of Birth",
                        subtitle = "City, State, Country"
                    ) {
                        OutlinedTextField(
                            value = pob,
                            onValueChange = { pob = it },
                            label = { Text("e.g. Varanasi, UP, India") },
                            singleLine = true,
                            colors = textFieldColors(),
                            shape = RoundedCornerShape(16.dp),
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("pob_input")
                        )
                    }

                    4 -> StepShell(
                        icon = Icons.Default.Face,
                        title = "Face Reading",
                        subtitle = "Upload Face Photo for Face Reading"
                    ) {
                        PhotoUploadCard(
                            label = "Face Photo",
                            bitmap = faceBitmap,
                            reading = faceReading,
                            onCameraClick = { pickOrCapture("face", "camera") },
                            onGalleryClick = { pickOrCapture("face", "gallery") },
                            onClear = {
                                faceBitmap = null
                                faceReading = null
                            }
                        )
                    }

                    5 -> StepShell(
                        icon = Icons.Default.Fingerprint,
                        title = "Palmistry",
                        subtitle = "Upload Palm Photo for Hast Rekha Analysis"
                    ) {
                        PhotoUploadCard(
                            label = "Palm Photo",
                            bitmap = palmBitmap,
                            reading = palmReading,
                            onCameraClick = { pickOrCapture("palm", "camera") },
                            onGalleryClick = { pickOrCapture("palm", "gallery") },
                            onClear = {
                                palmBitmap = null
                                palmReading = null
                            }
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(28.dp))

            // Footer action
            Column(modifier = Modifier.fillMaxWidth()) {
                Button(
                    onClick = {
                        if (step < totalSteps - 1) {
                            step += 1
                        } else {
                            submit()
                        }
                    },
                    enabled = canNext,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp)
                        .testTag("onboarding_continue_button"),
                    shape = RoundedCornerShape(16.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Gold,
                        contentColor = Color(0xFF1A1206),
                        disabledContainerColor = Surface2Dark,
                        disabledContentColor = TextSecondary.copy(alpha = 0.5f)
                    )
                ) {
                    if (step < totalSteps - 1) {
                        Text(
                            text = "Continue",
                            fontWeight = FontWeight.Bold,
                            fontSize = 16.sp
                        )
                    } else {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Sparkles, contentDescription = null, modifier = Modifier.size(18.dp))
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = if (onCancel != null) "Save & Recompute Charts" else "Submit & Generate Charts",
                                fontWeight = FontWeight.Bold,
                                fontSize = 16.sp
                            )
                        }
                    }
                }

                if (step >= 4) {
                    Text(
                        text = "Photo upload is optional — you can skip.",
                        color = TextSecondary.copy(alpha = 0.7f),
                        fontSize = 12.sp,
                        textAlign = TextAlign.Center,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 10.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun StepShell(
    icon: ImageVector,
    title: String,
    subtitle: String,
    content: @Composable () -> Unit
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Box(
            modifier = Modifier
                .size(54.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(Saffron.copy(alpha = 0.15f)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = Gold,
                modifier = Modifier.size(28.dp)
            )
        }

        Text(
            text = title,
            fontFamily = FontFamily.Serif,
            fontWeight = FontWeight.Bold,
            fontSize = 28.sp,
            color = Color.White,
            modifier = Modifier.padding(top = 18.dp)
        )

        Text(
            text = subtitle,
            fontSize = 14.sp,
            color = TextSecondary,
            modifier = Modifier.padding(top = 6.dp, bottom = 24.dp)
        )

        content()
    }
}

@Composable
fun PhotoUploadCard(
    label: String,
    bitmap: Bitmap?,
    reading: String?,
    onCameraClick: () -> Unit,
    onGalleryClick: () -> Unit,
    onClear: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(20.dp))
            .background(SurfaceDark)
            .border(1.dp, BorderColor, RoundedCornerShape(20.dp))
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        if (bitmap != null) {
            Box(
                modifier = Modifier
                    .size(160.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .border(1.dp, Gold, RoundedCornerShape(16.dp))
            ) {
                Image(
                    bitmap = bitmap.asImageBitmap(),
                    contentDescription = label,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )
            }

            if (!reading.isNullOrBlank()) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 12.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(Saffron.copy(alpha = 0.12f))
                        .padding(12.dp)
                ) {
                    Text(
                        text = reading,
                        fontSize = 13.sp,
                        lineHeight = 18.sp,
                        color = TextPrimary
                    )
                }
            }

            Row(
                modifier = Modifier.padding(top = 12.dp),
                horizontalArrangement = Arrangement.Center
            ) {
                Text(
                    text = "Retake / Change",
                    color = Gold,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier
                        .clip(CircleShape)
                        .clickable { onClear() }
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                )
            }
        } else {
            Icon(
                imageVector = Icons.Default.PhotoCamera,
                contentDescription = null,
                tint = Gold,
                modifier = Modifier.size(42.dp)
            )

            Text(
                text = "Take or choose $label",
                fontSize = 15.sp,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary,
                modifier = Modifier.padding(top = 8.dp)
            )

            Text(
                text = "AI analyzes symmetry, complexion tones & line density",
                fontSize = 12.sp,
                color = TextSecondary,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 4.dp, bottom = 16.dp)
            )

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Button(
                    onClick = onCameraClick,
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Saffron.copy(alpha = 0.2f),
                        contentColor = Gold
                    )
                ) {
                    Icon(Icons.Default.PhotoCamera, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Camera", fontSize = 13.sp)
                }

                Button(
                    onClick = onGalleryClick,
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Surface2Dark,
                        contentColor = TextPrimary
                    )
                ) {
                    Icon(Icons.Default.PhotoLibrary, contentDescription = null, modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Gallery", fontSize = 13.sp)
                }
            }
        }
    }
}

@Composable
fun textFieldColors() = OutlinedTextFieldDefaults.colors(
    focusedBorderColor = Gold,
    unfocusedBorderColor = CardBorder,
    focusedLabelColor = Gold,
    unfocusedLabelColor = TextSecondary,
    focusedTextColor = TextPrimary,
    unfocusedTextColor = TextPrimary,
    focusedContainerColor = SurfaceDark,
    unfocusedContainerColor = SurfaceDark
)
