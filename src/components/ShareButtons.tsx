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

    // 记录当前时间
    const startTime = Date.now();
    let hasRedirected = false;

    // 检测是否已跳转
    const checkRedirect = () => {
      if (document.hidden || hasRedirected) {
        hasRedirected = true;
        return;
      }

      // 如果超过一定时间（这里设置 2500ms）还没跳转，认为没有安装应用
      if (Date.now() - startTime > 2500) {
        hasRedirected = true;
        // 根据设备类型跳转到应用商店
        if (/android/i.test(navigator.userAgent)) {
          window.location.href = stores.android;
        } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
          window.location.href = stores.ios;
        } else {
          alert("请在移动设备上使用此功能");
        }
      } else {
        // 继续检查
        requestAnimationFrame(checkRedirect);
      }
    };

    // 尝试打开应用
    const openApp = () => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = appUrl;
      document.body.appendChild(iframe);

      // 开始检测是否跳转成功
      requestAnimationFrame(checkRedirect);

      // 清理 iframe
      setTimeout(() => {
        iframe.remove();
      }, 2000);
    };

    try {
      // 对于 iOS，使用 window.location
      if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
        window.location.href = appUrl;
        setTimeout(() => {
          if (!document.hidden) {
            window.location.href = stores.ios;
          }
        }, 2500);
      }
      // 对于 Android，使用 iframe 方法
      else if (/android/i.test(navigator.userAgent)) {
        openApp();
      }
      // 其他设备显示提示
      else {
        alert("请在移动设备上使用此功能");
      }
    } catch (e) {
      // 如果出错，直接跳转到应用商店
      if (/android/i.test(navigator.userAgent)) {
        window.location.href = stores.android;
      } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
        window.location.href = stores.ios;
      }
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
