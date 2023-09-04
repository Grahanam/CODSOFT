import YouTube from 'react-youtube'



const Youtubevid=({videoId})=>{
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
          // Add any additional player parameters here, e.g., autoplay, showinfo, etc.
        },
      };
    
      // Function to handle events from the YouTube player
      const onReady = (event) => {
        // You can add any custom logic here when the video player is ready
      };
    return(
        <>
            <div className='relative z-0 pt-25 w-[300px] md:w-[400px] lg:w-[600px] pt-10'  >
                <YouTube className='h-[168.75] md:h-[225px] lg:h-[337.5px]'  videoId={videoId} opts={opts} onReady={onReady} />
            </div>
        </>
    )
}

export default Youtubevid