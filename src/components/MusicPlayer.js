import React from "react";
import { useState } from "react";

export default function MusicPlayer() {
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Song 1",
      src: "https://prosearch.tribeofnoise.com/artists/show/80868/39651",
    },
    {
      id: 2,
      title: "Song 2",
      src: "https://prosearch.tribeofnoise.com/artists/show/58004/38822",
    },
    {
      id: 3,
      title: "Song 3",
      src: "path/to/song3.mp3",
    },
  ]);

  const [selectedSong, setSelectedSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div>
      <div>
        <h4>Now Playing: {selectedSong.title}</h4>
        <audio src={selectedSong.src} controls={isPlaying} />
        <button onClick={handleTogglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <ul>
          {songs.map((song) => (
            <li key={song.id} onClick={() => handleSongClick(song)}>
              {song.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
