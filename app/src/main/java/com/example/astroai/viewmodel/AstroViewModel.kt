package com.example.astroai.viewmodel

import android.app.Application
import android.content.Context
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.astroai.data.AstroDatabase
import com.example.astroai.data.AstroRepository
import com.example.astroai.model.AstroProfile
import com.example.astroai.model.ChatMessage
import com.example.astroai.util.AstroCalculations
import com.example.astroai.util.LanguageDictionary
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class AstroUiState(
    val isAuthed: Boolean = false,
    val profile: AstroProfile? = null,
    val chatHistory: List<ChatMessage> = emptyList(),
    val language: String = "en",
    val isTyping: Boolean = false,
    val isLoading: Boolean = true
)

class AstroViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: AstroRepository
    private val prefs = application.getSharedPreferences("astroai_prefs", Context.MODE_PRIVATE)

    private val _uiState = MutableStateFlow(AstroUiState())
    val uiState: StateFlow<AstroUiState> = _uiState.asStateFlow()

    private val careerKeywords = listOf(
        "career", "wealth", "money", "job", "करियर", "धन", "नौकरी", "कर्म", "কর্ম", "সম্পদ",
        "தொழில்", "செல்வம்", "వృత్తి", "సంపద", "करिअर", "કારકિર્દી", "ವೃತ್ತಿ", "കരിയർ", "ਕਰੀਅਰ", "کیریئر", "دولت", "କ୍ୟାରିଅର"
    )

    private val loveKeywords = listOf(
        "marriage", "love", "relationship", "partner", "विवाह", "प्रेम", "प्यार", "বিবাহ", "प्रेम",
        "திருமணம்", "காதல்", "వివాహం", "ప్రేమ", "લગ્ન", "ವಿವಾಹ", "ಪ್ರೇಮ", "വിവാഹം", "പ്രണയം", "ਵਿਆਹ", "ਪਿਆਰ", "شادی", "محبت", "ବିବାହ"
    )

    private val healthKeywords = listOf(
        "health", "body", "wellness", "स्वास्थ्य", "आरोग्य", "সুস্থ", "স্বাস্থ্য", "உடல்நலம்",
        "ఆరోగ్య", "આરોગ્ય", "ಆರೋಗ್ಯ", "ആരോഗ്യ", "ਸਿਹਤ", "صحت", "ସ୍ୱାସ୍ଥ୍ୟ"
    )

    private val saturnKeywords = listOf(
        "sade sati", "saturn", "shani", "साढ़े साती", "साडेसाती", "शनि", "সাড়ে সাতি", "শনি",
        "சடே சதி", "சனி", "సాడే సతి", "శని", "સાડાસાતી", "ಸಾಡೇ ಸತಿ", "സാഡേ സതി", "ਸਾਢੇ ਸਾਤੀ", "ساڑھے ساتی", "ساڑھے", "ସାଢେ ସାତି"
    )

    init {
        val database = AstroDatabase.getInstance(application)
        repository = AstroRepository(database.astroDao())

        val savedAuth = prefs.getBoolean("is_authed", false)
        val savedLang = prefs.getString("language", "en") ?: "en"

        _uiState.update { it.copy(isAuthed = savedAuth, language = savedLang) }

        viewModelScope.launch {
            launch {
                repository.profileFlow.collect { profile ->
                    _uiState.update { current ->
                        current.copy(
                            profile = profile,
                            isLoading = false
                        )
                    }
                    ensureGreeting(profile, _uiState.value.language)
                }
            }
            launch {
                repository.chatHistoryFlow.collect { messages ->
                    _uiState.update { it.copy(chatHistory = messages) }
                }
            }
        }
    }

    private fun ensureGreeting(profile: AstroProfile?, lang: String) {
        viewModelScope.launch {
            val existing = repository.chatHistoryFlow.firstOrNull() ?: emptyList()
            if (existing.isEmpty()) {
                val fn = AstroCalculations.firstName(profile?.name)
                val sign = AstroCalculations.getSign(profile?.dob ?: "").name
                val nak = AstroCalculations.nakshatra(profile)
                val dict = LanguageDictionary.dict(lang)
                val text = dict.greeting(fn, sign, nak, profile?.pob.orEmpty())
                repository.insertMessage(ChatMessage(role = "guru", text = text))
            }
        }
    }

    fun loginWithGoogle() {
        prefs.edit().putBoolean("is_authed", true).apply()
        _uiState.update { it.copy(isAuthed = true) }
    }

    fun saveProfile(profile: AstroProfile) {
        viewModelScope.launch {
            repository.saveProfile(profile)
        }
    }

    fun setLanguage(code: String) {
        prefs.edit().putString("language", code).apply()
        _uiState.update { it.copy(language = code) }
        viewModelScope.launch {
            val history = _uiState.value.chatHistory
            val fn = AstroCalculations.firstName(_uiState.value.profile?.name)
            val sign = AstroCalculations.getSign(_uiState.value.profile?.dob ?: "").name
            val nak = AstroCalculations.nakshatra(_uiState.value.profile)
            val dict = LanguageDictionary.dict(code)
            val greetingText = dict.greeting(fn, sign, nak, _uiState.value.profile?.pob.orEmpty())

            if (history.size <= 1) {
                repository.clearChat()
                repository.insertMessage(ChatMessage(role = "guru", text = greetingText))
            } else {
                repository.insertMessage(ChatMessage(role = "guru", text = greetingText))
            }
        }
    }

    fun sendMessage(userText: String) {
        val trimmed = userText.trim()
        if (trimmed.isBlank()) return

        viewModelScope.launch {
            repository.insertMessage(ChatMessage(role = "user", text = trimmed))
            _uiState.update { it.copy(isTyping = true) }

            delay(1300)

            val reply = generateReply(trimmed)
            repository.insertMessage(ChatMessage(role = "guru", text = reply))
            _uiState.update { it.copy(isTyping = false) }
        }
    }

    private fun generateReply(query: String): String {
        val ql = query.lowercase()
        val profile = _uiState.value.profile
        val fn = AstroCalculations.firstName(profile?.name)
        val sign = AstroCalculations.getSign(profile?.dob ?: "")
        val nak = AstroCalculations.nakshatra(profile)
        val dict = LanguageDictionary.dict(_uiState.value.language)

        if (careerKeywords.any { ql.contains(it) }) return dict.career(fn, sign.ruler)
        if (loveKeywords.any { ql.contains(it) }) return dict.love(fn, sign.name)
        if (healthKeywords.any { ql.contains(it) }) return dict.health(fn, nak, sign.ruler)
        if (saturnKeywords.any { ql.contains(it) }) return dict.saturn(sign.name)

        return dict.fallback(fn, sign.name, sign.ruler)
    }

    fun clearChat() {
        viewModelScope.launch {
            repository.clearChat()
            val profile = _uiState.value.profile
            val fn = AstroCalculations.firstName(profile?.name)
            val sign = AstroCalculations.getSign(profile?.dob ?: "").name
            val nak = AstroCalculations.nakshatra(profile)
            val dict = LanguageDictionary.dict(_uiState.value.language)
            val text = dict.greeting(fn, sign, nak, profile?.pob.orEmpty())
            repository.insertMessage(ChatMessage(role = "guru", text = text))
        }
    }

    fun resetApp() {
        prefs.edit().clear().apply()
        _uiState.update {
            AstroUiState(
                isAuthed = false,
                profile = null,
                chatHistory = emptyList(),
                language = "en",
                isTyping = false,
                isLoading = false
            )
        }
        viewModelScope.launch {
            repository.clearProfile()
            repository.clearChat()
        }
    }
}
