package com.music.player.musicarchive.service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.music.player.musicarchive.models.Song;
import com.music.player.musicarchive.repo.SongRepository;

import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.apache.commons.io.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
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

    // @Override
    // public byte[] getSongFileById(String songId) throws IOException {
    //     GridFSFile gridFSFile = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(songId)));

    //     if (gridFSFile == null) {
    //         throw new IOException("File not found with ID: " + songId);
    //     }

    //     try (InputStream inputStream = gridFsTemplate.getResource(gridFSFile).getInputStream()) {
    //         return IOUtils.toByteArray(inputStream);
    //     } catch (IOException e) {
    //         throw new RuntimeException("Failed to read file from GridFS: " + e.getMessage());
    //     }
    // }

    @Override
    public Resource getSongFileById(String songId) throws IllegalStateException, IOException {
        // Retrieve the file from GridFS based on the songId
        GridFSFile gridFsFile = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(new ObjectId(songId))));

        if (gridFsFile == null) {
            throw new RuntimeException("File not found with ID: " + songId);
        }

        GridFsResource gridFsResource = gridFsTemplate.getResource(gridFsFile);

        return new ByteArrayResource(IOUtils.toByteArray(gridFsResource.getInputStream()));
    }

}
