package com.music.player.musicarchive.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.music.player.musicarchive.models.Song;
import com.music.player.musicarchive.service.SongService;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("/message")
    public ResponseEntity<?> messagEntity(){
        return ResponseEntity.ok("Your API for Song Application is working!");
    }

    @PostMapping("/addFile")
    public ResponseEntity<Song> addFile(@RequestPart("file") MultipartFile file,
                                        @RequestParam("songTitle") String songTitle,
                                        @RequestParam("artist") String artist,
                                        @RequestParam("genre") String genre,
                                        @RequestParam("isFavorited") boolean isFavorited) {
        Song newSong = new Song();
        newSong.setSongTitle(songTitle);
        newSong.setArtist(artist);
        newSong.setGenre(genre);
        newSong.setFavorited(isFavorited);

        // Add file and update song details
        Song savedSong = songService.addNewSong(newSong, file);

        return ResponseEntity.ok(savedSong);
    }

    @PostMapping("/save-file")
    public ResponseEntity<String> saveFile(@RequestParam("file") MultipartFile file, @RequestParam("songId") String songId) {
        System.out.println("\n\n\n inside save song \n\n\n"+file.getName());
        String fileId = songService.saveFileToGridFS(file, songId);
        return ResponseEntity.ok(fileId);
    }


    @GetMapping("/{songId}")
    public ResponseEntity<Song> getSongById(@PathVariable String songId) {
        Song song = songService.getSongById(songId);
        if (song != null) {
            return ResponseEntity.ok(song);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Song>> getAllSongs() {
        List<Song> songs = songService.getAllSongs();
        return ResponseEntity.ok(songs);
    }

    @DeleteMapping("/{songId}")
    public ResponseEntity<Void> deleteSongById(@PathVariable String songId) {
        songService.deleteSongById(songId);
        return ResponseEntity.noContent().build();
    }

    // Additional controller methods...

}
