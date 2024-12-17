import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Link from "next/link";
import Image from "next/image";

function extractVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null; // Return the video ID if found, otherwise null
}

export const Slide = ({
  url,
  target,
  title,
  subtitle,
  text,
  type,
  button,
  video_url,
  image,
  file_data,
  children,
}) => {
  return (
    <>
      <Link
        target={`${target ?? "_self"}`}
        href={`${url ?? "/stranica-u-izradi"}`}
      >
        <div className="relative w-full">
          {type === "image" ? (
            <ImageWrapper {...{ image, file_data }}>{children}</ImageWrapper>
          ) : type === "video_link" ? (
            <YoutubeVideoWrapper {...{ video_url, file_data }}>
              {children}
            </YoutubeVideoWrapper>
          ) : (
            <VideoWrapper {...{ file_data }}>{children}</VideoWrapper>
          )}
        </div>
      </Link>
    </>
  );
};

const ImageWrapper = ({ children, image, file_data }) => {
  return (
    <>
      <Image
        src={convertHttpToHttps(image ?? "")}
        alt={file_data?.alt ?? "Bogutovo"}
        width={file_data?.width ?? 1920}
        priority
        className={`!w-full !h-auto`}
        height={file_data?.height ?? 1080}
      />
      {children}
    </>
  );
};

const VideoWrapper = ({ children, file_data }) => {
  return (
    <>
      <video
        width={file_data?.banner_position?.width}
        height={file_data?.banner_position?.height}
        className="bg-fixed w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      >
        <source src={file_data?.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {children}
    </>
  );
};

const YoutubeVideoWrapper = ({ children, video_url, file_data }) => {
  return (
    <>
      <iframe
        className="w-full h-full object-cover aspect-[960/1550] md:aspect-[1920/800] pointer-events-none"
        width={file_data?.width}
        height={file_data?.height}
        src={`${video_url}?autoplay=1&mute=1&loop=1&playsinline=1&controls=0&playlist=${extractVideoId(
          video_url
        )}`}
        frameborder="0"
        allow="autoplay; encrypted-media"
      ></iframe>
      {children}
    </>
  );
};
