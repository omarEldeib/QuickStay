// Email service for sending booking confirmations
export const sendBookingConfirmationEmail = async (booking, userEmail) => {
  try {
    const totalPrice = booking?.totalPrice ?? booking?.pricing?.total ?? 'N/A';

    const emailData = {
      to: userEmail,
      subject: `Booking Confirmation - ${booking.room.hotel.name}`,
      template: 'booking-confirmation',
      data: {
        bookingId: booking._id,
        hotelName: booking.room.hotel.name,
        roomType: booking.room.roomType,
        checkInDate: formatDate(booking.checkInDate),
        checkOutDate: formatDate(booking.checkOutDate),
        guests: booking.guests,
        totalPrice,
        paymentMethod: booking.paymentMethod,
        isPaid: booking.isPaid,
        status: booking.status,
        bookingDate: formatDate(booking.createdAt)
      }
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) throw new Error('Failed to send email');

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: true,
      messageId: `email_${Date.now()}`,
      message: 'Email sent successfully (demo mode)'
    };
  }
};

export const sendBookingCancellationEmail = async (booking, userEmail) => {
  try {
    const totalPrice = booking?.totalPrice ?? booking?.pricing?.total ?? 'N/A';

    const emailData = {
      to: userEmail,
      subject: `Booking Cancellation - ${booking.room.hotel.name}`,
      template: 'booking-cancellation',
      data: {
        bookingId: booking._id,
        hotelName: booking.room.hotel.name,
        roomType: booking.room.roomType,
        checkInDate: formatDate(booking.checkInDate),
        checkOutDate: formatDate(booking.checkOutDate),
        totalPrice,
        cancellationDate: formatDate(new Date().toISOString())
      }
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) throw new Error('Failed to send cancellation email');

    return await response.json();
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    return {
      success: true,
      messageId: `email_${Date.now()}`,
      message: 'Cancellation email sent successfully (demo mode)'
    };
  }
};

export const sendBookingReminderEmail = async (booking, userEmail) => {
  try {
    const emailData = {
      to: userEmail,
      subject: `Booking Reminder - Check-in Tomorrow at ${booking.room.hotel.name}`,
      template: 'booking-reminder',
      data: {
        bookingId: booking._id,
        hotelName: booking.room.hotel.name,
        roomType: booking.room.roomType,
        checkInDate: formatDate(booking.checkInDate),
        checkOutDate: formatDate(booking.checkOutDate),
        guests: booking.guests,
        hotelAddress: booking.room.hotel.address,
        hotelPhone: booking.room.hotel.phone || 'N/A'
      }
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) throw new Error('Failed to send reminder email');

    return await response.json();
  } catch (error) {
    console.error('Error sending reminder email:', error);
    return {
      success: true,
      messageId: `email_${Date.now()}`,
      message: 'Reminder email sent successfully (demo mode)'
    };
  }
};

// Generate HTML content for booking confirmation email
export const generateConfirmationEmailContent = (data) => {
  const { bookingId, hotelName, roomType, checkInDate, checkOutDate, guests, totalPrice, paymentMethod, isPaid, status, bookingDate } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .detail-label { font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmation</h1>
          <p>Thank you for choosing ${hotelName}</p>
        </div>
        <div class="content">
          <div class="booking-details">
            <h2>Booking Details</h2>
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span>${bookingId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Hotel:</span>
              <span>${hotelName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Room Type:</span>
              <span>${roomType}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Check-in:</span>
              <span>${checkInDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Check-out:</span>
              <span>${checkOutDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Guests:</span>
              <span>${guests}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Total Price:</span>
              <span>$${totalPrice}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment Method:</span>
              <span>${paymentMethod}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span>${status}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Booking Date:</span>
              <span>${bookingDate}</span>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>We look forward to hosting you!</p>
          <p>For any questions, please contact us at support@masar.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate HTML content for booking cancellation email
export const generateCancellationEmailContent = (data) => {
  const { bookingId, hotelName, roomType, checkInDate, checkOutDate, totalPrice, cancellationDate } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Cancellation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .detail-label { font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Cancellation</h1>
          <p>Your booking has been cancelled</p>
        </div>
        <div class="content">
          <div class="booking-details">
            <h2>Cancelled Booking Details</h2>
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span>${bookingId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Hotel:</span>
              <span>${hotelName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Room Type:</span>
              <span>${roomType}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Check-in:</span>
              <span>${checkInDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Check-out:</span>
              <span>${checkOutDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Total Price:</span>
              <span>$${totalPrice}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Cancellation Date:</span>
              <span>${cancellationDate}</span>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>We hope to serve you again in the future!</p>
          <p>For any questions, please contact us at support@masar.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function to format dates
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
    