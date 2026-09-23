export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/bg-loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/80" />
    </div>
  );
}
