import { IKVideo } from "imagekitio-next";
import { IVideo } from "@/models/Video";
import { useEffect, useRef } from "react";

export default function VideoComponent({ video }: { video: IVideo }) {
    const videoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Find the video element within the container
                    const videoElement = entry.target.querySelector('video');
                    if (videoElement) {
                        if (!entry.isIntersecting) {
                            // Pause the video when it's out of view
                            videoElement.pause();
                        }
                    }
                });
            },
            {
                threshold: 0.5 // Trigger when 50% of the video is visible/invisible
            }
        );

        observer.observe(videoRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleVideoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const videoElement = e.currentTarget.querySelector('video');
        if (videoElement) {
            // Add a container div for maintaining aspect ratio in fullscreen
            const container = document.createElement('div');
            container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      `;

            // Clone the video element and maintain aspect ratio
            const videoClone = videoElement.cloneNode(true) as HTMLVideoElement;
            videoClone.style.cssText = `
        width: auto;
        height: 100%;
        max-width: 56.25vh; /* maintain 9:16 aspect ratio */
      `;

            container.appendChild(videoClone);
            document.body.appendChild(container);

            // Start playing the cloned video
            videoClone.play();

            // Handle closing fullscreen
            container.addEventListener('click', (event) => {
                if (event.target === container) {
                    container.remove();
                }
            });

            // Handle ESC key
            document.addEventListener('keydown', function closeOnEsc(e) {
                if (e.key === 'Escape') {
                    container.remove();
                    document.removeEventListener('keydown', closeOnEsc);
                }
            });
        }
    };

    return (
        <div className="card bg-base-300 shadow hover:shadow-lg transition-all duration-300">
            <figure className="relative px-4 pt-4">
                <div
                    ref={videoRef}
                    className="relative group w-full cursor-pointer"
                    onClick={handleVideoClick}
                >
                    <div
                        className="rounded-xl overflow-hidden relative w-full"
                        style={{ aspectRatio: "9/16" }}
                    >
                        <IKVideo
                            path={video.videoUrl}
                            transformation={[
                                {
                                    height: "1920",
                                    width: "1080",
                                },
                            ]}
                            controls={video.controls}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </figure>

            <div className="card-body p-4">
                <div className="hover:opacity-80 transition-opacity">
                    <h2 className="card-title text-lg">{video.title}</h2>
                </div>
                <p className="text-sm text-base-content/70 line-clamp-2">
                    {video.description}
                </p>
            </div>
        </div>
    );
}
