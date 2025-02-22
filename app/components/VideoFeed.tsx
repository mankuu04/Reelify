import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";
import { Loader2 } from "lucide-react";

interface VideoFeedProps {
    videos: IVideo[];
    loading?: boolean;
}

export default function VideoFeed({ videos, loading = false }: VideoFeedProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="card bg-base-300 animate-pulse"
                        style={{ height: "360px" }}
                    >
                        <div className="rounded-xl bg-base-200 h-64 m-4"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-base-200 rounded w-3/4"></div>
                            <div className="h-3 bg-base-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
                <VideoComponent key={video._id?.toString()} video={video} />
            ))}

            {videos.length === 0 && !loading && (
                <div className="col-span-full text-center py-12">
                    <p className="text-base-content/70">No videos found</p>
                </div>
            )}
        </div>
    );
}
