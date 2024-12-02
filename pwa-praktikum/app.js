// Memeriksa dukungan notifikasi dan service worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker registered:', registration);
      // Cek apakah pengguna sudah mengizinkan notifikasi
      return Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // Daftarkan untuk menerima push notifications
          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: '<YOUR_VAPID_PUBLIC_KEY>'  // Gantilah dengan public key dari VAPID
          }).then((subscription) => {
            console.log('Push subscription:', subscription);
            // Kirimkan subscription ke server untuk disimpan dan digunakan untuk mengirimkan push
          }).catch((err) => {
            console.error('Push subscription failed:', err);
          });
        }
      });
    });
  });
}
