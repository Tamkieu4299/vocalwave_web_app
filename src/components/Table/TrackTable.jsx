import PropTypes from "prop-types";
import Track from '../Track/Track';

const TrackTable = ({tracklist, onPlay}) => {
  console.log(tracklist);
  return (
    <div style={{width: "100%", margin: "20px 0", flexDirection: "column", gap: "0"}}>
        <Track isHeader={true}/>
        <hr />
        {tracklist?.map((track) => (
            <>
                <Track
                    key={track.audio_id} 
                    songId={track.audio_id}
                    name={track.audio_name}
                    artist={track.created_by}
                    playlistName={track?.playlistName && 'Unknown'}
                    duration={track.durations}
                    onClick={onPlay}
                />   
                <hr />
            </>
        ))}
    </div>
  )
}

TrackTable.propTypes = {
    tracklist: PropTypes.array
};

export default TrackTable