import { useState, useEffect, useCallback, useRef } from 'react';
import { ElevenLabsClient } from 'elevenlabs';
import reducer, { setFrequencyData, setIsPlaying, useAppDispatch, useAppSelector } from '@/views/teachingPage/store';
import { injectReducer } from '@/store';

injectReducer('teaching', reducer);

const useTextToSpeech = (voiceId = 'CwhRBWXzGAHq8TQ4Fs17') => {
  const isPlaying = useAppSelector((state) => state.teaching.data.isPlaying);
  const frequencyData = useAppSelector((state) => state.teaching.data.frequencyData);
  const dispatch = useAppDispatch();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null); // Reference to the current audio element
  const ELEVENLABS_API_KEY = 'sk_0edf7becdef9200da658a43c3afccc3ad2209dfcf419721a';
  const client = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY });

  const textToSpeechConvert = async (text: string) => {
    if (!text) return;

    try {

      const newAudio = new Audio();
      currentAudioRef.current = newAudio;

      const mediaSource = new MediaSource();
      newAudio.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener('sourceopen', async () => {
        const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');

        try {
          // Fetch audio stream from ElevenLabs
          const audioStream = await client.textToSpeech.convertAsStream(voiceId, {
            optimize_streaming_latency: '4',
            output_format: 'mp3_22050_32',
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.1,
              similarity_boost: 0.3,
              style: 0.2,
            },
          });

          // Append audio chunks to the SourceBuffer
          for await (const chunk of audioStream) {
            if (sourceBuffer.updating) {
              await new Promise((resolve) =>
                sourceBuffer.addEventListener('updateend', resolve, { once: true })
              );
            }
            sourceBuffer.appendBuffer(new Uint8Array(chunk));
          }

          // Close the MediaSource when all chunks are appended
          if (mediaSource.readyState === 'open') {
            mediaSource.endOfStream();
          }
        } catch (error) {
          console.error('Error streaming audio:', error);
        }
      });

      newAudio.addEventListener('play', () => {
        
        initializeAudioVisualizer(newAudio);
      });

      newAudio.addEventListener('ended', () => {
        console.log('Audio ended');
        dispatch(setIsPlaying(false));
       
        
        // Clear reference when audio ends
      });

      // Start playback
      await newAudio.play();
      
      dispatch(setIsPlaying(true));
    } catch (error) {
      console.error('Error during TTS playback:', error);
    }
  };

  const initializeAudioVisualizer = (audioElement: HTMLAudioElement) => {
    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
    } catch (error) {
      console.error('Error initializing Audio Context or Analyser:', error);
    }
  };

  useEffect(() => {
    const updateFrequencyData = () => {
      if (!analyserRef.current) return;

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
   
      const getFrequency = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        dispatch(setFrequencyData([...dataArray])); // Update the state with the frequency data

        if (!currentAudioRef.current?.paused) {
        animationFrameRef.current = requestAnimationFrame(getFrequency);
        }
        

      
      };

      getFrequency(); // Initial call to get frequency data
    };

    if (isPlaying) {
      updateFrequencyData(); // Start frequency updates when `isPlaying` is true
    }


  }, [isPlaying]);

  return { isPlaying, textToSpeechConvert, frequencyData };
};

export default useTextToSpeech;
