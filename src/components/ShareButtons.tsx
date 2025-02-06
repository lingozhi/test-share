"use client";

export default function ShareButtons() {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <a
        className="rounded-full bg-[#1877f2] text-white px-6 py-2 hover:bg-[#166fe5] transition-colors"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          "https://your-website.com"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        分享到 Facebook
      </a>

      <button
        className="rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-6 py-2 hover:opacity-90 transition-opacity"
        onClick={() => alert("Instagram需要通过移动应用分享")}
      >
        分享到 Instagram
      </button>

      <a
        className="rounded-full bg-[#e60023] text-white px-6 py-2 hover:bg-[#ad081b] transition-colors"
        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          "https://your-website.com"
        )}&media=${encodeURIComponent(
          "https://your-website.com/image.jpg"
        )}&description=${encodeURIComponent("分享描述")}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        分享到 Pinterest
      </a>

      <button
        className="rounded-full bg-black text-white px-6 py-2 hover:bg-[#333] transition-colors"
        onClick={() => alert("TikTok需要通过移动应用分享")}
      >
        分享到 TikTok
      </button>
    </div>
  );
}
