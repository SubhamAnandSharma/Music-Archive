package com.music.player.musicarchive.service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.music.player.musicarchive.models.Song;
import com.music.player.musicarchive.repo.SongRepository;

import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;
    private final GridFsTemplate gridFsTemplate;
    
    public SongServiceImpl(SongRepository songRepository, GridFsTemplate gridFsTemplate, MongoTemplate mongoTemplate) {
        this.songRepository = songRepository;
        this.gridFsTemplate = gridFsTemplate;
    }

    @Override
    public Song addNewSong(Song newSong, MultipartFile file) {
        // Save song details to MongoDB
        Song savedSong = songRepository.save(newSong);

        // Save the file to GridFS
        if(file != null){
            String fileId = saveFileToGridFS(file, savedSong.getId());
            savedSong.setGridFsFileId(fileId);
        }
        // Update the song with the GridFS file ID
        songRepository.save(savedSong);

        return savedSong;
    }

    @Override
    public Song getSongById(String songId) {
        return songRepository.findById(songId).orElse(null);
    }

    @Override
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @Override
    public void deleteSongById(String songId) {
        // Delete the song from MongoDB
        songRepository.deleteById(songId);

        // Delete the associated file from GridFS
        deleteFileFromGridFS(songId);
    }

    // Additional helper methods...
    @Override
    public String saveFileToGridFS(MultipartFile file, String songId) {
        try (InputStream inputStream = file.getInputStream()) {
            return gridFsTemplate.store(inputStream, songId, file.getContentType()).toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file in GridFS: " + e.getMessage());
        }
    }

    private void deleteFileFromGridFS(String songId) {
        Query query = Query.query(Criteria.where("filename").is(songId));
        gridFsTemplate.delete(query);
    }
}
