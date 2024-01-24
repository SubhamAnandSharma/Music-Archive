package com.music.player.musicarchive.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "songs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Song {

    @Id
    private String id;

    private String songTitle;
    private String artist;
    private String genre;
    private boolean isFavorited;

    private String gridFsFileId;
}
