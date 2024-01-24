package com.music.player.musicarchive.service;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.music.player.musicarchive.models.Song;


public interface SongService {

    String saveFileToGridFS(MultipartFile file, String songId);

    Song addNewSong(Song newSong, MultipartFile file);

    Song getSongById(String songId);

    List<Song> getAllSongs();

    void deleteSongById(String songId);
}
