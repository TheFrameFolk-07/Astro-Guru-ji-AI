package com.example.astroai.data

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.astroai.model.AstroProfile
import com.example.astroai.model.ChatMessage
import kotlinx.coroutines.flow.Flow

@Dao
interface AstroDao {
    @Query("SELECT * FROM astro_profile WHERE id = 1")
    fun getProfile(): Flow<AstroProfile?>

    @Query("SELECT * FROM astro_profile WHERE id = 1")
    suspend fun getProfileOnce(): AstroProfile?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveProfile(profile: AstroProfile)

    @Query("DELETE FROM astro_profile")
    suspend fun clearProfile()

    @Query("SELECT * FROM chat_messages ORDER BY id ASC")
    fun getChatHistory(): Flow<List<ChatMessage>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMessage(message: ChatMessage): Long

    @Query("DELETE FROM chat_messages")
    suspend fun clearChat()
}
