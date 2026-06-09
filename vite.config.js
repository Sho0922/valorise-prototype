import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // すべてのネットワークインターフェースで待ち受ける。
    // これにより同じ Wi-Fi 上のスマホから PC の IP アドレスでアクセスできる。
    host: true,
    // アクセスしている localhost:3000 に合わせてポートを固定する。
    port: 3000,
    // 3000 が埋まっていたら別ポートに逃げずにエラーにする（URL がズレる事故を防ぐ）。
    strictPort: true,
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
  },
});
