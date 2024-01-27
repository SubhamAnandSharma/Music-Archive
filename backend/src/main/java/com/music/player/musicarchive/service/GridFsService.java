package com.music.player.musicarchive.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.GridFSFindIterable;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.music.player.musicarchive.config.MongoConfig;

@Service
public class GridFsService {

    private final GridFSBucket gridFSBucket;

    public GridFsService(MongoConfig mongoConfig) {
        this.gridFSBucket = GridFSBuckets.create(mongoConfig.mongoClient().getDatabase("musicarchive"));
    }

    public String storeFile(InputStream inputStream, String filename) {
        try {
            ObjectId objectId = gridFSBucket.uploadFromStream(filename, inputStream);
            return objectId.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage());
        } finally {
            try {
                inputStream.close();
            } catch (IOException e) {
                // Handle any errors during stream closing
            }
        }
    }

    public GridFSDownloadStream retrieveFile(String songId) {
        try {
            return gridFSBucket.openDownloadStream(new ObjectId(songId));
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve file: " + e.getMessage());
        }
    }

    public List<GridFSFile> listFiles() {
        GridFSFindIterable files = gridFSBucket.find();
        List<GridFSFile> fileList = new ArrayList<>();
        for (GridFSFile file : files) {
            fileList.add(file);
        }
        return fileList;
    }
}
