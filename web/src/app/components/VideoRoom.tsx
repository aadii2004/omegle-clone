'use client'
import React, { useEffect, useRef } from 'react'

function VideoRoom({roomId}:{roomId:string}) {
    const zpRef=useRef<any>(null)
    const containerRef=useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (!roomId || zpRef.current) return;
    
      const start = async () => {
        const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
    
        const userId = Math.random().toString(36).substring(2, 10);
    
        console.log("ROOM:", roomId);
        console.log("USER:", userId);
    
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID),
          process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!,
          roomId,
          userId,
          "stranger"
        );
    
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp;
    
        zp.joinRoom({
          container: containerRef.current,
          scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
          showPreJoinView: false,
          showTextChat: true,
          maxUsers: 2
        });
      };
    
      start();
    
    }, [roomId]);
  return (
    <div ref={containerRef} className='w-full h-[80vh]'/>
      
    
  )
}

export default VideoRoom
