package com.example.astroai.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChatBubble
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Sparkles
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.astroai.model.AstroProfile
import com.example.astroai.model.ChatMessage
import com.example.astroai.theme.BorderColor
import com.example.astroai.theme.Gold
import com.example.astroai.theme.Saffron
import com.example.astroai.theme.SurfaceDark
import com.example.astroai.theme.TextSecondary

enum class NavTab(val label: String, val icon: ImageVector) {
    GURU("Guru Ji", Icons.Default.ChatBubble),
    METHODS("Astrology", Icons.Default.Sparkles),
    PROFILE("Profile", Icons.Default.Person)
}

@Composable
fun MainScreen(
    profile: AstroProfile?,
    chatHistory: List<ChatMessage>,
    language: String,
    isTyping: Boolean,
    onSendMessage: (String) -> Unit,
    onClearChat: () -> Unit,
    onLanguageChange: (String) -> Unit,
    onSaveProfile: (AstroProfile) -> Unit,
    onResetApp: () -> Unit
) {
    var selectedTab by remember { mutableStateOf(NavTab.GURU) }

    Scaffold(
        bottomBar = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(SurfaceDark)
                    .border(1.dp, BorderColor.copy(alpha = 0.4f))
                    .navigationBarsPadding()
                    .padding(vertical = 8.dp),
                horizontalArrangement = Arrangement.SpaceAround,
                verticalAlignment = Alignment.CenterVertically
            ) {
                NavTab.entries.forEach { tab ->
                    val isSelected = selectedTab == tab
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier
                            .clip(CircleShape)
                            .clickable { selectedTab = tab }
                            .padding(horizontal = 20.dp, vertical = 4.dp)
                            .testTag("nav_tab_${tab.name.lowercase()}")
                    ) {
                        Box(
                            modifier = Modifier
                                .size(width = 50.dp, height = 32.dp)
                                .clip(CircleShape)
                                .background(if (isSelected) Saffron.copy(alpha = 0.2f) else Color.Transparent),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(
                                imageVector = tab.icon,
                                contentDescription = tab.label,
                                tint = if (isSelected) Gold else TextSecondary,
                                modifier = Modifier.size(20.dp)
                            )
                        }

                        Text(
                            text = tab.label,
                            fontSize = 11.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                            color = if (isSelected) Gold else TextSecondary,
                            modifier = Modifier.padding(top = 2.dp)
                        )
                    }
                }
            }
        },
        containerColor = Color(0xFF0B0C10)
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (selectedTab) {
                NavTab.GURU -> GuruChatScreen(
                    profile = profile,
                    chatHistory = chatHistory,
                    language = language,
                    isTyping = isTyping,
                    onSendMessage = onSendMessage,
                    onClearChat = onClearChat,
                    onLanguageChange = onLanguageChange
                )
                NavTab.METHODS -> SpecializedAstrologyScreen(
                    profile = profile
                )
                NavTab.PROFILE -> ProfileScreen(
                    profile = profile,
                    chatHistory = chatHistory,
                    onSaveProfile = onSaveProfile,
                    onResetApp = onResetApp
                )
            }
        }
    }
}
