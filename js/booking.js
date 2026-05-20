// ============================================
//   SURF DEL MAR - Booking JavaScript
// ============================================

// Contact form submit handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = document.getElementById('name')?.value || '';
      const email   = document.getElementById('email')?.value || '';
      const phone   = document.getElementById('phone')?.value || '';
      const message = document.getElementById('message')?.value || '';
      const roomType = document.getElementById('roomType')?.value || '';

      // Build WhatsApp message
      const text = encodeURIComponent(
        `Hello Surf Del Mar Hotel!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nRoom Interest: ${roomType}\n\nMessage: ${message}`
      );

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/94753758832?text=${text}`, '_blank');
    });
  }
});
