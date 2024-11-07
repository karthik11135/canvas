import { useState, useEffect, useCallback } from 'react';

const useScreenRecorder = (

) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      setMediaStream(stream);

      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/mp4; codecs=vp9',
      });
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
      };
      setMediaRecorder(recorder);
      setIsRecording(true);
      recorder.start();
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }, [mediaRecorder]);

  const downloadRecording = useCallback(() => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      console.log(url);
      a.download = 'screen-recording.mp4';
      a.click();
      URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  return { startRecording, stopRecording, downloadRecording, isRecording };
};

export default useScreenRecorder;
