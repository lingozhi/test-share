"use client";

const SHARE_CONFIG = {
  website: "https://your-website.com",
  content: "分享内容",
  image: "https://your-website.com/image.jpg",
  description: "分享描述",
} as const;

const STORE_URLS = {
  instagram: {
    ios: "https://apps.apple.com/app/instagram/id389801252",
    android:
      "https://play.google.com/store/apps/details?id=com.instagram.android",
  },
  tiktok: {
    ios: "https://apps.apple.com/app/tiktok/id835599320",
    android:
      "https://play.google.com/store/apps/details?id=com.zhiliaoapp.musically",
  },
} as const;

export default function ShareButtons() {
  const handleAppShare = (appName: "instagram" | "tiktok") => {
    const scheme = appName === "instagram" ? "instagram" : "tiktok";
    const appUrl = `${scheme}://share?text=${encodeURIComponent(
      SHARE_CONFIG.content
    )}`;
    const stores = STORE_URLS[appName];

    try {
      window.location.href = appUrl;

      setTimeout(() => {
        if (document.hidden) return;

        if (/android/i.test(navigator.userAgent)) {
          window.location.href = stores.android;
        } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
          window.location.href = stores.ios;
        } else {
          alert("请在移动设备上使用此功能");
        }
      }, 3000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      alert(`无法打开${appName} App，请确保已安装`);
    }
  };

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <a
        className="rounded-full bg-[#1877f2] text-white px-6 py-2 hover:bg-[#166fe5] transition-colors"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          SHARE_CONFIG.website
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        分享到 Facebook
      </a>

      <button
        className="rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-6 py-2 hover:opacity-90 transition-opacity"
        onClick={() => handleAppShare("instagram")}
      >
        分享到 Instagram
      </button>

      <a
        className="rounded-full bg-[#e60023] text-white px-6 py-2 hover:bg-[#ad081b] transition-colors"
        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          SHARE_CONFIG.website
        )}&media=${encodeURIComponent(
          SHARE_CONFIG.image
        )}&description=${encodeURIComponent(SHARE_CONFIG.description)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        分享到 Pinterest
      </a>

      <button
        className="rounded-full bg-black text-white px-6 py-2 hover:bg-[#333] transition-colors"
        onClick={() => handleAppShare("tiktok")}
      >
        分享到 TikTok
      </button>
    </div>
  );
}
