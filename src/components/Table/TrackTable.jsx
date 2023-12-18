import PropTypes from "prop-types";
import Track from '../Track/Track';

const TrackTable = ({tracklist}) => {
  return (
    <div style={{width: "100%", margin: "20px 0", flexDirection: "column", gap: "0"}}>
        <Track isHeader={true}/>
        <hr />
        {tracklist?.map((track, index) => (
            <>
                <Track
                    key={index} 
                    name={track.audio_name}
                    artist={track.created_by}
                    playlistName={track?.playlistName && 'Unknown'}
                    duration={track.durations}
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