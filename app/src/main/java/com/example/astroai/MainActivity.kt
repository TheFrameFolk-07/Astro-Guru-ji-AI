package com.example.astroai

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.astroai.theme.AstroAITheme
import com.example.astroai.theme.BackgroundDark
import com.example.astroai.ui.MainScreen
import com.example.astroai.ui.OnboardingScreen
import com.example.astroai.ui.SplashScreen
import com.example.astroai.viewmodel.AstroViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            AstroAITheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = BackgroundDark
                ) {
                    AstroApp()
                }
            }
        }
    }
}

@Composable
fun AstroApp(
    viewModel: AstroViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    if (!uiState.isAuthed) {
        SplashScreen(
            onLoginSuccess = {
                viewModel.loginWithGoogle()
            }
        )
    } else if (uiState.profile == null) {
        OnboardingScreen(
            onSaveProfile = { profile ->
                viewModel.saveProfile(profile)
            }
        )
    } else {
        MainScreen(
            profile = uiState.profile,
            chatHistory = uiState.chatHistory,
            language = uiState.language,
            isTyping = uiState.isTyping,
            onSendMessage = { text ->
                viewModel.sendMessage(text)
            },
            onClearChat = {
                viewModel.clearChat()
            },
            onLanguageChange = { code ->
                viewModel.setLanguage(code)
            },
            onSaveProfile = { updated ->
                viewModel.saveProfile(updated)
            },
            onResetApp = {
                viewModel.resetApp()
            }
        )
    }
}
