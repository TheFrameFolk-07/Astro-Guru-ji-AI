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
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Language
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Sparkles
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.astroai.model.AstroProfile
import com.example.astroai.model.ChatMessage
import com.example.astroai.theme.BorderColor
import com.example.astroai.theme.EmeraldOnline
import com.example.astroai.theme.Gold
import com.example.astroai.theme.Saffron
import com.example.astroai.theme.Surface2Dark
import com.example.astroai.theme.SurfaceDark
import com.example.astroai.theme.TextPrimary
import com.example.astroai.theme.TextSecondary
import com.example.astroai.util.LanguageDictionary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GuruChatScreen(
    profile: AstroProfile?,
    chatHistory: List<ChatMessage>,
    language: String,
    isTyping: Boolean,
    onSendMessage: (String) -> Unit,
    onClearChat: () -> Unit,
    onLanguageChange: (String) -> Unit
) {
    var inputText by remember { mutableStateOf("") }
    var showChart by remember { mutableStateOf(false) }
    var showLanguageSheet by remember { mutableStateOf(false) }
    val dict = remember(language) { LanguageDictionary.dict(language) }

    val listState = rememberLazyListState()

    LaunchedEffect(chatHistory.size, isTyping) {
        if (chatHistory.isNotEmpty()) {
            listState.animateScrollToItem(chatHistory.size - 1)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0B0C10))
            .testTag("guru_chat_screen")
    ) {
        // Top Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(SurfaceDark)
                .border(1.dp, BorderColor.copy(alpha = 0.5f))
                .padding(horizontal = 16.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Guru Avatar with online badge
            Box(modifier = Modifier.size(46.dp)) {
                Box(
                    modifier = Modifier
                        .size(42.dp)
                        .clip(CircleShape)
                        .background(Brush.linearGradient(listOf(Saffron, Gold))),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Sparkles,
                        contentDescription = "Guru Ji",
                        tint = Color(0xFF1A1206),
                        modifier = Modifier.size(22.dp)
                    )
                }

                // Green online dot
                Box(
                    modifier = Modifier
                        .size(13.dp)
                        .clip(CircleShape)
                        .background(EmeraldOnline)
                        .border(2.dp, SurfaceDark, CircleShape)
                        .align(Alignment.BottomEnd)
                )
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "Guru Ji",
                    fontFamily = FontFamily.Serif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = Color.White
                )
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(6.dp)
                            .clip(CircleShape)
                            .background(EmeraldOnline)
                    )
                    Spacer(modifier = Modifier.width(5.dp))
                    Text(
                        text = "Online · AI Master Astrologer",
                        fontSize = 11.sp,
                        color = EmeraldOnline
                    )
                }
            }

            // Language Selector Button
            IconButton(
                onClick = { showLanguageSheet = true },
                modifier = Modifier.testTag("language_selector_button")
            ) {
                Icon(
                    imageVector = Icons.Default.Language,
                    contentDescription = "Change Language",
                    tint = Gold
                )
            }

            // Clear chat button
            IconButton(
                onClick = onClearChat,
                modifier = Modifier.testTag("clear_chat_button")
            ) {
                Icon(
                    imageVector = Icons.Default.Delete,
                    contentDescription = "Clear Chat",
                    tint = TextSecondary
                )
            }
        }

        // Accordion Birth Chart banner
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(SurfaceDark.copy(alpha = 0.7f))
                .border(0.5.dp, BorderColor.copy(alpha = 0.3f))
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { showChart = !showChart }
                    .padding(horizontal = 16.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.MenuBook,
                        contentDescription = null,
                        tint = Gold,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = dict.chartTitle,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Gold
                    )
                }
                Icon(
                    imageVector = if (showChart) Icons.Default.ExpandLess else Icons.Default.ExpandMore,
                    contentDescription = null,
                    tint = Gold
                )
            }

            AnimatedVisibility(visible = showChart) {
                Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
                    BirthChartCard(profile = profile)
                }
            }
        }

        // Message List
        LazyColumn(
            state = listState,
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 14.dp),
            contentPadding = PaddingValues(vertical = 12.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(chatHistory, key = { it.id }) { msg ->
                ChatBubble(message = msg)
            }

            if (isTyping) {
                item {
                    TypingBubble()
                }
            }
        }

        // Quick suggestion chips
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 12.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            dict.chips.forEach { chip ->
                Box(
                    modifier = Modifier
                        .clip(CircleShape)
                        .background(SurfaceDark)
                        .border(1.dp, Gold.copy(alpha = 0.4f), CircleShape)
                        .clickable { onSendMessage(chip) }
                        .padding(horizontal = 14.dp, vertical = 7.dp)
                        .testTag("quick_chip_${chip.take(6)}"),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = chip,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Medium,
                        color = Gold
                    )
                }
            }
        }

        // Bottom Input Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(SurfaceDark)
                .border(1.dp, BorderColor.copy(alpha = 0.4f))
                .padding(horizontal = 12.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            OutlinedTextField(
                value = inputText,
                onValueChange = { inputText = it },
                placeholder = { Text(dict.placeholder, color = TextSecondary) },
                singleLine = true,
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Send),
                keyboardActions = KeyboardActions(onSend = {
                    if (inputText.isNotBlank()) {
                        val text = inputText
                        inputText = ""
                        onSendMessage(text)
                    }
                }),
                shape = RoundedCornerShape(24.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = Gold,
                    unfocusedBorderColor = BorderColor,
                    focusedTextColor = TextPrimary,
                    unfocusedTextColor = TextPrimary,
                    focusedContainerColor = Surface2Dark,
                    unfocusedContainerColor = Surface2Dark
                ),
                modifier = Modifier
                    .weight(1f)
                    .testTag("chat_input_field")
            )

            Spacer(modifier = Modifier.width(8.dp))

            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(Brush.linearGradient(listOf(Saffron, Gold)))
                    .clickable {
                        if (inputText.isNotBlank()) {
                            val text = inputText
                            inputText = ""
                            onSendMessage(text)
                        }
                    }
                    .testTag("chat_send_button"),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.Send,
                    contentDescription = "Send",
                    tint = Color(0xFF1A1206),
                    modifier = Modifier.size(20.dp)
                )
            }
        }
    }

    // Language Bottom Sheet
    if (showLanguageSheet) {
        val sheetState = rememberModalBottomSheetState()
        ModalBottomSheet(
            onDismissRequest = { showLanguageSheet = false },
            sheetState = sheetState,
            containerColor = SurfaceDark
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 12.dp)
            ) {
                Text(
                    text = "Select Language",
                    fontFamily = FontFamily.Serif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 20.sp,
                    color = Gold,
                    modifier = Modifier.padding(bottom = 14.dp)
                )

                LazyColumn(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(380.dp)
                ) {
                    items(LanguageDictionary.LANGUAGES) { lang ->
                        val selected = lang.code == language
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(12.dp))
                                .background(if (selected) Saffron.copy(alpha = 0.2f) else Color.Transparent)
                                .clickable {
                                    onLanguageChange(lang.code)
                                    showLanguageSheet = false
                                }
                                .padding(horizontal = 16.dp, vertical = 12.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = lang.label,
                                fontSize = 16.sp,
                                fontWeight = if (selected) FontWeight.Bold else FontWeight.Normal,
                                color = if (selected) Gold else TextPrimary
                            )
                            Text(
                                text = lang.english,
                                fontSize = 13.sp,
                                color = TextSecondary
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ChatBubble(message: ChatMessage) {
    val isGuru = message.role == "guru"

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = if (isGuru) Arrangement.Start else Arrangement.End
    ) {
        Box(
            modifier = Modifier
                .widthIn(max = 310.dp)
                .clip(
                    RoundedCornerShape(
                        topStart = 18.dp,
                        topEnd = 18.dp,
                        bottomStart = if (isGuru) 4.dp else 18.dp,
                        bottomEnd = if (isGuru) 18.dp else 4.dp
                    )
                )
                .background(
                    if (isGuru) Saffron.copy(alpha = 0.16f) else Surface2Dark
                )
                .border(
                    0.5.dp,
                    if (isGuru) Saffron.copy(alpha = 0.35f) else BorderColor.copy(alpha = 0.3f),
                    RoundedCornerShape(
                        topStart = 18.dp,
                        topEnd = 18.dp,
                        bottomStart = if (isGuru) 4.dp else 18.dp,
                        bottomEnd = if (isGuru) 18.dp else 4.dp
                    )
                )
                .padding(horizontal = 14.dp, vertical = 11.dp)
        ) {
            Text(
                text = message.text,
                color = TextPrimary,
                fontSize = 15.sp,
                lineHeight = 22.sp
            )
        }
    }
}

@Composable
fun TypingBubble() {
    val infiniteTransition = rememberInfiniteTransition(label = "typing_dots")
    val dot1 by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = -6f,
        animationSpec = infiniteRepeatable(
            animation = tween(400),
            repeatMode = RepeatMode.Reverse
        ),
        label = "dot1"
    )
    val dot2 by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = -6f,
        animationSpec = infiniteRepeatable(
            animation = tween(400, delayMillis = 150),
            repeatMode = RepeatMode.Reverse
        ),
        label = "dot2"
    )
    val dot3 by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = -6f,
        animationSpec = infiniteRepeatable(
            animation = tween(400, delayMillis = 300),
            repeatMode = RepeatMode.Reverse
        ),
        label = "dot3"
    )

    Box(
        modifier = Modifier
            .clip(
                RoundedCornerShape(
                    topStart = 18.dp,
                    topEnd = 18.dp,
                    bottomStart = 4.dp,
                    bottomEnd = 18.dp
                )
            )
            .background(Saffron.copy(alpha = 0.15f))
            .padding(horizontal = 16.dp, vertical = 12.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(5.dp)
        ) {
            Box(
                modifier = Modifier
                    .offset(y = dot1.dp)
                    .size(7.dp)
                    .clip(CircleShape)
                    .background(Gold)
            )
            Box(
                modifier = Modifier
                    .offset(y = dot2.dp)
                    .size(7.dp)
                    .clip(CircleShape)
                    .background(Gold)
            )
            Box(
                modifier = Modifier
                    .offset(y = dot3.dp)
                    .size(7.dp)
                    .clip(CircleShape)
                    .background(Gold)
            )
        }
    }
}
