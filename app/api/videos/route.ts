import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const response = NextResponse.json(videos || []);
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );

    return response;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos. Please try again later." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body: IVideo = await request.json();

    // Validate required fields (description is now optional)
    if (!body.title || !body.videoUrl || !body.thumbnailUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const videoData = {
      ...body,
      description: body.description || "", // Provide empty string as default
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    const newVideo = await Video.create(videoData);
    return NextResponse.json(newVideo);
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
