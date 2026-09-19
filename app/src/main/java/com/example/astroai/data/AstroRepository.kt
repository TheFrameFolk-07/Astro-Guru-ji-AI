package com.example.astroai.data

import com.example.astroai.model.AstroProfile
import com.example.astroai.model.ChatMessage
import kotlinx.coroutines.flow.Flow

class AstroRepository(private val dao: AstroDao) {
    val profileFlow: Flow<AstroProfile?> = dao.getProfile()
    val chatHistoryFlow: Flow<List<ChatMessage>> = dao.getChatHistory()

    suspend fun getProfileOnce(): AstroProfile? = dao.getProfileOnce()

    suspend fun saveProfile(profile: AstroProfile) {
        dao.saveProfile(profile)
    }

    suspend fun clearProfile() {
        dao.clearProfile()
    }

    suspend fun insertMessage(message: ChatMessage): Long {
        return dao.insertMessage(message)
    }

    suspend fun clearChat() {
        dao.clearChat()
    }
}
