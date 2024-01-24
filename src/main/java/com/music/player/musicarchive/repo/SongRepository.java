package com.music.player.musicarchive.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.music.player.musicarchive.models.Song;

public interface SongRepository extends MongoRepository<Song, String>{

    // boolean findSongsByTitle(String title);

}
