package com.example.astroai.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.astroai.model.AstroProfile
import com.example.astroai.model.ChatMessage

@Database(entities = [AstroProfile::class, ChatMessage::class], version = 1, exportSchema = false)
abstract class AstroDatabase : RoomDatabase() {
    abstract fun astroDao(): AstroDao

    companion object {
        @Volatile
        private var INSTANCE: AstroDatabase? = null

        fun getInstance(context: Context): AstroDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AstroDatabase::class.java,
                    "astroai_database"
                ).fallbackToDestructiveMigration().build()
                INSTANCE = instance
                instance
            }
        }
    }
}
